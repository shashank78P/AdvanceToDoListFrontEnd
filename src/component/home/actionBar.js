import React, { useEffect, useState } from 'react'
import { FaSearch, FaPlusCircle, FaTrash, FaUndo, FaFilter } from "react-icons/fa"
import { Navigate, useNavigate } from 'react-router-dom'
import UsePostData from '../../customHook/UsePostData'


import globalStyle from "../../style/global.module.css"
import homeStyle from "../../style/homeStyle.module.css"

const ActionBar = ({ setFilter, setRefresh, refresh, filter, userDetails }) => {

    const [searchInputValue, setSearchInputValue] = useState("")
    const [displayFilter, setDisplayFilter] = useState(false)
    const { postData, response } = UsePostData()
    const navigate = useNavigate()
    return (
        <div className={homeStyle.homeMenu}>
            <ul className={homeStyle.optionFirst}>
                <li className={homeStyle.optionFirstPartOne}>
                    <ul>
                        <li className={globalStyle.center}
                            onClick={async () => {
                                postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/deleteCompleted/${userDetails._id}/delete`, {})
                                setRefresh(prev => {
                                    if (prev == 100) {
                                        return 101
                                    }
                                    else {
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
                                await postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/deleteCompleted/${userDetails._id}/undo`, {})
                                setRefresh(prev => {
                                    if (prev == 100) {
                                        return 101
                                    }
                                    else {
                                        return 100
                                    }
                                })
                            }}>
                            <div className={homeStyle.icon}><FaUndo /></div>
                            <div className={homeStyle.title}> Undo </div>
                        </li>
                    </ul>
                </li>
                <li className={globalStyle.center + " " + homeStyle.addTask}
                    onClick={() => {
                        navigate("/Task/0")
                    }}>
                    <div className={homeStyle.text}> Add Task </div>
                    <div className={homeStyle.icon}><FaPlusCircle /></div>
                </li>
            </ul>

            <ul className={homeStyle.optionFirst + " " + homeStyle.optionSecond}>
                <li className={homeStyle.searchBar}>
                    <input type="text"
                        placeholder='Search for task...'
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
                </li>
            </ul>

            < ul className={homeStyle.thirdOption} >
                <li className={(filter === "all") ? homeStyle.activeTab : ""} onClick={() => { setFilter('all') }} >All</li>
                <li className={(filter === "active") ? homeStyle.activeTab : ""} onClick={() => { setFilter('active') }} >Active</li>
                <li className={(filter === "completed") ? homeStyle.activeTab : ""} onClick={() => { setFilter('completed') }} >Completed</li>
            </ul>
        </div >
    )
}

export default ActionBar