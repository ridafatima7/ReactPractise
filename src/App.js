import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Views/Navbar';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <>
  <Router>
    <Navbar />
    <div className="App">
      
    </div>
    </Router>,
    </>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
export default App;
