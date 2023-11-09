import React, { useState, useCallback, useContext } from 'react'
import axios from "axios"
import userContext from '../component/context/userContext'
import { useNavigate } from 'react-router-dom'

const UseGetData = () => {
    const [response, setResponse] = useState([])
    const userData = useContext(userContext)
    const handelMessage = (status, message) => {
        userData.setMessage({
            status,
            message
        })
        setTimeout(() => {
            userData.setMessage(false)
        }, 5000)
    }

    const getData = useCallback((path,setOutPutResponse) => {
        userData.setLazyLoader(true)
        axios.get(path,{headers : {authorization : localStorage.getItem("token")}})
            .then(res => {
                if ([200, 201].includes(res.data.statusCode)) {
                    setOutPutResponse(res.data)
                    res.data.msg && handelMessage("sucess", res.data.msg)
                }
                else {
                    setOutPutResponse(res.data)
                    res.data.msg && handelMessage("error", res.data.msg)
                }
            })
            .catch(err => {
                handelMessage("error", "something went wrong")
            })
            .finally(() => {
                userData.setLazyLoader(false)
            })
    }, [])
    return { getData, response }
}

export default UseGetData