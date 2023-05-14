import './App.css';
import VideoData from './components/Video/VideoData';
import Header from './components/ui/Header/Header';
import LayOut from './components/ui/Layout';
function App() {
	return (
		<div className='App'>
			<Header />
			<LayOut>
				<p>tontaco</p>
				<VideoData />
			</LayOut>
		</div>
	);
}

export default App;
