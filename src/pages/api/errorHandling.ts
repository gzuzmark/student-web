import { AxiosError } from 'axios';

export const handleExpirationToken = (e: AxiosError) => {
	// Try to refresh token
	if (e.code && e.code === '401') {
	}
};
