import { useState, useEffect } from 'react';

export type HttpHookResponse = {
	isLoading: boolean;
	error: string | null;
	data: any;
};

export function useHttp(url: string): HttpHookResponse {
	const [data, setData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	async function fetchData(): Promise<void> {
		try {
			const response = await fetch(url, { method: 'GET' });
			if (!response.ok) {
				throw new Error(
					`'ERROR: ${response.statusText} => No se ha podido realizar la consulta a la API`
				);
			}
			const jsonData = await response.json();
			console.log(jsonData);

			setData(jsonData);
		} catch (err: any) {
			setError(err.message || 'ERROR: No se ha podido realizar la consulta a la API');
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return {
		isLoading,
		error,
		data,
	};
}
