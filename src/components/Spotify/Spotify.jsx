const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token'; 
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/';
const scope = 'playlist-modify-public playlist-modify-private user-library-read';

export const getAuthorizationUrl = () => {
    return `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
}

export const getAccessTokenFromUrl = () => {
    const hash = window.location.hash.substring(1).split('&').reduce((initial, item) => {
       if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
       }
       return initial;
    }, {});

    return hash.access_token;
};

export const isAccessTokenValid = (token) => {
    if (!token) return false;

    const url = `https://api.spotify.com/v1/me`;

    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(response => response.ok)
    .catch(() => false);
};

export const refreshAccessToken = async (refreshToken, storeTokens) => {
    if (!refreshToken) {
        console.error('No refresh token available');
        return null;
    }

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'refresh-token',
                refresh_token: refreshToken,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access_token;
            const newRefreshToken = data.refresh_token || refreshToken;
            
            storeTokens(newAccessToken, newRefreshToken);

            return newAccessToken;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
};