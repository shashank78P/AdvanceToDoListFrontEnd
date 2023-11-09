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
                <div className={messageStyle.anniCircle}>
                </div>
            </div>
            <div>{userData?.message.message}</div>
        </div>
    )
}

export default Message