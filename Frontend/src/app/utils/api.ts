const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ott-backend.koogle.sk";
const CLIENT_ID = "aeecdcc1-6127-4030-b6f0-97ce7ae35c6a";//process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = "http://localhost:4000/auth/callback";//process.env.NEXT_PUBLIC_REDIRECT_URI;
console.log('API_URL from env:', API_URL);  

export async function exchangeCodeForToken(code: string): Promise<string | null> {

  if (!API_URL || !CLIENT_ID || !REDIRECT_URI) {
    console.error('Environment variables are not properly loaded.');
    throw new Error("Missing environment variables");
  }

  try {
    // Construct the URL for the token exchange endpoint
    const tokenExchangeUrl = `${API_URL}/oauth/token`;  // Replace with the actual token endpoint

    const response = await fetch(tokenExchangeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${process.env.CLIENT_SECRET}`),  // Basic Auth
      },
      body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      console.error('Token exchange failed:', response.status, response.statusText);
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    const accessToken = data.access_token;

    console.log('Token exchange successful, access token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return null;
  }
}


console.log('API_URL from env:', API_URL);  // Debug: Check if API_URL is being loaded

export const initiateLogin = () => {
    console.log('initiateLogin: Starting');
    if (!API_URL || !CLIENT_ID || !REDIRECT_URI) {
        console.error('initiateLogin: Environment variables are not properly loaded.');
        return;
    }
    const loginUrl = `${API_URL}/api/auth/keycloak?redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&shouldRedirect=true`;
    console.log('initiateLogin: Redirecting to:', loginUrl);
    window.location.href = loginUrl;
    console.log('initiateLogin: Ending');
};

export const verifyToken = async (accessToken: string) => {
    console.log('verifyToken: Starting with token:', accessToken);
    if (!API_URL || !CLIENT_ID) {
        console.error('verifyToken: API_URL or CLIENT_ID is not loaded.');
        return null;
    }
    try {
        console.log('verifyToken: Verifying token with URL:', `${API_URL}/api/auth/keycloak/verify?client_id=${CLIENT_ID}`);
        const response = await fetch(`${API_URL}/api/auth/keycloak/verify?client_id=${CLIENT_ID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Use the access token
            },
        });

        console.log('verifyToken: Response status:', response.status);

        if (!response.ok) {
            console.error('verifyToken: Token verification failed:', response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log('verifyToken: Token verification successful, data:', data);
        return data; // Expecting session ID or user data based on your description
    } catch (error) {
        console.error('verifyToken: Error verifying token:', error);
        return null;
    } finally {
        console.log('verifyToken: Ending');
    }
};

export const getSession = async () => {
    console.log('getSession: Starting');
    if (!API_URL) {
        console.error('getSession: API_URL is not loaded.');
        return null;
    }
    try {
        console.log('getSession: Fetching session from:', `${API_URL}/api/auth/session`);
        const response = await fetch(`${API_URL}/api/auth/session`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('getSession: Response status:', response.status);

        if (!response.ok) {
            console.error('getSession: getSession failed:', response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log('getSession: Session data:', data);

        // Check if the data contains session information
        if (data && data.session && Object.keys(data.session).length > 0) {
            console.log('getSession: Session data is valid.');
            return data; // Return session data
        } else {
            console.warn('getSession: Session data is empty.');
            return null; // Indicate no session
        }
    } catch (error) {
        console.error('getSession: Error getting session:', error);
        return null;
    } finally {
        console.log('getSession: Ending');
    }
};

export const logout = async () => {
    console.log('logout: Starting');
    if (!API_URL) {
        console.error('logout: API_URL is not loaded.');
        return false;
    }
    try {
        console.log('logout: Logging out from:', `${API_URL}/api/auth/logout`);
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('logout: Response status:', response.status);
        if (!response.ok) {
            console.error('logout: Logout failed:', response.status, response.statusText);
            return false;
        }
        console.log('logout: Logout successful');
        return true; // Expecting a successful response
    } catch (error) {
        console.error('logout: Error logging out:', error);
        return false;
    } finally {
        console.log('logout: Ending');
    }
};
