import React from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleImageClick = (imageUrl) => {
    const imgWindow = window.open(imageUrl, '_blank');
    imgWindow.focus();
  };

  const getFullImageUrl = (image) => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    } else {
      return `http://127.0.0.1:8000/${image}`;
    }
  };

  const handleDetailsClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{post.user.name}</span>
        <span className="post-created-at">{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <h2 className="post-topic">{post.topic.name}</h2>
      <p className="post-content">{post.content}</p>
      {post.images && (
        <div className="post-images">
          {JSON.parse(post.images).map((image, index) => (
            <img 
              key={index} 
              src={getFullImageUrl(image)}  
              alt={`Post image ${index + 1}`} 
              onClick={() => handleImageClick(getFullImageUrl(image))} 
            />
          ))}
        </div>
      )}
      {post.other && <p className="post-other">Other info: {post.other}</p>}
      
      <button onClick={handleDetailsClick} className="details-button">
        Details
      </button>
    </div>
  );
};

export default Post;
