'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import config from '../config/config';
import { httpRequest } from '../requestHandler/requestHandler';
import { useToast } from '@chakra-ui/react';
import { useApiKey } from '../../context/apiKeyContext';

const SessionToken = () => {
  const { data: session, status } = useSession();
  const { apiKey, hasApiKey } = useApiKey();
  const [sessionToken, setSessionToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Check if we have the required data
  useEffect(() => {
    if (session?.user && !hasApiKey()) {
      setError('No API key found. Please generate an API key first.');
    } else if (session?.user && hasApiKey()) {
      setError(''); // Clear any previous errors
    }
  }, [session, apiKey, hasApiKey]);

  // Call the session token API
  const fetchSessionToken = async () => {
    if (!session?.user?.email || !hasApiKey()) {
      setError('User email or API key is missing');
      toast({
        title: 'Missing Information',
        description: 'User email or API key is required to fetch session token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await httpRequest(
        'POST',
        `sessiontoken?mail=${session.user.email}&api_key=${apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status_code === 200) {
        setSessionToken(response.token);
        setError(''); // Clear any errors
        toast({
          title: 'Session Token Retrieved',
          description: 'Your session token has been successfully retrieved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError('Failed to fetch session token');
        toast({
          title: 'Error',
          description: 'Failed to fetch session token. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching session token:', error);
      setError('Failed to fetch session token');
      toast({
        title: 'Error',
        description: 'Failed to fetch session token. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-sm text-white mt-8 onBoarding">
      <button
        onClick={fetchSessionToken}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
        disabled={isLoading || !hasApiKey()}
      >
        {isLoading ? 'Processing...' : 'Get Session Token'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="border text-card-foreground shadow-sm bg-[#1C1C1E] mt-4 p-4 flex items-center justify-between rounded">
        <input
          className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-none text-white placeholder-gray-400"
          placeholder="Please click on the button above to get your session token "
          value={sessionToken}
          readOnly
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(sessionToken);
            toast({
              title: 'Copied to Clipboard',
              description: 'Session token has been copied to clipboard.',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }}
          className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-none bg-[#313134] text-gray-300 ml-3"
          disabled={!sessionToken}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default SessionToken;
