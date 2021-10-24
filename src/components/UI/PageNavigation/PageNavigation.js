import React from 'react'
import classes from "./PageNavigaton.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PageNavigation = (props) => {
    return (
        <div className={classes.PageNavigationControls}>
            <span onClick={props.prevPage}>
                <ArrowBackIcon />
            </span>
            <span>
                {props.page}
            </span>
            <span onClick={props.nextPage}>
                <ArrowForwardIcon />
            </span>
        </div>
    )
}

export default PageNavigation
