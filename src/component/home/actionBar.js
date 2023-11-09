import React, { useEffect, useState } from 'react'
import { FaSearch, FaPlusCircle, FaTrash, FaUndo, FaFilter } from "react-icons/fa"
import { Navigate, useNavigate } from 'react-router-dom'
import UsePostData from '../../customHook/UsePostData'


import globalStyle from "../../style/global.module.css"
import homeStyle from "../../style/homeStyle.module.css"

const ActionBar = ({ setFilter, setRefresh , refresh , filter ,userDetails}) => {

    const [searchInputValue, setSearchInputValue] = useState("")
    const [displayFilter, setDisplayFilter] = useState(false)
    const { postData, response } = UsePostData()
    const navigate = useNavigate()
    return (
        <div className={globalStyle.boxBackground + " " + homeStyle.homeMenu}>
            <div className={homeStyle.searchBar}>
                <input type="text"
                    value={searchInputValue}
                    onChange={(e) => {
                        setSearchInputValue(e.target.value)
                        if (e.target.value === "") {
                            setFilter("all")
                            return
                        }
                        setFilter(e.target.value)
                    }}
                ></input>
                <span className={homeStyle.icon}><FaSearch /></span>
            </div>
            <ul className={homeStyle.ActionBar + " " + globalStyle.centerSpaceBetween}>
                <li className={globalStyle.center}
                    onClick={() => { 
                        navigate("/Task/0")
                    }}>
                    <div className={homeStyle.icon}><FaPlusCircle /></div>
                    <div className={homeStyle.title}> Add Task </div>
                </li>
                <li className={globalStyle.center}
                    onClick={async() => { 
                        postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/deleteCompleted/${userDetails._id}/delete`,{})
                        setRefresh( prev => { 
                            if(prev == 100){
                                return 101
                            }
                            else{
                                return 100
                            }
                        }
                        )
                    }}>
                    <div className={homeStyle.icon}><FaTrash /></div>
                    <div className={homeStyle.title}> Delete All Completed </div>
                </li>
                <li className={globalStyle.center}
                    onClick={async () => { 
                        await postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/deleteCompleted/${userDetails._id}/undo`,{})
                        setRefresh(prev => { 
                            if(prev == 100){
                                return 101
                            }
                            else{
                                return 100
                            }
                        })
                    }}>
                    <div className={homeStyle.icon}><FaUndo /></div>
                    <div className={homeStyle.title}> Undo </div>
                </li>
                <li className={globalStyle.center}
                    onClick={() => { setDisplayFilter(!displayFilter) }}>
                    <div className={homeStyle.icon}><FaFilter /></div>
                    <div className={homeStyle.title}> Filter </div>
                </li>
            </ul>
            {
                displayFilter && < ul className={homeStyle.subActionMenu + " " + globalStyle.centerSpaceBetween} >
                    <li className={(filter === "all") ? homeStyle.activeSubAction : ""} onClick={() => { setFilter('all') }} >All</li>
                    <li className={(filter === "active") ? homeStyle.activeSubAction : ""} onClick={() => { setFilter('active') }} >Active</li>
                    <li className={(filter === "completed") ? homeStyle.activeSubAction : ""} onClick={() => { setFilter('completed') }} >Completed</li>
                </ul>
            }
        </div >
    )
}

export default ActionBar