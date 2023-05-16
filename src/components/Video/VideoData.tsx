import { useHttp, HttpHookResponse } from '../../hooks/useHttp';
//import { useFetch, HttpHookResponse } from '../../hooks/useFetch';
import { useEffect, useState, useRef } from 'react';
import VideoList from './VideoList';
import VideoActive from './VideoActive';
import LayOut from '../ui/Layout';

export type Video = {
	id: string;
	title: string;
	description: string;
	image: string;
	imageMed: string;
	imageHigh: string;
	videoUrl: string;
};

function VideoData() {
	const apiKey = import.meta.env.VITE_YOUTUBE_APIKEY;
	const url =
		'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES&key=' +
		apiKey;

	const { isLoading, error, data }: HttpHookResponse = useHttp(url);
	const [listOfVideos, setListOfVideos] = useState<Video[]>([]);
	const [activeVideo, setActiveVideo] = useState<Video | null>(null);

	const selectActiveVideo = (videosAux: Video[]) => {
		const supLimit = videosAux.length;
		const selectedVideoIndex = Math.floor(Math.random() * supLimit);
		return videosAux[selectedVideoIndex];
	};
	const getVideosData = (items: any): Video[] => {
		const videosAux: Video[] = items.map((v: any) => {
			return {
				id: v.id,
				videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
				title: v.snippet.title,
				description: v.snippet.description,
				image: v.snippet.thumbnails.default.url,
				imageMed: v.snippet.thumbnails.medium.url,
				imageHigh: v.snippet.thumbnails.high.url,
			};
		});

		return videosAux;
	};

	useEffect(() => {
		if (data) {
			const videos = getVideosData(data.items);
			setListOfVideos(videos);
			setActiveVideo(selectActiveVideo(videos));
		}
	}, [data]);

	return (
		<>
			<LayOut>
				{isLoading && <p>loading...</p>}
				{error && <p>error...</p>}
				<VideoActive video={activeVideo} />
				<VideoList videos={listOfVideos} />
			</LayOut>
		</>
	);
}

export default VideoData;
