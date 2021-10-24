import React, { useState, useEffect, useContext, useCallback } from "react"
import { useHistory } from "react-router";
import classes from "./JobPostings.module.css"

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context"
import UserRoleContext from "../../../store/userRole-context";

import Recruiters from "../Recruiters/Recruiters";
import Candidates from "../Candidates/Candidates";
// import SearchInput from "../../../components/UI/SearchInput/SearchInput";
import PageNavigation from "../../../components/UI/PageNavigation/PageNavigation";
import { toast } from "react-toastify";

// This is the page that displays the jobs for the userRole that you have loggined with
const JobPostings = () => {
    const [title] = useState("Job Postings")
    let [jobData, setJobData] = useState([])
    const [page, setPage] = useState(1)
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1)

    const authCtx = useContext(AuthContext)
    const authToken = authCtx.token

    const userRoleCtx = useContext(UserRoleContext)
    const isRecruiter = userRoleCtx.isRecruiter
    const userRole = isRecruiter ? "recruiters" : "candidates"

    const history = useHistory()

    const fetchJobsCount = useCallback(async () => {
        let numberOfJobPostings = 0

        await axios.get(`${userRole}/jobs`, {
            headers: {
                Authorization: authToken
            }
        })
            .then(response => {
                if (userRole === "recruiters") {
                    numberOfJobPostings = response.data.data.metadata.count
                }
                if (userRole === "candidates") {
                    numberOfJobPostings = response.data.metadata.count
                }
                return numberOfJobPostings
            })
            .catch(err => toast.error("Cannot fetch Jobs!"))

        return { numberOfJobPostings }

    }, [])

    const fetchJobData = (pageNumber) => {
        return axios.get(`${userRole}/jobs?page=${pageNumber}`, {
            headers: {
                Authorization: authToken
            }
        })
            .then(response => {
                let data = null
                const fetchJobs = []

                // set the query params to the url
                if (userRole === "recruiters") {
                    data = response.data.data.data
                }
                if (userRole === "candidates") {
                    data = response.data.data
                }
                if (data === undefined) return

                data.map(job => fetchJobs.push(job))
                setJobData(fetchJobs)

                // setting url params
                let currentUrlParams = new URLSearchParams(window.location.search);
                currentUrlParams.set('page', page);
                history.push(window.location.pathname + "?" + currentUrlParams.toString());
            })
            .catch(err => {
                toast.error("Jobs loading Failed!")
            })
    }

    useEffect(() => {
        document.title = title

        fetchJobsCount().then((response) => {
            let totalNumberOfPages = Math.ceil(response.numberOfJobPostings / 20)
            // fetchPage(page, response.numberOfJobPostings)
            setTotalNumberOfPages(totalNumberOfPages)
        })
    }, [title])

    useEffect(() => {
        if (page < 1) {
            return setPage(1)
        }
        if (page > totalNumberOfPages) {
            return setPage(totalNumberOfPages)
        }
        fetchJobData(page)
    }, [page])

    return (
        <React.Fragment>
            <div className={classes.JobPostingsContainer}>

                {/* searchbar for filtering jobs */}
                {/* <div className={classes.JobSearchContainer}>
                    <SearchInput
                        data={jobData}
                        updateData={(filteredData) => setJobData(filteredData)}
                        fetchData={() => fetchJobData(page)}
                    />
                </div> */}

                {/* heading */}
                <h1>{isRecruiter ? "Jobs Posted by you" : "Jobs for you"}</h1>

                {/* {jobPostings} */}
                <div className={classes.JobPostings}>
                    {isRecruiter
                        ? <Recruiters jobData={jobData} fetchData={() => fetchJobData(page)} />
                        : <Candidates jobData={jobData} fetchData={() => fetchJobData(page)} />
                    }
                </div>

                {/* page navigation buttons */}
                <PageNavigation
                    page={page}
                    nextPage={() => setPage(page => page + 1)}
                    prevPage={() => setPage(page => page - 1)}
                />
            </div>
        </React.Fragment>
    )
}

export default JobPostings