import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa"
import viewTaskStyle from "../../style/AddTaskStyle.module.css"
import globalStyle from "../../style/global.module.css"
import { Link, useParams } from "react-router-dom"
import UseGetData from "../../customHook/UseGetData"
import UsePostData from "../../customHook/UsePostData"
import Nav from '../globalComponet/nav'

const ViewTask = () => {
    const { getData, response } = UseGetData()
    const { postData } = UsePostData()
    const param = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        getData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/getSingleToDoTask/${param._id}`, setData)
    }, [])

    return (
        <>
              <Nav />
            {
                data?.data && data?.data.map((task, i) => {
                    return (

                        <div className={viewTaskStyle.viewTaskFrame } key={i}>
                            <header className={viewTaskStyle.viewTaskHeader + " " + globalStyle.centerSpaceBetween}>
                                <div>
                                    <div className={viewTaskStyle.title}>{task.title}</div>
                                    <p className={   task.state == "completed" ? globalStyle.completed : globalStyle?.active + " " + viewTaskStyle.subTitle }>{task.state}</p>
                                </div>
                                <div className={globalStyle.centerSpaceBetween + " " + viewTaskStyle.actionDiv}>
                                    <div>
                                        <Link to={`/Task/${param._id}`} >
                                            <FaEdit />
                                        </Link>
                                    </div>
                                    <div style={{"cursor" : "pointer"}}><FaTrash
                                        onClick={() => {
                                            postData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/deleteTodoTask/${param._id}`, {}, "/")
                                        }}
                                    /></div>
                                </div>
                            </header>
                            <div className={viewTaskStyle.descriptionDiv}>
                                <p className={viewTaskStyle.description}>
                                    {
                                        task.description
                                    }
                                </p>
                            </div>
                            <div className={viewTaskStyle.dateTimeSec}><p>{task.date.slice(0, 10)}</p></div>
                        </div>
                    )
                })
            }
        </>

    )
}

export default ViewTask