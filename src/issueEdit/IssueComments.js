import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/comments.css';
import user1 from '../sources/user1.png';
import user2 from '../sources/user2.png';

const IssueComments = ({ issueId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apiadra4.fly.dev/issues/${issueId}/comments`, {
          headers: {
            Accept: 'application/json',
            Authorization: '3b77389e887d6a4689ecdcb2f009ab5d',
          },
        });
        setComments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [issueId]);

  if (!Array.isArray(comments)) {
    return (
      <div>
        <span>No comments for the moment</span>
      </div>
      ); // or you can render a loading indicator
  }

  return (
    <div>
      {comments.map((comment) => {
        let userName = '';
        let userPhoto = '';

        if (comment.user_id === 1) {
          userName = 'Raul Bometon';
          userPhoto = user1;
        } else if (comment.user_id === 2) {
          userName = 'Adria Espinoza';
          userPhoto = user2;
        }

        return (
          <article key={comment.id}>
            <div className="comment-container">
              {userPhoto && <img src={userPhoto} alt="Avatar" className="comment-avatar" />}
              <div className="comment-main">
                <div className="comment-data">
                  <span className="comment-creator">{userName}</span>
                  <span className="comment-date">{new Date(comment.created_at).toLocaleDateString('en-US',
                    { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="comment-text-container">
                  <p>
                    <span className="comment-description">{comment.content}</span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default IssueComments;
