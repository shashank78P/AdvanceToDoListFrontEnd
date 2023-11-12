import React, { useContext, useEffect } from 'react'
import messageStyle from "../style/loaderStyle.module.css"
import { FaQuestion, FaExclamation } from "react-icons/fa"
import globalStyle from "../style/global.module.css"
import userContext from './context/userContext'
const Message = () => {
    const userData = useContext(userContext)
    return (
        <div className={messageStyle.messageFrame}>
            <div className={(userData.message.status === "sucess") ? messageStyle.icons + " " + globalStyle.center + " " + messageStyle.sucess : messageStyle.icons + " " + globalStyle.center + " " + messageStyle.error}>
                {
                    (userData.message.status === "sucess") ? <FaExclamation /> : <FaQuestion />
                }
                <div
                    className={messageStyle.anniCircle}
                    style={{backgroundColor : (userData.message.status === "sucess") ? "#4ade80" :  "#f87171"}}
                >
                </div>
            </div>
            <div className={(userData.message.status === "sucess") ? globalStyle.sucess : globalStyle.error}>{userData?.message.message}</div>
        </div>
    )
}

export default Message