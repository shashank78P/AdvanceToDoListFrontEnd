import React, { useCallback, useContext } from 'react'
import userContext from '../component/context/userContext'
import { useNavigate } from 'react-router-dom'

const UseSetUserDetails = () => {
    const navigate = useNavigate()
    const userData = useContext(userContext)
    const setUserDetails = useCallback((response) => {
        if (response) {
            if (response?.data?.data.statusCode === 401) {
                userData.setIsLogIn(false)
            }
            if (response.data?.data.token) {
                userData.setIsLogIn(true)
                let data = response.data.data
                localStorage.setItem("token", response.data.data.token)
                delete data["password"]
                userData.setUserDetails(data)
                navigate("/")
            }
        }
    }, [])
    return { setUserDetails }
}

export default UseSetUserDetails