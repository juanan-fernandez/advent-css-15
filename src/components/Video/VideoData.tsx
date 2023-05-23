import { useHttp, HttpHookResponse } from '../../hooks/useHttp';
import { useEffect, useState } from 'react';
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
	const initUrl = () =>
		'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES&key=' +
		apiKey;

	const [url, setUrl] = useState(initUrl);
	const { isLoading, error, data }: HttpHookResponse = useHttp(url);
	const [listOfVideos, setListOfVideos] = useState<Video[]>([]);
	const [activeVideo, setActiveVideo] = useState<Video | null>(null);

	const onUrlChange = (pageToken: string): void => {
		let newUrl =
			'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ES';
		if (pageToken) {
			newUrl += '&pageToken=' + pageToken;
		}
		newUrl += '&key=' + apiKey;
		setUrl(newUrl);
	};

	const onSelectVideo = (video: Video): void => {
		setActiveVideo(video);
	};
	const selectActiveVideo = (videosAux: Video[]) => {
		const supLimit = videosAux.length;
		const selectedVideoIndex = Math.floor(Math.random() * supLimit);
		return videosAux[selectedVideoIndex];
	};
	const getVideosData = (items: Array<any>): Video[] => {
		const videosAux: Video[] = items.map(v => {
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
				{isLoading && <p>LOADING...</p>}
				{error && <p>error...</p>}
				<VideoActive video={activeVideo} />
				<VideoList
					videos={listOfVideos}
					selectVideo={onSelectVideo}
					urlChange={onUrlChange}
					pages={{ prev: data?.prevPageToken, next: data?.nextPageToken }}
				/>
			</LayOut>
		</>
	);
}

export default VideoData;
