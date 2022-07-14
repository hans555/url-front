import "./App.css";
import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmitUrl = () => {
    let payload = {
      url: url,
    };
    const requestUrl = "http://localhost:8080/url/post";
    fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        if (resp.ok) {
          setUrl("");
          resp.json().then((response) => {
            setShortUrl(response.shortUrl);
          });
        } else {
          console.log("Failed to convert URL");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App-container">
      <div className="Form-container">
        <div className="Form-row">
          <label className="Form-label">Enter URL here:</label>
          <input
            className="Form-input"
            type="text"
            id="url"
            name="url"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="Form-row">
          <button
            className="Form-button"
            disabled={url === ""}
            onClick={handleSubmitUrl}
          >
            Submit URL
          </button>
        </div>
        {shortUrl === "" ? (
          <div />
        ) : (
          <div className="Form-row">
            <label className="Form-label">New Shorten URL:</label>
            <textarea value={shortUrl} disabled />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
