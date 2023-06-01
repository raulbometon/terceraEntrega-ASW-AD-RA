import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/issuesEdit.css'
import './styles/issuesEditWrapper.css'
import CommentsActivities from './issueEdit/CommentsActivities'
import IssueDescription from './issueEdit/IssueDescription'
import IssueWatchers from './issueEdit/IssueWatchers'

// Custom Components
const DueDateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BlockedIssueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const DeleteIssueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ width: 20, height: 20 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

function getIssueTypeColor(issueType) {
  switch (issueType) {
    case 0: // "Bug"
      return "#E44057";
    case 1: // "Question"
      return "#5178D3";
    case 2: // "Enhancement"
      return "#40E4CE";
    case 3: // "To do"
      return "#A9AABC";
    default:
      return "#FFFFFF"; // Error
  }
}

function getIssueSeverityColor(issueSeverity) {
  switch (issueSeverity) {
    case 0: // "Wishlist"
      return "#70728F";
    case 1: // "Minor"
      return "#40A8E4";
    case 2: // "Normal"
      return "#40E47C";
    case 3: // "Important"
      return "#E4A240";
    case 4: // "Critical"
      return "#D35450";
    default:
      return "#FFFFFF"; // Error
  }
}

function getIssuePriorityColor(priority) {
  switch (priority) {
    case 0: // "Low"
      return "#A8E440";
    case 1: // "Normal"
      return "#E4CE40";
    case 2: // "High"
      return "#E47C40";
    default:
      return "#FFFFFF"; // Error
  }
}


const IssueEdit = () => {
  const [issue, setIssue] = useState(null);
  const { issueId } = useParams();

  {/*CONFIGURACION DESCRIPTION*/}
  const [desc, setDesc] = useState('');
  const [desc_active, setActivado] = useState('');
  const [desc_send, setDescSend] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}`, {
          headers: {
            Accept: "application/json",
            Authorization: "3b77389e887d6a4689ecdcb2f009ab5d",
          },
        });
        setIssue(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  if (!issue) {
    return <div>Cargando...</div>;
  }

const handleClick = () => {
  setActivado(true);
};

const handleChange = (event) => {
  setDesc(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  // Guardar el texto enviado
  setDescSend(desc);
  // Reiniciar el estado del formulario
  setDesc('');
  setActivado(false);
};

return (
  <div class="two-sections">
    {/*MAIN*/}
    <div class="main-detail">
      {/*HEADER*/}
      <div class="detail-header">
        <div class="detail-title-wrapper">
          <h2>
            <div class="detail-ref">#{issue.id} </div>
            <div class="detail-subject">{issue.subject}</div>
          </h2>
        </div>
        <div class="detail-project">
          <div class="section-name">Issue</div>
        </div>

        {/*SUBHEADER*/}
        <div>Created by</div>
      </div>
      {/*DIVIDER*/}
      <div style={{backgroundColor:'#f1f1f4' , paddingTop: '0.5em', marginBottom: '1em'}}></div>

      {/*DESCRIPTION*/}
      <IssueDescription issueId = {issueId} description = {issue.description}/>

      {/*Activities + Comments*/}
      <CommentsActivities issueId = {issueId}/>

      </div>
    {/*WRAPPER*/}
    <div className="wrapper">
      <sidebar className="sidebar ticket-data">

        <section className="ticket-header">
          <span className="ticket-title ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false" >
            <span>Open</span>
          </span>
          <span className="detail-status ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            <span className="detail-status-inner js-edit-status clickable">
              <span style={{ backgroundColor: '#70728F' }}>
                <span>New</span>
              </span>
            </span>
          </span>
        </section>

        <section className="ticket-section ticket-data-container">
          <div className="ticket-status ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            <div className="type-data clickable">
              <div className="label level-name">Type</div>
              <div className="level-data">
                <span className="label">
                  <div
                    className="level"
                    title="<%= @issue.typeIssue %>"
                    style={{ backgroundColor: getIssueTypeColor(issue.typeIssue) }}
                  ></div>
                </span>
                <span className="level-color" style={{ backgroundColor: '#E44057' }}></span>
              </div>

            </div>
          </div>
          <div className="ticket-status ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            <div className="severity-data clickable">
              <div className="label level-name">Severity</div>
              <div className="level-data">
                <span className="label">
                  <div className="level" title="<%= @issue.severityIssue %>" style={{ backgroundColor: getIssueSeverityColor(issue.severityIssue) }}></div>
                </span>
                <span style={{ backgroundColor: '#40E47C' }} className="level-color"></span>
              </div>
            </div>
          </div>
          <div className="ticket-status ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            <div className="priority-data clickable">
              <div className="label level-name">Priority</div>
              <div className="level-data">
                <span className="label">
                  <div className="level" title="<%= @issue.priorityIssue %>" style={{ backgroundColor: getIssuePriorityColor(issue.priorityIssue) }}></div>
                </span>
                <span style={{ backgroundColor: '#E4CE40' }} className="level-color"></span>
              </div>
            </div>
          </div>
        </section>

        <section className="ticket-section ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
          <div className="ticket-section-label"><span>Assigned</span></div>
          <div className="ticket-user-list-container">

            <div className="ticket-user-list-content">
              <div className="ticket-user-list">
                {/* --ASSIGNED  USER so important -- */}
              </div>
              {/* ---- */}
              <div className="ticket-users-actions" >
                <a className="ticket-users-action">
                </a>
                {/* ---- */}
                {/* ---- */}
              </div>
              {/* ---- */}
            </div>
          </div>
        </section>

        <section className="ticket-section ticket-watchers">
          <div className="ticket-section-label">
            <span>Watchers</span>{/* ---- */}
          </div>
          <div className="ticket-user-list-container">

            <div ng-class="{ 'loading': vm.loading }" className="ticket-user-list-content">
              <div className="ticket-user-list">
                {/* ---- */}
                {/*WATCHERS ADD AND DELETE CONTROL*/}
                <IssueWatchers issueId = {issueId}/>
              </div>
              {/* ---- */}
              <div className="ticket-users-actions">
                {/* ---- */}
                <a className="ticket-users-action" >
                </a>
                {/* ---- */}
                {/* ---- */}
                <a className="ticket-users-action">
                  <span>Watch</span>
                </a>
                {/* ---- */}
                {/* ---- */}
              </div>
            </div>
          </div>
        </section>

        <section className="ticket-section ticket-detail-settings" style={{ justifyContent: 'space-between'}}>
          <tg-promote-to-us-button className="ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            {/*ISSUE DUE DATE*/}
            {/*DUE DATE ICON*/}
              <DueDateIcon />
          </tg-promote-to-us-button>
          {/* ---- */}
          <tg-block-button className="ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false" >
            {/*BLOCKED ISSUE*/}
            {/*BLOCKED ISSUE ICON*/}
              <BlockedIssueIcon />
          </tg-block-button>
          <tg-delete-button className="ng-pristine ng-untouched ng-valid ng-not-empty" aria-invalid="false">
            {/*DELETE ISSUE*/}
            {/*DELETE ISSUE ICON*/}
              <DeleteIssueIcon />
          </tg-delete-button>
        </section>

      </sidebar>
    </div>

  </div>
  );
};

export default IssueEdit;
