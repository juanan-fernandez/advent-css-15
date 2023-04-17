import { useHttp, HttpHookResponse } from '../../hooks/useHttp';
import { SetStateAction, useEffect, useState } from 'react';
type Video = {
	id: string;
	title: string;
	description: string;
	image: string;
	imageMed: string;
	imageHigh: string;
};

function VideoData() {
	const apiKey = import.meta.env.VITE_YOUTUBE_APIKEY;
	const url = `'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES&key=${apiKey}'`;
	const [listOfVideos, setListOfVideos] = useState<Video[]>([]);
	const { isLoading, error, data }: HttpHookResponse = useHttp(url);

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
		setListOfVideos(getVideosData());
	}, [data]);
}

export default VideoData;