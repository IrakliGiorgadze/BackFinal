import React, { useState, useEffect } from "react";
import RecordLabel from "./components/RecordLabel";

const restEndpoint =
  "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals";

/**
 * API Call helper function
 * @param   {<string>} endpoint Given the endpoint URL
 * @return  {<type>}          <description>
 */
const callRestApi = async (endpoint) => {
  /* 
  The backend does not support CORS:
  i.e. even after adding headers in the request like below, server indicates no supports for CORS hence Chrome will 

  If the backend cannot be changed,

  Solution #1
  install extension for Chrome:
  [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) 

  Solution #2 is by using BFF:
  'https://circumvent-cors.herokuapp.com/https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals'
    
  Ref: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
  */
  const response = await fetch(endpoint);
  const jsonResponse = await response.json();
  console.log("Raw json response from server:");
  console.log(JSON.stringify(jsonResponse));
  return jsonResponse;
};

/**
 * Convert hierarchy from:
 * festival > band > label
 * into:
 * label > band > festival
 * , for meeting the display requirements.
 *
 * @param   {<type>} raw The json object of the raw response returned from API
 * @return  {<type>}          The json object which is converted into 'label > band > festival'
 */
const convertResponse = (raw) => {
  let labels = [];
  raw.forEach(function (festival) {
    festival.bands.forEach(function (band) {
      let labelName = band.recordLabel ? band.recordLabel : "";
      // check if label is not in the list, add it
      let foundLabelIndex = labels.findIndex((x) => x.name === labelName);
      if (foundLabelIndex === -1) {
        foundLabelIndex = labels.push({
          name: labelName,
          bands: [],
        });
        foundLabelIndex--; // new pointer
      }

      // check if the band is not in the list, add it
      let foundBandIndex = labels[foundLabelIndex].bands.findIndex(
        (x) => x.name === band.name
      );
      if (foundBandIndex === -1) {
        // append the band under the label
        labels[foundLabelIndex].bands.push({
          name: band.name,
          festivals: [{ name: festival.name !== null ? festival.name : "" }],
        });
      } else {
        labels[foundLabelIndex].bands[foundBandIndex].festivals.push({
          name: festival.name !== null ? festival.name : "",
        });
      }
    });
  });
  console.log("Converted labels array for display:");
  console.log(JSON.stringify(labels));
  console.log(labels);
  return labels;
};

/**
 * Component at the root, containing a button and list of RecordLabel.
 *
 * @component
 */
function App() {
  const [apiResponse, setApiResponse] = useState();

  const handleClick = () => {
    callRestApi(restEndpoint)
      .then((result) => setApiResponse(result))
      .catch((reason) => console.log(reason.message));
  };

  return (
    <div>
      <h1>EnergyAustralia - Coding Challenge</h1>

      <button data-testid="call-api-btn" onClick={handleClick}>Call API</button>

      {apiResponse &&
        convertResponse(apiResponse).map(function (label, index) {
          return <RecordLabel label={label} key={index} />;
        })}
    </div>
  );
}

export default App;
