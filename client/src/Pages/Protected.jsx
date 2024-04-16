import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const {Component}=props
    const navigate = useNavigate()
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    

    const token = getCookie('token');
    
    useEffect(()=>{
        let loggedin = localStorage.getItem('token') || token
        if(!loggedin){
            navigate('/login')
        }
    },[token])
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
