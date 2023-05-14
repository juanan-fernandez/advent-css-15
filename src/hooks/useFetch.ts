import { useState, useEffect } from 'react';

export type HttpHookResponse = {
	isLoading: boolean;
	error: string | null;
	data: any;
};

// fetch(
// 	'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES&key=' +
// // 		apiKey,
// // 	options
// // )
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

export function useFetch(url: string): HttpHookResponse {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		function fetchData() {
			const options = { method: 'GET' };

			fetch(url, options)
				.then(response => response.json())
				.then(jsonData => {
					setData(jsonData);
				})
				.catch(err =>
					setError(
						err.message || 'ERROR: No se ha podido realizar la petición a la API'
					)
				);
		}
		fetchData();
	}, [url]);

	return {
		isLoading,
		error,
		data,
	};
}
