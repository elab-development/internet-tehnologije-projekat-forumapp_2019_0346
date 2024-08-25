import React from 'react';

const Post = ({ post }) => {
  const handleImageClick = (imageUrl) => {
    const imgWindow = window.open(imageUrl, '_blank');
    imgWindow.focus();
  };

  const getFullImageUrl = (image) => {
    // Check if the image path starts with 'http', 'https', or a similar protocol
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;  // Use the URL as is
    } else {
      // Otherwise, prepend the base URL
      return `http://127.0.0.1:8000/${image}`;
    }
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
              src={getFullImageUrl(image)}  // Use the helper function to determine the full URL
              alt={`Post image ${index + 1}`} 
              onClick={() => handleImageClick(getFullImageUrl(image))} 
            />
          ))}
        </div>
      )}
      {post.other && <p className="post-other">Other info: {post.other}</p>}
    </div>
  );
};

export default Post;
