import React, { useContext } from 'react'
import logo from "../../ToDO.svg"
import globalStyle from "../../style/global.module.css"
import userContext from '../context/userContext'

const Nav = () => {
    const userData = useContext(userContext)
    return (
        <nav>
            <ul className={ globalStyle.nav  + " " + globalStyle.centerSpaceBetween }>
                <li>
                    <img src={logo} alt="logo" />
                </li>
                <li>
                    <button className={globalStyle.smallSizeBtn}
                        onClick={()=>{
                            localStorage.removeItem("token")
                            userData.setIsLogIn(false)
                        }}
                    >Log out</button>
                </li>
            </ul>
        </nav>
    )
}

export default Nav