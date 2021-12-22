import React from 'react'

const Notification = ({message, isError, isSuccess}) => {
    if (isError) {
        return (
            <div className="noti error"> {message} </div>
        )
    }
    else if (isSuccess) {
        return (
            <div className="noti success"> {message} </div>
        )
    }
    return (
        <div className="noti"> {message} </div>
    )
}
export default Notification