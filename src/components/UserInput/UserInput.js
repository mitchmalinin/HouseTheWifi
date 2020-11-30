import React from "react";
import "./userInput.css";

const UserInput = ({ submit, airBnBLink, setAirBnBLink }) => {
  return (
    <div className="input__container">
      <label>Enter the Airbnb Link</label>
      <input
        id="airbnbLink"
        onChange={(e) => setAirBnBLink(e.target.value)}
        value={airBnBLink}
      />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};

export default UserInput;
