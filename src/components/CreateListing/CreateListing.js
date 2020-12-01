import React, { useState } from "react";

const CreateListing = ({ setAirBnBLink, airBnBLink, parseURL }) => {
  const createNewAirBnBListing = async () => {
    console.log("airbnb", airBnBLink);
    const res = await fetch("http://localhost:8080/get-listing-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ link: airBnBLink }),
    });

    const data = await res.json();
    console.log("data", data);
    console.log("parseURL", parseURL);
  };

  return (
    <div className="createListing__container">
      <label>New AirBnB Listing Link</label>
      <input
        id="airbnbLink"
        onChange={(e) => setAirBnBLink(e.target.value)}
        value={airBnBLink}
      />
      <button onClick={() => createNewAirBnBListing()}>Create Listing</button>
    </div>
  );
};

export default CreateListing;
