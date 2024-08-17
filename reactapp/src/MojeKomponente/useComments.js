import { useState, useEffect } from 'react';
import axios from 'axios';

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/comments', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setComments(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return { comments, setComments, loading, error };
};

export default useComments;
