import React, { useState } from 'react'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { Link } from 'react-router-dom'
import UsePostData from '../../customHook/UsePostData'
import globalStyle from "../../style/global.module.css"
import homeStyle from "../../style/homeStyle.module.css"

const TaskList = (props) => {
    const { postData, response } = UsePostData()
    function handelPage(direction) {
        if (direction === "left" && props?.taskList?.data.length <= 10 && props?.pageCount > 0) {
            props?.setPageCount(props?.pageCount - 10)
        }
        else if ((props?.taskList?.data.length === 10 && props?.pageCount >= 0) && direction === "right") {
            props?.setPageCount(props?.pageCount + 10)
        }
    }
    return (
        <div className={homeStyle.taskListContainer}>
            {
                (props?.taskList?.data) ?
                    props?.taskList.data.map((task, i) => {
                        return (<div className={globalStyle.centerSpaceBetween + " " + homeStyle.taskList} key={i}>
                            <ul >
                                <li className={` ${homeStyle.titleRow}`}>
                                    <Link to={`/viewTask/${task._id}`} ><h2>{task.title}</h2></Link>
                                    <p className={(task.state === "active") ? globalStyle.active : globalStyle.completed +" " + homeStyle?.status} >{task.state}</p>
                                </li>
                                <li className={`${homeStyle.description}`}>
                                    {task?.description}
                                </li>
                            </ul>
                            <label htmlFor={task._id} key={task._id}>
                                <input type="checkBox" id={task._id}
                                    checked={(task.state === "completed") ? true : false}
                                    onChange={(e) => {
                                        postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/update`, {
                                            userID: task._id,
                                            type: "toggleState",
                                            state: (task.state === "completed") ? "active" : "completed"
                                        })
                                        props?.setRefresh(
                                            prev => {
                                                if (prev == 100) {
                                                    return 101
                                                }
                                                else {
                                                    return 100
                                                }
                                            }
                                        )
                                    }}
                                ></input>
                            </label>
                        </div>
                        )
                    }) :
                    <h1 className={`${ homeStyle.notFound }`}>No Record Found!!!</h1>
            }
            {/* pagination */}
            {(props?.taskList?.data) &&
                <div className={globalStyle.centerSpaceBetween + " " + homeStyle.pagination}>
                    <div className={homeStyle.paginationIcon} onClick={() => {
                        handelPage("left")
                    }}><FaAngleLeft /></div>
                    <div>page {((props?.pageCount / 10) + 1) ?? 1}</div>
                    <div className={homeStyle.paginationIcon} onClick={() => {
                        handelPage("right")
                    }}><FaAngleRight /></div>
                </div>}
        </div>
    )
}

export default TaskList