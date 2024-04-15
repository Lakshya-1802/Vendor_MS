import React, { useState ,useEffect} from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { toast } from "react-toastify";
import profile from './demoProfile.png'
import { useNavigate } from "react-router-dom";
import url from '../port';
import axios from 'axios';

const TopHeader = () => {

  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('token');

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);



 
const navigate = useNavigate()

  const name = userData?.name?.split(' ')[0];
  const pic = userData?.profile_pic ? userData?.profile_pic : profile;


  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserData({})
    navigate('/login')
    toast.success('Logged Out')
  };

  return (
    <div className="w-full h-20 bg-slate-200">
      <div className="mx-4 md:mx-10 flex h-20 items-center justify-between">
        <div className="text-2xl md:text-3xl font-semibold">Vendor Manager</div>
        {token ?
        <div className="flex h-20 items-center">
        <div className="flex items-center cursor-pointer">
          <img
            src={pic}
            alt=""
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "60px",
              marginRight: "15px",
              borderRadius: "50%",
              width: "60px"
            }}
          />
          <div className="hidden sm:block text-lg font-bold">{name}</div>
        </div>
        <div className="sm:hidden">
          <MdOutlinePowerSettingsNew
            onClick={handleLogout}
            className="mx- h-8 w-8  text-red-500 cursor-pointer hover:text-red-800 transition-colors duration-300"
          />
        </div>
        <button
          onClick={handleLogout}
          className="hidden sm:block ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
        :null}
        
      </div>
    </div>
  );
};

export default TopHeader;
