import React from 'react'

const Filter = (type, arr, target) => {
    switch (type) {
        case "state":
            return arr.filter((element, i) => { return ((element.state).toLowerCase()) === target })
        case "title":
            return arr.filter((element, i) => { return ((element.title).toLowerCase()).startsWith(target) })
    }
}

export default Filter