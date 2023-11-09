import React, { useEffect, useState } from 'react'
import userContext from './userContext'
import axios from 'axios'

function UserContextProvider(props) {
  const [isLogIn, setIsLogIn] = useState(false)
  const [lazyLoader, setLazyLoader] = useState(false)
  const [message, setMessage] = useState(false)
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    _id: ""
  })

  return (
    <userContext.Provider value={{ isLogIn, setIsLogIn, userDetails, setUserDetails, lazyLoader, setLazyLoader, message, setMessage }}>
      {
        props.children
      }
    </userContext.Provider>
  )
}

export default UserContextProvider