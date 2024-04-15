import React, { useEffect, useState } from 'react';
import Table from '../Components/Table';
import { useNavigate } from "react-router-dom";
import url from '../port';
import axios from 'axios';


const Home = () => {
  const [userData, setUserData] = useState([]);
  const [uid, setUid] = useState(null);
  const pageSize = 5;
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [data,setData]= useState([])
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUserData(response.data);
      setUid(response.data.uid); // Set uid after fetching user data
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchData = async () => {
    try {
      if (uid) {
        const response = await axios.get(`${url}/vendor/vendors-by-uid/${uid}`);

        setData(response?.data?.vendors)
      }
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [uid]);
 



  const columns = [
    { accessor: "vendorName", header: "Vendor Name" },
    { accessor: "bankAccountNo", header: "Bank Account No." },
    { accessor: "bankName", header: "Bank Name" },
  ];

 
  return (
    <div>
      <div className="mt-5" >
        {data.length > 0 ? (
          <Table
            data={data}
            columns={columns}
            pageSize={pageSize}
            uid={uid}
          />
        ) : (
          <>
            <Table
              data={data}
              columns={columns}
              uid={uid}
            />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
