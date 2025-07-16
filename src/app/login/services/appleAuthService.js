import { 
  createAppleAuthSupabaseClient, 
  getRedirectUrl, 
  generateNonce, 
  hashNonce,
  validateAppleAuthConfig,
  appleAuthConfig 
} from '../config/appleAuth.js';

class AppleAuthService {
  constructor() {
    this.supabase = createAppleAuthSupabaseClient();
    this.nonce = null;
    this.hashedNonce = null;
  }

  /**
   * Initialize Apple Sign-In OAuth Flow
   * This method initiates the Apple OAuth process
   */
  async signInWithAppleOAuth() {
    try {
      // Validate configuration first
      if (!validateAppleAuthConfig()) {
        throw new Error('Apple Auth configuration is incomplete. Please check your environment variables.');
      }

      console.log('Starting Apple OAuth Sign-In process...');
      
      // Generate nonce for security
      this.nonce = generateNonce();
      this.hashedNonce = await hashNonce(this.nonce);
      
      // Store nonce in sessionStorage for callback verification
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('apple_auth_nonce', this.nonce);
      }

      const redirectTo = getRedirectUrl();
      console.log('Redirect URL:', redirectTo);

      // Sign in with OAuth using Supabase
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo,
          queryParams: {
            response_type: appleAuthConfig.responseType,
            response_mode: appleAuthConfig.responseMode,
            scope: appleAuthConfig.scope,
            nonce: this.hashedNonce
          }
        }
      });

      if (error) {
        console.error('Apple OAuth Error:', error);
        throw error;
      }

      console.log('Apple OAuth initiated successfully');
      return { data, error: null };

    } catch (error) {
      console.error('Error initiating Apple Sign-In:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign in with Apple ID Token (for JS SDK integration)
   * This method handles Apple ID tokens received from Apple's JS SDK
   */
  async signInWithAppleIdToken(idToken, nonce = null) {
    try {
      console.log('Processing Apple ID Token...');

      if (!idToken) {
        throw new Error('Apple ID token is required');
      }

      // Use provided nonce or retrieve from storage
      const authNonce = nonce || (typeof window !== 'undefined' ? sessionStorage.getItem('apple_auth_nonce') : null);

      const { data, error } = await this.supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: idToken,
        nonce: authNonce
      });

      if (error) {
        console.error('Apple ID Token Error:', error);
        throw error;
      }

      console.log('Apple ID Token authentication successful');
      
      // Clean up stored nonce
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('apple_auth_nonce');
      }

      // Handle successful authentication
      await this.handleSuccessfulAuth(data);
      
      return { data, error: null };

    } catch (error) {
      console.error('Error processing Apple ID Token:', error);
      return { data: null, error };
    }
  }

  /**
   * Handle Apple OAuth Callback
   * This method processes the callback from Apple OAuth
   */
  async handleAppleCallback(url) {
    try {
      console.log('Handling Apple OAuth callback...');

      if (!url) {
        throw new Error('Callback URL is required');
      }

      // Extract parameters from URL
      const urlParams = new URLSearchParams(new URL(url).search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        throw new Error(`Apple OAuth Error: ${error}`);
      }

      if (code) {
        // Exchange code for session
        const { data, error: exchangeError } = await this.supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('Code exchange error:', exchangeError);
          throw exchangeError;
        }

        console.log('Apple OAuth callback processed successfully');
        
        // Handle successful authentication
        await this.handleSuccessfulAuth(data);
        
        return { data, error: null };
      }

      throw new Error('No authorization code received from Apple');

    } catch (error) {
      console.error('Error handling Apple callback:', error);
      return { data: null, error };
    }
  }

  /**
   * Handle successful authentication
   * This method processes successful Apple authentication
   */
  async handleSuccessfulAuth(authData) {
    try {
      const { session, user } = authData;

      if (!user || !session) {
        throw new Error('Invalid authentication data received');
      }

      console.log('Processing successful Apple authentication for user:', user.email);

      // Store authentication data
      if (typeof window !== 'undefined') {
        localStorage.setItem('apple_auth_success', 'true');
        localStorage.setItem('apple_user_email', user.email || '');
      }

      // Insert/Update user profile in database
      await this.upsertUserProfile(user);

      return { success: true, user, session };

    } catch (error) {
      console.error('Error handling successful auth:', error);
      throw error;
    }
  }

  /**
   * Upsert user profile to database
   * This method creates or updates user profile in the database
   */
  async upsertUserProfile(user) {
    try {
      if (!user) {
        throw new Error('User data is required');
      }

      const userData = {
        user_id: user.id,
        mail: user.email,
        firstname: user.user_metadata?.full_name || user.user_metadata?.name || '',
        lastname: '', // Apple doesn't provide separate last name
        avatar_url: user.user_metadata?.avatar_url || null,
        provider: 'apple',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Upserting user profile:', userData);

      // Insert or update user profile
      const { data, error } = await this.supabase
        .from('dev_api_userprofile')
        .upsert([userData], { 
          onConflict: 'mail',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error upserting user profile:', error);
        throw error;
      }

      console.log('User profile upserted successfully');
      return { data, error: null };

    } catch (error) {
      console.error('Error in upsertUserProfile:', error);
      return { data: null, error };
    }
  }

  /**
   * Get current session
   * This method retrieves the current authentication session
   */
  async getCurrentSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        throw error;
      }

      return { data, error: null };

    } catch (error) {
      console.error('Error in getCurrentSession:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign out user
   * This method signs out the current user
   */
  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }

      // Clean up local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('apple_auth_success');
        localStorage.removeItem('apple_user_email');
        sessionStorage.removeItem('apple_auth_nonce');
      }

      console.log('User signed out successfully');
      return { error: null };

    } catch (error) {
      console.error('Error in signOut:', error);
      return { error };
    }
  }

  /**
   * Check if user is authenticated
   * This method checks if the user has a valid session
   */
  async isAuthenticated() {
    try {
      const { data } = await this.getCurrentSession();
      return !!data?.session?.user;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Listen for auth state changes
   * This method sets up listeners for authentication state changes
   */
  onAuthStateChange(callback) {
    try {
      const { data: subscription } = this.supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Apple Auth State Change:', event, session?.user?.email);
          
          if (callback && typeof callback === 'function') {
            callback(event, session);
          }
        }
      );

      return subscription;

    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      return null;
    }
  }

  /**
   * Get user profile from database
   * This method retrieves user profile data from the database
   */
  async getUserProfile(userEmail) {
    try {
      if (!userEmail) {
        throw new Error('User email is required');
      }

      const { data, error } = await this.supabase
        .from('dev_api_userprofile')
        .select('*')
        .eq('mail', userEmail)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      return { data, error: null };

    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return { data: null, error };
    }
  }
}

// Create and export singleton instance
const appleAuthService = new AppleAuthService();

export default appleAuthService;
export { AppleAuthService }; 