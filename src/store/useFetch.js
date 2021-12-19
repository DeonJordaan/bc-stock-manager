import { useState, useCallback } from 'react';

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body
					? JSON.stringify(requestConfig.body)
					: null,
			});

			if (!response.ok) {
				throw new Error('Could not retrieve data');
			}

			const data = await response.json();

			applyData(data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
		setIsLoading(false);
	}, []);

	return { isLoading, error, sendRequest };
};

export default useFetch;
