export const setLocalValue = (key: string, value: string): void => {
	window.localStorage.setItem(key, value);
};

export const getLocalValue = (key: string): string | null => {
	return window.localStorage.getItem(key);
};

export const removeLocalItem = (key: string): void => {
	window.localStorage.removeItem(key);
};

export const purgerLocalStorage = (): void => {
	window.localStorage.clear();
};
