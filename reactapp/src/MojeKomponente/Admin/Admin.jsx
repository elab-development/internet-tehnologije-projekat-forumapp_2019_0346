import React from 'react';
import axios from 'axios';
 
import './Admin.css';  
import useUsers from '../../useUsers';

const Admin = () => {
  const { users, setUsers, loading, error } = useUsers();

  const handleRoleChange = async (id, roleId) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        await axios.put(`http://127.0.0.1:8000/api/users/${id}/role`, { role_id: roleId }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Ažuriraj ulogu korisnika u stanju
        setUsers(users.map(user => user.id === id ? { ...user, role_id: roleId } : user));
      } else {
        throw new Error('No token found');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role_id}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="1">User</option>
                  <option value="2">Moderator</option>
                  <option value="3">Admin</option>
                </select>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
