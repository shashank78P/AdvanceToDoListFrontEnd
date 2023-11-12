import React, { useContext, useEffect, useState } from 'react'
import addTaskFrame from "../../style/AddTaskStyle.module.css"
import globalStyle from "../../style/global.module.css"
import InputValidator from '../inputValidator'
import Nav from '../globalComponet/nav'
import UsePostData from "../../customHook/UsePostData"
import { useParams } from 'react-router-dom'
import UseGetData from '../../customHook/UseGetData'
import userContext from '../context/userContext'

const AddTask = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const userDetails = useContext(userContext)
  const [formaData, setFormaData] = useState({
    _id: userDetails.userDetails._id,
    title: "",
    description: "",
    state: "active"
  })
  const [errorMessage, setErrorMessage] = useState({
    titleError: [],
    descriptionError: []
  })
  const { postData } = UsePostData()
  const { getData } = UseGetData()
  useEffect(() => {
    try {
      function data() {
        if (params._id !== '0') {
          getData(`${process.env.REACT_APP_BACKEND_URL}/todoTask/getSingleToDoTask/${params._id}`, setData)
        }
      }
      data()
    } catch (error) { }
  }, [])

  useEffect(() => {
    if (params._id != '0' && userDetails.userDetails._id) {
      data.data && setFormaData({
        _id: userDetails.userDetails._id,
        title: data?.data[0].title,
        description: data?.data[0].description,
        state: data?.data[0].state,
        taskId: params._id
      })
    }
  }, [data])

  return (
    <>
      <Nav />
      <div className={addTaskFrame.addTaskFrame}
        onLoad={() => {
        }}
      >
        <form method='post'
          onSubmit={(e) => {
            e.preventDefault()
            if ((errorMessage.titleError === true && errorMessage.descriptionError === true) || params._id !== '0') {
              let path = (params._id === '0') ? `${process.env.REACT_APP_BACKEND_URL}/todoTask/` : `${process.env.REACT_APP_BACKEND_URL}/todoTask/updateTodoTask`
              postData(path, formaData, "/")
            }
          }}
        >
          <div className={addTaskFrame.formContainer}>
            <div className={addTaskFrame.row}>
              <label><h2>Title</h2></label>
              <input className={globalStyle.textInput} type="text"
                maxLength={50}
                minLength={3}
                required
                onChange={(e) => {
                  setErrorMessage({
                    ...errorMessage,
                    titleError: InputValidator("title", e.target.value)
                  })
                  setFormaData({
                    ...formaData,
                    title: e.target.value
                  })
                }}
                value={formaData.title}
              />
              {
                !(errorMessage.titleError === true) && errorMessage?.titleError.map((err, i) => {
                  return (
                    <p className={globalStyle.error} key={i}>*{err}</p>
                  )
                })
              }
            </div>
            <div className={addTaskFrame.row}>
              <label><h2>Description</h2></label>
              <textarea type="text" className={globalStyle.textInput}
                minLength={3}
                maxLength={256}
                required
                value={formaData.description}
                onChange={(e) => {
                  setErrorMessage({
                    ...errorMessage,
                    descriptionError: InputValidator("description", e.target.value)
                  })
                  setFormaData({
                    ...formaData,
                    description: e.target.value
                  })
                }}
              > </textarea>
              {
                !(errorMessage.descriptionError === true) && errorMessage?.descriptionError.map((err, i) => {
                  return (
                    <p className={globalStyle.error} key={i}>*{err}</p>
                  )
                })
              }
            </div>
            <div className={addTaskFrame.row + " " + addTaskFrame.statusRadio}>
              <h2>Task state</h2>
              <ul className={addTaskFrame.statusRadio}>
                <li className={addTaskFrame.label}>
                  <label htmlFor='active' name="state">
                    Active
                    <input name="state" id='active' type="radio"
                      checked={(formaData.state === "active") ? true : false}
                      value="active"
                      onChange={(e) => {
                        setFormaData({
                          ...formaData,
                          state: "active"
                        })
                      }}
                    />
                  </label>
                </li>
                <li className={addTaskFrame.label}>
                  <label htmlFor='completed' name="state">
                    Completed
                    <input name="state" id='completed' type="radio"
                      checked={(formaData.state === "completed") ? true : false}
                      onChange={(e) => {
                        setFormaData({
                          ...formaData,
                          state: "completed"
                        })
                      }}
                    />
                  </label>
                </li>
              </ul>
            </div>
            <input className={globalStyle.submitBtn + " " + addTaskFrame.submitBtn} type="submit" value={`${params._id === '0' ? "Submit" : "Update"}`}></input>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddTask