import {Routes,route} from "react-router-dom";
import Login from "./src/pages/Login.jsx";
import Register from './src/pages/Register.jsx';
import Dashboard from './src/pages/Dashboard.jsx';


function App(){
  return(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;