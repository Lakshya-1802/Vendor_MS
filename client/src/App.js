import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./Pages/Protected";
import Home from './Pages/home'
import TopHeader from "./Components/TopHeader";
import AddVendor from './Pages/AddVendor'
import EditVendor from "./Pages/EditVendor";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App() {
  const navbar =true;
  return (
    <>
    <Router>
      {navbar && <TopHeader />}
          <Routes>
            <Route exact path="/" element={<Protected Component={Home}  />} />
            <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route exact path="/addVendor" element={<Protected Component={AddVendor}  />} />
            <Route exact path="/editVendor" element={<Protected Component={EditVendor} />} />
            <Route exact path="/*" element={<ErrorPage/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
