import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUserInfo(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};

export default useUserInfo;
