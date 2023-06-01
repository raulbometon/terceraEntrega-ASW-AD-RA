import React, { useState } from 'react';
import axios from 'axios';
import './styles/comments.css';

const IssueNewComment = ({issueId, description}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request
      const response = await axios.post(`https://apiadra4.fly.dev/issues/${issueId}/newComments`, {
          content: comment,
          issue_id: issueId
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d'
          }
      });

      // Handle the response
      console.log('Comment posted:', response.data);

      // Reset the form
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="comments-new-container">
      <form onSubmit={handleSubmit} className="comments-new-container">
        <input type="text" name="content" value={comment} onChange={handleChange} rows={3} className="comments-write-text" placeholder="Type a new comment here" />
        <input type="submit" value="SAVE" className="comments-submit-button" />
      </form>
    </div>
  );
};

export default IssueNewComment;
