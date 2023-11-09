import React, { useContext, useDeferredValue, useEffect, useState } from 'react'
import Nav from '../globalComponet/nav'
import ActionBar from './actionBar'
// require('dotenv').config();
import globalStyle from "../../style/global.module.css"
import homeStyle from "../../style/homeStyle.module.css"
import TaskList from './taskList'
import UsePostData from '../../customHook/UsePostData'
import UseGetData from '../../customHook/UseGetData'
import userContext from '../context/userContext'

const Home = () => {
  const { getData, response } = UseGetData();
  const [taskList, setTaskList] = useState([])
  const [filter, setFilter] = useState("all")
  const [pageCount, setPageCount] = useState(0)
  const [refresh, setRefresh] = useState(100)
  // const [recivedTaskPerPage, setRecivedTaskPerPage] = useState(0)
  const deferredFilter = useDeferredValue(filter)
  const userData = useContext(userContext)

  useEffect(() => {
    console.log("refresh")
    userData.setLazyLoader(true)
    const identifier = setTimeout(() => {
      getData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/getToDoTask/${userData.userDetails._id}/${filter}/${pageCount}`, setTaskList)
      userData.setLazyLoader(false)
    }, 1000)

    return () => {
      clearTimeout(identifier)
    }
  }, [deferredFilter, pageCount, refresh])

  console.log(refresh)


  return (
    <>
      <Nav />
      <div>
        <ActionBar setFilter={setFilter} filter={filter} userDetails={userData.userDetails} refresh={refresh} setRefresh={setRefresh} />
        <TaskList taskList={taskList} userDetails={userData.userDetails} refresh={refresh} setRefresh={setRefresh} filter={filter} pageCount={pageCount} setPageCount={setPageCount} />
      </div>
    </>
  )
}

export default Home