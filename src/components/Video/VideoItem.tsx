import { Video } from './VideoData';
import styles from './VideoItem.module.css';

type VideoItemProps = {
	video: Video;
};
function VideoItem({ video }: VideoItemProps) {
	return (
		<article className={styles.video}>
			<img src={video.image} alt={video.title} />
			<section className={styles.video__text}>
				<a href={video.videoUrl}>{video.title.substring(0, 45)}...</a>
				<p>{video.description.substring(0, 50)}...</p>
			</section>
		</article>
	);
}

export default VideoItem;
