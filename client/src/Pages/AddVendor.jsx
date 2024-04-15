import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../port";
import { useLocation } from 'react-router-dom';


const CreateUserForm = () => {
  const [vendorName, setVendorName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [uid, setUid] = useState(state?.uid || null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        vendorName,
        bankAccountNo,
        bankName,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
      };


    try {
      const resp = await axios.post(`${url}/vendor/create-vendor/${uid}`,formData)

      toast.success('vendor Added')
    } catch (error) {
      console.log(error)
      toast.error('Error !')
    }
    navigate('/')
    
  };

  return (
    <div className="bg-[#EEEEEE] p-5 mt-5 mx-5 md:mx-20 rounded-md drop-shadow-md borders">
      <div className="mx-3 text-center mb-3 font-bold text-2xl">Add Vendor</div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:px-5"
      >
        <div className="mb-4">
          <label className="block mb-2">Vendor Name *</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bank Name *</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bank Account Number *</label>
          <input
            type="text"
            value={bankAccountNo}
            onChange={(e) => setBankAccountNo(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address Line 1 *</label>
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address Line 2*</label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">City </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"

          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Country </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"

          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full outline-none rounded h-12 px-4"
          />
        </div>

        <div className="md:flex-row items-center justify-between">
          <button
            type="submit"
            className="rounded bg-[#c93a0e] hover:bg-[#c91b0e] text-white px-6 py-3 mb-4 md:mb-0 md:mr-2 w-full md:w-auto"
          >
            SAVE
          </button>
          <Link to="/">
            <button
              type="button"
              className="rounded bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 mb-4 md:mb-0 md:mr-2 w-full md:w-auto"
            >
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
