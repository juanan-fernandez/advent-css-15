import { Video } from './VideoData';
import styles from './VideoItem.module.css';

type VideoListProps = {
	video: Video;
};
function VideoItem({ video }: VideoListProps) {
	return (
		<div className={styles.video}>
			<img src={video.imageMed} alt={video.title} />
			<a href={video.videoUrl}>{video.title}</a>
			<p>{video.description.substring(0, 45)}...</p>
		</div>
	);
}

export default VideoItem;
