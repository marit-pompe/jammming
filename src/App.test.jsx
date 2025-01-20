import { render, screen } from '@testing-library/react';
import { getAccessTokenFromUrl } from './components/Spotify/Spotify';

test('should extract access token from URL hash', () => {
    window.location.hash = '#access_token=someAccessToken&token_type=bearer';

    const token = getAccessTokenFromUrl();
    expect(token).toBe('someAccessToken');
})
