import React, { useState, useContext } from 'react'
import classes from "./UserBubble.module.css"

import { useHistory } from "react-router"

import AuthContext from '../../../store/auth-context';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const UserBubble = (props) => {
    const [attachedClasses, setAttachedClasses] = useState([classes.LogoutBubble, classes.RemoveBubble])

    const authCtx = useContext(AuthContext)

    const initialsOfUserName = authCtx.name?.charAt(0).toUpperCase()

    const history = useHistory()

    const onClickArrowHandler = () => {
        if (attachedClasses[1] === classes.RemoveBubble) {
            setAttachedClasses([classes.LogoutBubble])
            return
        }
        setAttachedClasses([classes.LogoutBubble, classes.RemoveBubble])
    }

    const onLogoutHandler = () => {
        authCtx.logout()
        history.replace("/")
    }

    return (
        <React.Fragment>
            <div className={classes.UserBubble}>
                <div className={classes.ProfileIconContainer}>
                    <div className={classes.ProfileIcon}>
                        <p>{initialsOfUserName}</p>
                    </div>
                </div>
                <div className={classes.ArrowDownIconContainer}>
                    <ArrowDropDownIcon className={classes.ArrowDownIcon} onClick={onClickArrowHandler} />
                    <div className={attachedClasses.join("")}>
                        <p onClick={onLogoutHandler}>Logout</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserBubble
