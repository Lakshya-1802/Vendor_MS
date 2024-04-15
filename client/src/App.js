import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/home'
import TopHeader from "./Components/TopHeader";
import AddVendor from './Pages/AddVendor'
import EditVendor from "./Pages/EditVendor";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App({navbar=true}) {
  
  return (
    <>
    <Router>
      {navbar && <TopHeader />}
          <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route exact path="/addVendor" element={<AddVendor />} />
            <Route exact path="/editVendor" element={<EditVendor/>} />
            <Route exact path="/*" element={<ErrorPage/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
