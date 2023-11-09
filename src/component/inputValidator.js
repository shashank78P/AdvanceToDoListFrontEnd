import React from 'react'

const InputValidator = (type, value) => {
    let message = []
    if (value.trim() === "") return [`${type} is required`]
    switch (type.trim()) {
        case "userName":
            if (value.length < 3) return ["User name must have atleast 3 character"]
            else return true
        case "password":
            if (value.length < 6) message.push("password must have atleast 6 character");
            if (!value.match(/[A-Z]/)) message.push("password must have atleast one upper case characters");
            if (!value.match(/[a-z]/)) message.push("password must have atleast one lower case characters");
            if (value.length > 5 && value.match(/[A-Z]/) && value.match(/[a-z]/)) return true
            return message
        case "email":
            if (!value.match(/^[a-zA-z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) return ["invalid email"]
            else return true
        case "title":
            if (value.length < 3) return ["title must have atleast 3 character"]
            else return true
        case "description":
            if (value.length < 3 || value.length > 256) return ["description must have atleast 3 character and max of 256 character"]
            else return true
    }
}

export default InputValidator