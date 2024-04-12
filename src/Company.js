import React, {useState} from "react";
import { Link } from "react-router-dom";
import CompanySearch from "./CompanySearch";
import JoblyApi from "./api";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
  } from "reactstrap";


const Company = ({companies}) => {

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async(companyName) => {
        try {
            const searchResults = await JoblyApi.searchByName(companyName);
            setSearchResults(searchResults);
        } catch (err) {
            console.error('err', err)
        };
    }

    return (
        <section className="col-md-4">
        <CompanySearch handleSearch={handleSearch} />
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
            </CardTitle>
            <CardText>
            Companies
            </CardText>
            <ListGroup>
                {searchResults.length > 0 ? (
                    searchResults.map((company) => (
                        <Link to={`/companies/${company.handle}`}>
                        <ListGroupItem key={company.handle} company={company}>{company.name}</ListGroupItem>
                            </Link>
                    ))
                ) :
              companies.map((company) => (
                <Link to={`/companies/${company.handle}`} key={company.handle}>
                  <ListGroupItem key={company.handle}>{company.name} {company.description}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </section>
    )
}

export default Company;