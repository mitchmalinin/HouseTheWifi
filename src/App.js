import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import UserInput from "./components/UserInput/UserInput";
import CreateListing from "./components/CreateListing/CreateListing";

function App() {
  const [airBnBLink, setAirBnBLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [listingData, setListingData] = useState(null);
  const [parseURL, setParseURL] = useState("");

  const getReferenceURL = async () => {
    console.log("airbnb", airBnBLink);
    const res = await fetch("http://localhost:8080/get-listing-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: airBnBLink }),
    });
    let data = await res.json();
    return data;
  };

  const submit = async () => {
    setResult(null);
    if (airBnBLink === "") {
      setError("Please enter an Airbnb Link");
      setAirBnBLink("");
    } else if (airBnBLink.includes("https://www.airbnb.com/rooms/") === false) {
      setError("Please enter a Valid Airbnb Link");
      setAirBnBLink("");
    } else {
      let data = await getReferenceURL(airBnBLink);
      setListingData(data);
      let newURL = data[2].split("rooms/")[1];
      checkIfAirbnbListingExists(newURL);
    }
  };

  const checkIfAirbnbListingExists = (parsedURL) => {
    fetchedData.map((listing) => {
      if (listing.url.toString() === parsedURL.toString()) {
        setResult(listing);
        setAirBnBLink("");
      } else {
        setError("No Results Found");
        console.log("bnbnbbn", airBnBLink);
        setResult(null);
      }
    });
  };

  useEffect(() => {
    const fetchFromFireBase = async () => {
      const db = firebase.firestore();
      const data = await db.collection("listings").get();
      if (data !== null) {
        setFetchedData(
          data.docs.map((doc) => {
            return doc.data();
          })
        );
      }
    };
    fetchFromFireBase();
  }, []);

  return (
    <div className="landing__container">
      <h1>House the Wifi?</h1>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      {result != null ? (
        <UserInput
          submit={submit}
          setAirBnBLink={setAirBnBLink}
          airBnBLink={airBnBLink}
        />
      ) : (
        <CreateListing
          setAirBnBLink={setAirBnBLink}
          airBnBLink={airBnBLink}
          parseURL={parseURL}
        />
      )}

      {result && (
        <div className="result__container">
          <div>
            <p>{result.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
