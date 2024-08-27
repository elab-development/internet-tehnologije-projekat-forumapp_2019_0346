import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:8000/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUsers(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers, loading, error };
};

export default useUsers;
