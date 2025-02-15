const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export const initiateLogin = () => {
  window.location.href = `${API_URL}/api/v1/auth/keycloak?redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&shouldRedirect=true`;
};

export const verifyToken = async (token: string) => {
  const response = await fetch(`${API_URL}/api/v1/auth/keycloak/verify?client_id=${CLIENT_ID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getSession = async () => {
  const response = await fetch(`${API_URL}/api/v1/auth/session`, { credentials: 'include' });
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/v1/auth/logout`, { credentials: 'include' });
  return response.json();
};
