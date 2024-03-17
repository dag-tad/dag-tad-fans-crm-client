import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { UserContextValue, useUser } from '../stores/UserProvider';
import UsersList from '../components/users/UsersList';
import WithAuth from '../hoc/withAuth';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function UsersListPage() {
  const { users, fetchUsers } = useUser() as UserContextValue;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
} , []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 50}}>
      <div>
      <Link to='/add-user'><Button icon={<PlusOutlined />} type='primary'>Add user</Button></Link>
      </div>
      <UsersList users={users}/>
    </div>
  )
}

export default WithAuth(UsersListPage)
