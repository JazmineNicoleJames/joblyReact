import React, {useState} from "react";
import JoblyApi from "./api";

const CompanySearch = ({handleSearch}) => {
    const [companyName, setCompanyName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const handleChange = evt => {
        setCompanyName(evt.target.value)
    };
    
    const handleSubmit = async() => {
        try {
            const searchResults = await JoblyApi.searchByName(companyName);
            setSearchResults(searchResults);
            handleSearch(companyName)
            setCompanyName('')
        } catch (err) {
            console.error('err', err)
        };
    }

    return (

        <div>
            <input
                type="text"
                value={companyName}
                onChange={handleChange}
                placeholder="Search for a company" />
                <button onClick={handleSubmit}> Search </button>
                
        </div>
    )
}


export default CompanySearch;