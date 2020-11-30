import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [airBnBLink, setAirBnBLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [parseURL, setParseURL] = useState("");

  const submit = () => {
    setResult(null);
    if (airBnBLink === "") {
      setError("Please enter an Airbnb Link");
      setAirBnBLink("");
    } else if (airBnBLink.includes("https://www.airbnb.com/rooms/") === false) {
      setError("Please enter a Valid Airbnb Link");
      setAirBnBLink("");
    } else {
      let newURL = airBnBLink.split("rooms/").pop().split("?")[0];
      newURL = newURL.replace(/ /g, "");
      setParseURL(newURL);
      setAirBnBLink("");
      checkIfAirbnbListingExists(newURL);
    }
  };

  const checkIfAirbnbListingExists = (parsedURL) => {
    fetchedData.map((listing) => {
      // console.log("listing", listing.url.length, "url", parsedURL.toString());
      if (listing.url.toString() === parsedURL.toString()) {
        setResult(listing);
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
      <UserInput
        submit={submit}
        setAirBnBLink={setAirBnBLink}
        airBnBLink={airBnBLink}
      />

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
