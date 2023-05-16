import { Video } from './VideoData';
import styles from './VideoActive.module.css';

type VideoActiveProps = {
	video: Video | null;
};

function VideoActive({ video }: VideoActiveProps) {
	return (
		<article className={styles.video}>
			<iframe
				width={640}
				height={360}
				src={`https://www.youtube.com/embed/${video?.id}`}
				title='YouTube video player'
				frameBorder={0}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			></iframe>
			<h3>{video?.title}</h3>
			<p>{video?.description}</p>
		</article>
	);
}

export default VideoActive;
