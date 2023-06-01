import React, { useState } from "react";
import "./styles/newissue.css";

const NewIssue = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [typeIssue, setTypeIssue] = useState("");
  const [severityIssue, setSeverityIssue] = useState("");
  const [priorityIssue, setPriorityIssue] = useState("");
  const [statusIssue, setStatusIssue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      subject: subject,
      description: description,
      typeIssue: typeIssue,
      severityIssue: severityIssue,
      priorityIssue: priorityIssue,
      statusIssue: statusIssue,
    };

    try {
      const response = await fetch("https://apiadra4.fly.dev/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 3b77389e887d6a4689ecdcb2f009ab5d",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Issue creada correctamente");
      } else {
        console.error("Error al crear la issue");
        alert("Error al crear la issue.");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  return (
    <div className="new-issue-container">
      <div className="container-page">
        <div className="close-issue">&times;</div>
        <div
          className="lightbox lightbox-generic-form lightbox-create-edit open"
          style={{ display: "flex" }}
        >
          <div className="main">
            <div>
              <h2 className="title">
                <span>New issue</span>
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ color: "red" }}></div>
              <div style={{ marginBottom: "1em" }}>
                <input
                  type="text"
                  name="subject"
                  className="new-issue-subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  name="description"
                  className="new-issue-description"
                  style={{ width: "100%", height: "80px" }}
                  placeholder="Please add descriptive text to help others better understand this issue"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="selectors_issues">
                <div className="new_issue_status">
                  <select
                    name="statusIssue"
                    value={statusIssue}
                    onChange={(e) => setStatusIssue(e.target.value)}
                  >
                    <option value="0">New</option>
                    <option value="1">In Progress</option>
                    <option value="2">Ready for test</option>
                    <option value="3">Closed</option>
                    <option value="4">Needs info</option>
                    <option value="5">Rejected</option>
                    <option value="6">Postponed</option>
                  </select>
                </div>
                <div className="new_issue_bolitas">
                  <select
                    name="typeIssue"
                    value={typeIssue}
                    onChange={(e) => setTypeIssue(e.target.value)}
                  >
                    <option value="0">Bug</option>
                    <option value="1">Question</option>
                    <option value="2">Enhancement</option>
                    <option value="3">To do</option>
                  </select>
                </div>
                <div className="new_issue_bolitas">
                  <select
                    name="severityIssue"
                    value={severityIssue}
                    onChange={(e) => setSeverityIssue(e.target.value)}
                  >
                    <option value="0">Wishlist</option>
                    <option value="1">Minor</option>
                    <option value="2">Normal</option>
                    <option value="3">Important</option>
                    <option value="4">Critical</option>
                  </select>
                </div>
                <div className="new_issue_bolitas">
                  <select
                    name="priorityIssue"
                    value={priorityIssue}
                    onChange={(e) => setPriorityIssue(e.target.value)}
                  >
                    <option value="0">Low</option>
                    <option value="1">Normal</option>
                    <option value="2">High</option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="new-issue-submit"
                />
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

export default NewIssue;
