import React, { useState } from "react";
import "./styles/bulk.css";

const BulkInsert = () => {
  const [subjectText, setSubjectText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subjects = subjectText.split("\n").map((line) => line.trim());

    const formData = {
      issues: subjects.map((subject) => ({ subject })),
    };
    console.log(formData);

    try {
      const response = await fetch("https://apiadra4.fly.dev/issues/bulkForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 3b77389e887d6a4689ecdcb2f009ab5d",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Issues created successfully");
        alert("Issues creades correctament");
      } else {
        console.error("Error creating issues");
        alert("Error al crear les issues.");
        console.log(response);
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  const handleSubjectChange = (event) => {
    setSubjectText(event.target.value);
  };

  return (
    <div className="new-issue-container">
      <div className="container-page">
        <div className="close-issue">&times;</div>
        <div
          className="lightbox lightbox-generic-form lightbox-create-edit open"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="main">
            <div>
              <h2 className="title">
                <span>New bulk insert</span>
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ color: "red" }}></div>
              <div style={{ marginBottom: "0em" }}>
                <textarea
                  name="subject"
                  className="new-issue-description"
                  placeholder="One item per line..."
                  value={subjectText}
                  onChange={handleSubjectChange}
                ></textarea>
              </div>
              <div>
                <button type="submit" className="new-issue-submit">
                  Bulk create
                </button>
              </div>
            </form>
            <div className="back-to-issues">
              <a href="/" className="new-issue-submit">
                Back to issues
              </a>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default BulkInsert;
