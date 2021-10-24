import React, { useState } from "react"
import classes from "./Pagination.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const goToNextPage = () => {
        if (currentPage > pageLimit) return setCurrentPage(currentPage)
        setCurrentPage(page => page + 1)
    }

    const goToPrevPage = () => {
        if (currentPage === 1) return setCurrentPage(currentPage)
        setCurrentPage(page => page - 1)
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return data.slice(startIndex, endIndex)
    }


    return (
        <div>
            <div className={classes.DataContainer}>
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent
                        height={"222px"}
                        key={d.id}
                        heading={d.title}
                        content={d.description}
                        extraInformation={{ location: d.location, buttonRequired: false }}
                    />
                ))}
            </div>
            <div className={classes.PageNavigationControls}>
                <span onClick={goToPrevPage}>
                    <ArrowBackIcon />
                </span>
                <span>
                    {currentPage}
                </span>
                <span onClick={goToNextPage}>
                    <ArrowForwardIcon />
                </span>
            </div>
        </div>
    )
}

export default Pagination
