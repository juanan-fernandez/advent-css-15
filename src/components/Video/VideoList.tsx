import { Video } from './VideoData';
import VideoItem from './VideoItem';
import styles from './VideoList.module.css';

type VideoListProps = {
	videos: Video[];
};
function VideoList({ videos }: VideoListProps) {
	console.log(videos);

	const list: React.ReactNode = videos.map(video => {
		return (
			<li key={video.id}>
				<VideoItem video={video} />
			</li>
		);
	});
	return (
		<>
			<ul className={styles.list}>{list}</ul>
		</>
	);
}

export default VideoList;
