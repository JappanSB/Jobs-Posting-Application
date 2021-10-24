import React, { useState, useEffect, useContext, useCallback } from "react"
import classes from "./JobApplicants.module.css"

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context";
import UserRoleContext from "../../../store/userRole-context";

import DescriptionIcon from '@mui/icons-material/Description';

import ProfileCard from "../../../components/UI/ProfileCard/ProfileCard"
import FallbackUi from "../../../components/UI/FallbackUi/FallbackUi"

const JobApplicants = (props) => {
    const [applicantsData, setApplicantsData] = useState([])

    const authCtx = useContext(AuthContext)
    const userRoleCtx = useContext(UserRoleContext)

    const fetchCandidates = useCallback((jobId) => {
        const authToken = authCtx.token
        const userRole = userRoleCtx.isRecruiter ? "recruiters" : "candidates"
        axios.get(`${userRole}/jobs/${jobId}/candidates`, {
            headers: {
                Authorization: authToken
            }
        }).then(response => {
            const data = response.data.data
            setApplicantsData(data)
        })
    }, [])

    useEffect(() => {
        let jobId = props.jobSelected
        fetchCandidates(jobId)
    }, [])

    let jobApplicants = applicantsData !== undefined
        ? (
            <React.Fragment>
                {applicantsData.map(applicant => {
                    return (
                        <ProfileCard
                            key={applicant.id}
                            name={applicant.name}
                            email={applicant.email}
                            skills={applicant.skills} />
                    )
                })}
            </React.Fragment>
        )
        : (
            <FallbackUi
                height="150px"
                background="transparent"
                icon={< DescriptionIcon />}
                content="No applicants available!">
            </FallbackUi>
        )

    return (
        <div>
            <p style={{ fontSize: "15px" }}>Total {applicantsData ? applicantsData.length : "0"} applications</p>
            <div className={classes.JobApplicants}>
                {jobApplicants}
            </div>
        </div>
    )
}

export default React.memo(JobApplicants)