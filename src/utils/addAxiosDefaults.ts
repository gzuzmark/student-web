import axios from 'axios';

const addAxiosDefaults = () => {
	axios.defaults.baseURL = process.env.BASE_URL;
};

export default addAxiosDefaults;
