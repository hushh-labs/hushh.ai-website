'use client'
import { useState, useEffect } from 'react';
import { Box, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import config from '../config/config';

export default function Header() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await config.supabaseClient.auth.signOut();
      setSession(null);
      router.push('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Box as="header" bg="black" color="white" p={4} display="flex" justifyContent="space-between" alignItems="center">
      <Text fontSize="xl" fontWeight="bold">Hushh Developer API</Text>
      {/* {session ? (
        <Menu>
          <MenuButton as={Button} variant="link">
            <Avatar src={session.user.user_metadata.avatar_url} name={session.user.email} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Text fontWeight="bold">{session.user.user_metadata.full_name}</Text>
            </MenuItem> 
            <MenuItem>
              <Text>{session.user.email}</Text>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={() => router.push('/developerApi/login')} colorScheme="teal">
          Log In
        </Button>
      )} */}
    </Box>
  );
}