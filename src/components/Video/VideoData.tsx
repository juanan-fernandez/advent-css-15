import { useHttp, HttpHookResponse } from '../../hooks/useHttp';
//import { useFetch, HttpHookResponse } from '../../hooks/useFetch';
import { useEffect, useState, useRef } from 'react';
import VideoList from './VideoList';

export type Video = {
	id: string;
	title: string;
	description: string;
	image: string;
	imageMed: string;
	imageHigh: string;
};

function VideoData() {
	const apiKey = import.meta.env.VITE_YOUTUBE_APIKEY;
	const url =
		'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES&key=' +
		apiKey;

	const aux: HttpHookResponse = useHttp(url);
	console.log(aux);

	const { isLoading, error, data } = aux;
	const [listOfVideos, setListOfVideos] = useState<Video[]>([]);

	//console.log(data);

	const getVideosData = (): Video[] => {
		return data.items.map((v: any) => {
			return {
				id: v.id,
				title: v.snippet.title,
				description: v.snippet.description,
				image: v.snippet.thumbnails.default.url,
				imageMed: v.snippet.thumbnails.medium.url,
				imageHigh: v.snippet.thumbnails.high.url,
			};
		});
	};

	useEffect(() => {
		if (!isLoading && !error) {
			setListOfVideos(getVideosData());
		}
	}, [data]);

	return (
		<>
			{isLoading && <p>loading...</p>}
			{error && <p>error...</p>}
			<VideoList videos={listOfVideos} />
		</>
	);
}

export default VideoData;
