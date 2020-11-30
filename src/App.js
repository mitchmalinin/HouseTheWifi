import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [airBnBLink, setAirBnBLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [parseURL, setParseURL] = useState("");

  const submit = () => {
    if (airBnBLink === "") {
      setError("Please enter an Airbnb Link");
      setAirBnBLink("");
    } else if (airBnBLink.includes("https://www.airbnb.com/rooms/") === false) {
      setError("Please enter a Valid Airbnb Link");
      setAirBnBLink("");
    } else {
      let newURL = airBnBLink.split("rooms/").pop().split("?")[0];
      setParseURL(newURL);
      setAirBnBLink("");
      checkIfAirbnbListingExists(parseURL);
    }
  };

  const checkIfAirbnbListingExists = (URL) => {
    fetchedData.map((listing) => {
      if (listing.url === URL) {
        setResults(listing);
      } else {
        setError("No Results Found");
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
            console.log(doc.data());
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
      <UserInput
        submit={submit}
        setAirBnBLink={setAirBnBLink}
        airBnBLink={airBnBLink}
      />

      {results && (
        <div className="results__container">
          {results.map((item, i) => {
            return (
              <div>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
