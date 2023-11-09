import React, { useState, useCallback, useContext } from 'react'
import axios from "axios"
import userContext from '../component/context/userContext'
import { useNavigate } from 'react-router-dom'

const UsePostData = () => {
    const [response, setResponse] = useState([])
    const userData = useContext(userContext)
    const navigate = useNavigate()
    const handelMessage = (status, message) => {
        userData.setMessage({
            status,
            message
        })
        setTimeout(() => {
            userData.setMessage(false)
        }, 5000)
    }

    const postData = useCallback((path, body, redirect = false) => {
        userData.setLazyLoader(true)
        axios.post(path, body, {
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-headers': true,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if ([200, 201].includes(res.data.statusCode)) {
                    if (["log in sucessfull", "Auto logIn Sucessfull!!!"].includes(res.data.msg)) {
                        localStorage.setItem("token", res.data.data.token)
                        userData.setUserDetails(res.data.data)
                        userData.setIsLogIn(true)
                    }
                    setResponse(res)
                    handelMessage("sucess", res.data.msg)
                    redirect && navigate("/")
                }
                else {
                    handelMessage("error", res.data.msg)
                }
            })
            .catch(err => {
                handelMessage("error", "something went wrong")
            })
            .finally(() => {
                userData.setLazyLoader(false)
            })
    }, [])
    return { postData, response }
}

export default UsePostData