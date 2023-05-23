import Button from '../ui/Button/Button';
import { Video } from './VideoData';
import VideoItem from './VideoItem';
import styles from './VideoList.module.css';

type VideoListProps = {
	videos: Video[];
	selectVideo: (video: Video) => void;
	urlChange: (pageToken: string) => void;
	pages: { prev: string; next: string };
};
function VideoList({ videos, selectVideo, urlChange, pages }: VideoListProps) {
	const handleButtonPrev = () => {
		urlChange(pages.prev);
	};

	const handleButtonNext = () => {
		urlChange(pages.next);
	};

	const list: React.ReactNode = videos.map(video => {
		return (
			<li key={video.id}>
				<VideoItem video={video} selectVideo={selectVideo} />
			</li>
		);
	});

	return (
		<section>
			<div className={styles.list__buttons}>
				{pages.prev && <Button onClick={handleButtonPrev}>PREV.</Button>}
				{pages.next && <Button onClick={handleButtonNext}>NEXT.</Button>}
			</div>
			<ul className={styles.list}>{list}</ul>
		</section>
	);
}

export default VideoList;
