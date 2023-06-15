import React, {useState} from 'react';
import axios from 'axios';
import {DOMParser} from 'xmldom';
import './drivers.css';

const SearchDrivers = () => {
    const [familyName, setFamilyName] = useState('');
    const [driverData, setDriverData] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://ergast.com/api/f1/drivers?limit=1000&offset=0&FamilyName=${familyName}`);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
            const driverList = xmlDoc.getElementsByTagName('Driver');

            if (driverList.length > 0) {
                const drivers = Array.from(driverList).map(driver => ({
                    givenName: driver.getElementsByTagName('GivenName')[0].textContent,
                    familyName: driver.getElementsByTagName('FamilyName')[0].textContent,
                    dateOfBirth: driver.getElementsByTagName('DateOfBirth')[0].textContent,
                    nationality: driver.getElementsByTagName('Nationality')[0].textContent,
                }));

                const filteredDrivers = drivers.filter(driver => driver.familyName.toLowerCase() === familyName.toLowerCase());

                setDriverData(filteredDrivers);
            } else {
                setDriverData([]);
            }
        } catch (error) {
            console.error(error);
            setDriverData([]);
        }
    };

    return (
        <section className="d-flex justify-content-center align-items-center">
            <div className="essa">
                <h1>Drivers Database</h1>
                {/*<div>*/}
                {/*  <input*/}
                {/*      type="text"*/}
                {/*      value={familyName}*/}
                {/*      onChange={e => setFamilyName(e.target.value)}*/}
                {/*      placeholder="Enter Surname"*/}
                {/*  />*/}
                {/*  <button onClick={handleSearch}>Search</button>*/}
                {/*</div>*/}
                <div className="input-group mt-3 mb-3">
                    <input
                        type="text"
                        value={familyName}
                        onChange={e => setFamilyName(e.target.value)}
                        placeholder="Enter Surname"
                        className="form-control rounded"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    <button onClick={handleSearch} className="btn btn-outline-primary">Search</button>
                </div>
                {driverData && driverData.length > 0 ? (
                    <div>
                        <p>Drivers found:</p>
                        {driverData.map((driver, index) => (
                            // <div key={index}>
                            //   <p>First Name: {driver.givenName}</p>
                            //   <p>Surname: {driver.familyName}</p>
                            //   <p>Date of Birth: {driver.dateOfBirth}</p>
                            //   <p>Nationality: {driver.nationality}</p>
                            //   <hr />
                            // </div>
                            <div className="card text-center m-2 ">
                                <div className="card-header">{driver.givenName} {driver.familyName}</div>
                                <div className="card-body ">
                                    <p className="card-text">Date of birth: {driver.dateOfBirth}</p>
                                    <p className="card-text">Nationality: {driver.nationality} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No drivers found.</p>
                )}
            </div>
        </section>
    );
};

export default SearchDrivers;


