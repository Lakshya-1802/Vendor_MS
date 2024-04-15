import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const {Component}=props
    const navigate = useNavigate()
    useEffect(()=>{
        let loggedin = localStorage.getItem('token')
        if(!loggedin){
            navigate('/login')
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
