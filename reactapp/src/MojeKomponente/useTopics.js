import { useState, useEffect } from 'react';
import axios from 'axios';

const useTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/topics', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setTopics(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { topics, setTopics, loading, error };
};

export default useTopics;
