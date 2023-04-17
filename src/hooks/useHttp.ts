import { useState, useEffect } from 'react';

export type HttpHookResponse = {
	isLoading: boolean;
	error: string | null;
	data: any;
};

export function useHttp(url: string): HttpHookResponse {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	async function fetchData() {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`'ERROR: ${response.statusText} => No se ha podido realizar la consulta a la API`
				);
			}
			const json = await response.json();
			setData(json);
		} catch (err: any) {
			setError(
				err.message ||
					'ERROR: ${response.statusText} => No se ha podido realizar la consulta a la API'
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, [url]);

	return {
		isLoading,
		error,
		data,
	};
}
