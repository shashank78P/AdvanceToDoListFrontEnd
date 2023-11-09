import React from 'react'
import loaderStyle from "../style/loaderStyle.module.css"
import globalStyle from "../style/global.module.css"

const LazyLoader = () => {
  return (
    <div className={ loaderStyle.loaderBackground + " "+ globalStyle.center}>
        <h1 className={ loaderStyle.loaderText } >Loading....</h1>
    </div>
  )
}

export default LazyLoader