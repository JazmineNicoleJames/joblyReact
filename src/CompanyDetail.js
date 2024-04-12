import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Nav } from "reactstrap";
import JoblyApi from "./api";
/* Company detail Component

  Pulls handle from the URL param using the useParams hook

  Fetches data from JoblyApi, pulls company data 

 */
function CompanyDetail({ cantFind }) {
  const { handle } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    async function fetchDetail(){
        try{
            let { company } = await JoblyApi.getCompany(handle);
            setCompanyJobs(company.jobs); 
            setCompanyDetails(company)
        }catch(err){
            console.error("error!",err)
        }
    }
    fetchDetail();
  }, [handle]);

  if (companyJobs.length === 0) return <Navigate to={cantFind} />;
  if(!companyDetails) return <Navigate to={cantFind} />

  


  return (

    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {companyDetails.name}
          </CardTitle>
          <CardText className="font-italic">{companyDetails.description}</CardText>
            {companyJobs.map(job => (
              <Card key={job.id}>
                <CardBody>
                <CardTitle>{job.title}</CardTitle>
                <CardTitle>Salary: {job.salary}</CardTitle>
                <CardTitle>Equity: {job.equity}</CardTitle>
                </CardBody>
                </Card>
            ))}
        </CardBody>
      </Card>
    </section>

  );
}

export default CompanyDetail;
