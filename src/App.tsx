import './App.css';
import Header from './components/ui/Header/Header';
import LayOut from './components/ui/Layout';
function App() {
	return (
		<div className='App'>
			<Header />
			<LayOut>
				<p>tontaco</p>
				<p>hola</p>
			</LayOut>
		</div>
	);
}

export default App;
