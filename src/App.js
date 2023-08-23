
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Headers from './components/Headers/Headers';
import Edit from './pages/Edit/Edit';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>  
      <Headers />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
