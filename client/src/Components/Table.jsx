import axios from "axios";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import url from "../port";
import { toast } from "react-toastify";

function Table({
  data,
  pageSize,
  uid,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const onDelete = async (vid)=>{
    try {
      const resp = await axios.delete(`${url}/vendor/delete-vendor/${vid}`)

      toast.success('Item Deleted ')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteConfirm = (vid, vendorName) => {
    setConfirmDelete({ vid, vendorName });
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(confirmDelete.vid);
      setConfirmDelete(null);
    }
  };

  

  const closeModal = () => {
    setConfirmDelete(null);
  };

  const onAdd = () => {

    navigate("/addVendor", { state: { uid: uid } });
  }
  const onEdit = (vendor) => {

    navigate("/editVendor", { state: { vendor:vendor } });
  }

  const filteredData = data.filter((vendor) =>
    Object.values(vendor).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = pageSize
    ? filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : filteredData;

  const pageCount = pageSize ? Math.ceil(filteredData.length / pageSize) : 1;

  return (
    <div className="px-2 py-0 table-container overflow-hidden md:px-10">
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search"
            className="shadow-md border-gray-100 border-2 rounded-md py-3 pl-5 pr-10 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <button
            onClick={onAdd}
            className="bg-red-500 rounded hover:bg-[#c91b0e] text-white w-auto font-bold py-3 px-6"
          >
            ADD Vendor
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table min-w-full table-auto text-left">
          <thead className="h-10">
            <tr className="bg-[#2B2B2B] text-white">
              <th className="px-5 py-5 border-b cursor-pointer">Vendor Name</th>
              <th className="px-5 py-5 border-b cursor-pointer">Bank Account No.</th>
              <th className="px-5 py-5 border-b cursor-pointer">Bank Name</th>
              <th className="px-5 py-5 border-b cursor-pointer">Actions </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((vendor, index) => (
              <tr key={index} className={`bg-white`}>
                <td className="px-5 py-5 border-b border-gray-300">{vendor.vendorName}</td>
                <td className="px-5 py-5 border-b border-gray-300">{vendor.bankAccountNo}</td>
                <td className="px-5 py-5 border-b border-gray-300">{vendor.bankName}</td>
                <td className="px-5 py-5 border-b border-gray-300">
                  <button onClick={() => onEdit(vendor)}>
                    <FiEdit className="inline-block mx-1" />
                  </button>
                  <button onClick={() => handleDeleteConfirm(vendor.vid, vendor.vendorName)}>
                    <FiTrash2 color='red' className="inline-block mx-1" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md mx-2">
            <div className="text-center">
              <p className="mb-4 text-xl">Are you sure you want to delete {confirmDelete.vendorName}?</p>
            </div>
            <div className="flex text-lg justify-evenly">
  <button className="text-red-500 " onClick={handleDelete}>Delete</button>
  <button className="text-gray-600" onClick={closeModal}>Close</button>
</div>

          </div>
        </div>
      )}
      {pageSize && (
        <div className="pagination absolute flex justify-end p-5 gap-3">
          <button
            className={`px-4 border-2 rounded-md ${
              currentPage === 0
                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                : "bg-white text-gray-700 "
            }`}
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            {"<"} Prev
          </button>
          <span className="px-4 py-2">{`${currentPage + 1} - ${pageCount}`}</span>
          <button
            className={`px-4 border-2 rounded-md ${
              currentPage === pageCount - 1
                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                : "bg-white text-gray-700"
            }`}
            disabled={currentPage === pageCount - 1}
            onClick={handleNextPage}
          >
            Next {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
