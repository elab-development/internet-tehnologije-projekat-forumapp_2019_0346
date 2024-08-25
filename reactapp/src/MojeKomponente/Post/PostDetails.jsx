import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem('user_id'); // Assuming user_id is stored in session

  useEffect(() => {
    const fetchPostDetails = async () => {
      const token = sessionStorage.getItem('auth_token'); // Get the token from session storage
      try {
        const postResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        setPost(postResponse.data.data);

        const commentsResponse = await axios.get(`http://127.0.0.1:8000/api/comments?post_id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        setComments(commentsResponse.data.data);

      } catch (err) {
        setError('Failed to load post details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token'); // Get the token from session storage

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/comments',
        {
          content: newComment,
          post_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      // Update the comments list with the new comment
      setComments([...comments, response.data.data]);
      setNewComment(''); // Clear the input field

    } catch (err) {
      setError('Failed to submit comment.');
      console.error(err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.content); // Set the text area with the comment's content
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token'); // Get the token from session storage

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/comments/${editingComment.id}`,
        {
          content: newComment,
          post_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      // Update the comments list with the updated comment
      setComments(comments.map(comment => comment.id === editingComment.id ? response.data.data : comment));
      setNewComment(''); // Clear the input field
      setEditingComment(null); // Exit edit mode

    } catch (err) {
      setError('Failed to update comment.');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = sessionStorage.getItem('auth_token'); // Get the token from session storage

    try {
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      });

      // Remove the deleted comment from the list
      setComments(comments.filter(comment => comment.id !== commentId));

    } catch (err) {
      setError('Failed to delete comment.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-details">
      {post && (
        <>
          <h2>{post.topic.name}</h2>
          <p>{post.content}</p>
          {post.images && (
            <div className="post-images">
              {JSON.parse(post.images).map((image, index) => (
                <img 
                  key={index} 
                  src={image.startsWith('http') ? image : `http://127.0.0.1:8000/${image}`} 
                  alt={`Post image ${index + 1}`} 
                />
              ))}
            </div>
          )}
          {post.other && <p>Other info: {post.other}</p>}
        </>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user.name}:</strong> {comment.content}
              {comment.user.id === parseInt(userId) && (
                <>
                  <button onClick={() => handleEditComment(comment)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={editingComment ? handleUpdateComment : handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">{editingComment ? 'Update Comment' : 'Add Comment'}</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
