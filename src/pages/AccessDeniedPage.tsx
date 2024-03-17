import React from 'react'
import { AuthContextValue, useAuth } from '../stores/AuthProvider';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

function AccessDeniedPage() {
  const { userData, signout, getCurrentUser } = useAuth() as AuthContextValue;
  const navigate = useNavigate();
  
  return (
    <Card title={'Error'} bordered={false} style={{ width: 400 }}>
        <p>To access this page you have to signin first.</p>
        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap: 10}}>
        <Button type="primary" size='large' onClick={() => navigate('/signin')}>Signin</Button>
        <div>Or</div>
        <Button type="primary" size='large' onClick={() => navigate('/signin')}>Signup</Button>
        </div>
      </Card>
  )
}

export default AccessDeniedPage
