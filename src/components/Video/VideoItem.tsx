import { Video } from './VideoData';
import styles from './VideoItem.module.css';

type VideoItemProps = {
	video: Video;
	selectVideo: (video: Video) => void;
};

function VideoItem({ video, selectVideo }: VideoItemProps) {
	const handleSelectVideo: React.MouseEventHandler = () => {
		selectVideo(video);
	};
	return (
		<article className={styles.video}>
			<img src={video.image} alt={video.title} />
			<section className={styles.video__text}>
				<a onClick={handleSelectVideo}>{video.title.substring(0, 45)}...</a>
				<p>{video.description.substring(0, 50)}...</p>
			</section>
		</article>
	);
}

export default VideoItem;
