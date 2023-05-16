import { Video } from './VideoData';
import VideoItem from './VideoItem';
import styles from './VideoList.module.css';

type VideoListProps = {
	videos: Video[];
	selectVideo: (video: Video) => void;
};
function VideoList({ videos, selectVideo }: VideoListProps) {
	const list: React.ReactNode = videos.map(video => {
		return (
			<li key={video.id}>
				<VideoItem video={video} selectVideo={selectVideo} />
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
