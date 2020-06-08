import axios from 'axios';
import { getLocalValue } from './localStorage';

export default (() => {
	const userToken = getLocalValue('userToken');
	const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};
	const aliviaAxios = axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers,
	});

	return aliviaAxios;
})();
