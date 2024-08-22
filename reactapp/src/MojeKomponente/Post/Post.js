import React from 'react';

const Post = ({ post }) => {
  const handleImageClick = (imageUrl) => {
    const imgWindow = window.open(imageUrl, '_blank');
    imgWindow.focus();
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
              src={image} 
              alt={`Post image ${index + 1}`} 
              onClick={() => handleImageClick(image)} 
            />
          ))}
        </div>
      )}
      {post.other && <p className="post-other">Other info: {post.other}</p>}
    </div>
  );
};

export default Post;
