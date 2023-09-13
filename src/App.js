import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Views/Navbar';
import Login from './Views/Login';
import Register from './Views/Register';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
  <Router>
    <Navbar />
    <div className="App">  
    </div>
    <Routes>
      <Route path="/login" element={<Login/>}>
      </Route>
    </Routes>
    <Routes>
      <Route path="/register" element={<Register/>}>
      </Route>
    </Routes>
    </Router>,
    </>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
export default App;
