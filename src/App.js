import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Views/Navbar';
import Login from './Views/Login';
import Register from './Views/Register';
import DeleteCar from './Views/DeleteCar';
import Cars from './Views/Cars';
import Table from './Views/ShowTable';
import UpdateCars from './Views/UpdateCar';
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
    <Routes>
      <Route path="/addcar" element={<Cars/>}>
      </Route>
    </Routes>
    <Routes>
      <Route path="/deletecar" element={<DeleteCar/>}>
      </Route>
    </Routes>
    <Routes>
      <Route path="/updatecar" element={<UpdateCars/>}>
      </Route>
    </Routes>
    <Routes>
      <Route path="/table" element={<Table/>}>
      </Route>
    </Routes>
    </Router>,
    </>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
export default App;
