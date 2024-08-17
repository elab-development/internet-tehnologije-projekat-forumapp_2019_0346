import { useState, useEffect } from 'react';
import axios from 'axios';

const useLikes = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/likes', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setLikes(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return { likes, setLikes, loading, error };
};

export default useLikes;
