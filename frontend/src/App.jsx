import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


function App(){
  return(
    <Routes>
      <Route path="/login" element={<Login />} /> //in jsx, we use element instead of component to render the component
      <Route path="/register" element={<Register />} />// in jsx we use {} for javascript expressions and "" means string
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;