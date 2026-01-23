/**
 * Service to generate Apple Wallet Passes via Hushh Wallet API.
 * Endpoint: https://hushh-wallet.vercel.app/api/passes/universal/create
 */
import { buildHushhId, getSiteUrl } from '../lib/utils';

export const WalletService = {
    /**
     * Generates a .pkpass file for the user profile.
     * @param {Object} userData - User profile data from Supabase/App.
     * @returns {Promise<Blob>} The .pkpass file blob.
     */
    async generatePass(userData) {
        const fullName = userData?.full_name || userData?.fullName || "Hushh User";
        const rawPhone = userData?.phone || userData?.phoneNumber || '';
        const phoneDigits = rawPhone.replace(/\D/g, '');
        const generatedHushhId = phoneDigits ? buildHushhId(fullName, rawPhone) : '';
        const hushhId = generatedHushhId || userData?.hushh_id || userData?.hushhId || null;
        const publicId = hushhId;
        const role = userData?.occupation || "Member";
        const baseUrl = getSiteUrl();

        // Construct public profile URL for the QR code
        if (!publicId) {
            throw new Error("Missing Hushh ID for wallet pass generation.");
        }
        const profileUrl = `${baseUrl}/hushh-id/${publicId}`;

        // Payload matching the "Universal Pass" request structure
        const payload = {
            passType: "generic",
            description: "Hushh Digital Identity",
            organizationName: "Hushh.ai",
            logoText: "HUSHH",
            backgroundColor: "rgb(0, 0, 0)", // Black/Dark theme
            foregroundColor: "rgb(255, 255, 255)",
            labelColor: "rgb(12, 140, 233)", // Hushh Blue

            // Top Header
            headerFields: [
                {
                    key: "role",
                    label: "ROLE",
                    value: role.toUpperCase(),
                    textAlignment: "PKTextAlignmentRight"
                }
            ],

            // Primary Info (Large Text)
            primaryFields: [
                {
                    key: "name",
                    label: "NAME",
                    value: fullName
                }
            ],

            // Secondary Info
            secondaryFields: [
                {
                    key: "id",
                    label: "HUSHH ID",
                    value: publicId
                },
                {
                    key: "email",
                    label: "EMAIL",
                    value: userData?.email || "N/A"
                },
                {
                    key: "phone",
                    label: "PHONE",
                    value: userData?.phone || userData?.phoneNumber || "N/A"
                }
            ],

            // Back of the card details
            backFields: [
                {
                    key: "city",
                    label: "Location",
                    value: userData?.city || "Unknown"
                },
                {
                    key: "powered",
                    label: "Powered By",
                    value: "Hushh.ai Intelligence Portal"
                }
            ],

            // QR Code linking to public profile
            barcode: {
                message: profileUrl,
                format: "PKBarcodeFormatQR",
                messageEncoding: "utf-8",
                altText: `Scan to verify ${fullName}`
            },

            sharingProhibited: false
        };

        try {
            const response = await fetch("https://hushh-wallet.vercel.app/api/passes/universal/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Wallet API Error: ${response.statusText}`);
            }

            // Return the file blob (application/vnd.apple.pkpass)
            return await response.blob();

        } catch (error) {
            console.error("Wallet Pass Generation Failed:", error);
            throw error;
        }
    }
};
