import React, {useContext, useState} from "react";
import JoblyApi from "./api";
import HandleContext from "./HandleContext";
import "./Job.css";

import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup
  } from "reactstrap";

const Job = ({jobs}) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const currUser = useContext(HandleContext);
  const handleApply = async(jobId) => {
    applyToJob(jobId);
  };

  const applyToJob = async(id)=> {
    await JoblyApi.applyToJob(id, currUser.username);
    setAppliedJobs([...appliedJobs, id]);
    setHasApplied(true);
  }
  
  return (
        <section className="col-md-4">
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
            </CardTitle>
            <CardText>
            </CardText>
            <div>
              {jobs.map((job) => (
                  <CardBody key={job.id}><CardTitle>{job.title}</CardTitle> <ListGroup>{job.companyName} {job.salary} {job.equity}</ListGroup> 
                  <button onClick={() => handleApply(job.id)}>
                    {hasApplied ? "Applied" : "Apply"}
                  </button>
                  
                  </CardBody>
            ))}
            
            </div>
          </CardBody>
        </Card>
      </section>
    )
}

export default Job;