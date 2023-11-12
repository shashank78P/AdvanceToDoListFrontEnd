import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import globalStyle from "../../style/global.module.css"
import loginStyle from "../../style/loginStyle.module.css"
import "../../App.css"


import InputValidator from '../inputValidator'
import UsePostData from '../../customHook/UsePostData'
import userContext from '../context/userContext'

let initFormData = {
    userName: "",
    password: "",
    email: "",
}
let initFormDataErrorMsg = {
    userNameError: [],
    passwordError: [],
    emailError: [],
}

function Login() {
    const { postData, response } = UsePostData()
    const [logInFlag, setLogInFlag] = useState(true)
    const [formData, setFormData] = useState(initFormData)
    const [isFormValid, setIsFormValid] = useState(false)
    const [formDataErrorMsg, setFormDataErrorMsg] = useState(initFormDataErrorMsg)
    const userData = useContext(userContext)

    useEffect(() => {
        //if all the attribute in sign in form true (no error) show submit button
        if (!logInFlag && Object.values(formDataErrorMsg).every((ele) => { return ele === true })) {
            setIsFormValid(true)
        }
        //if all the attribute in login form true (no error) show submit button
        else {
            if (formDataErrorMsg.emailError === true && formDataErrorMsg.passwordError === true) {
                setIsFormValid(true)
            }
            else {
                setIsFormValid(false)
            }
        }
    }, [formData])


    return (
        <div className={loginStyle.wrapper + " " + globalStyle.center}>
            <div className={globalStyle.background + " " + globalStyle.center + " " + loginStyle.frame}>
                <div className={globalStyle.backgroundCircle}></div>
                <div className={globalStyle.backgroundCircle}></div>
                <div className={loginStyle.form}>
                    <div>
                        <ul className={loginStyle.loginNav + " " + globalStyle.centerSpaceBetween} >
                            <li
                                className={(logInFlag) ? globalStyle.header + " " + loginStyle.active : globalStyle.header}
                                onClick={() => { setLogInFlag(true) }}
                            >Log In</li>
                            <li
                                className={(!logInFlag) ? globalStyle.header + " " + loginStyle.active : globalStyle.header}
                                onClick={() => { setLogInFlag(false) }}
                            >Sign Up</li>
                            <span className={(logInFlag) ? "indicator" : "indicator" + " " + loginStyle.moveIndicator}></span>
                        </ul>
                    </div>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {!logInFlag && <div className={loginStyle.row}>
                                <h3>User Name :</h3>
                                <input type="text" name="userName" className={globalStyle.textInput}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            userName: e.target.value
                                        })
                                        setFormDataErrorMsg({
                                            ...formDataErrorMsg,
                                            userNameError: InputValidator("userName", e.target.value)
                                        })
                                    }}
                                ></input>
                                {
                                    (formDataErrorMsg.userNameError !== true) ? formDataErrorMsg.userNameError.map((msg, i) => {
                                        return <p className={ globalStyle.error } key={i}>{msg}</p>
                                    }) : ""
                                }
                            </div>}
                            <div className={loginStyle.row}>
                                <h3>Email :</h3>
                                <input type="email" name='Email' className={globalStyle.textInput}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })
                                        setFormDataErrorMsg({
                                            ...formDataErrorMsg,
                                            emailError: InputValidator("email", e.target.value)
                                        })
                                    }}
                                ></input>
                                {
                                    (formDataErrorMsg.emailError !== true) ? formDataErrorMsg.emailError.map((msg, i) => {
                                        return <p className={ globalStyle.error } key={i}>{msg}</p>
                                    }) : ""
                                }
                            </div>
                            <div className={loginStyle.row}>
                                <h3>Password :</h3>
                                <input type="password" name='password' className={globalStyle.textInput}
                                    onChange={(e) => {
                                        setFormDataErrorMsg({
                                            ...formDataErrorMsg,
                                            passwordError: InputValidator("password", e.target.value)
                                        })
                                        setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })
                                    }}
                                ></input>
                                {
                                    (formDataErrorMsg.passwordError !== true) ? formDataErrorMsg.passwordError.map((msg, i) => {
                                        return <p className={ globalStyle.error }  key={i}>*{msg}</p>
                                    }) : ""
                                }
                            </div>
                            {
                                isFormValid && <button className={globalStyle.submitBtn}
                                    onClick={() => {
                                        if (logInFlag) {
                                            postData(`${process.env.REACT_APP_BACKEND_URL}/auth/logIn`, { password: formData.password, email: formData.email })
                                        }
                                        else {
                                            postData(`${process.env.REACT_APP_BACKEND_URL}/auth/signIn`, formData)
                                        }
                                    }}
                                >{logInFlag ? "Log In" : "Sign Up"}</button>
                            }
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login