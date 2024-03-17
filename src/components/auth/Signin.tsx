import React, { CSSProperties, useEffect } from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { AuthContextValue, useAuth } from '../../stores/AuthProvider';
import { useNavigate, useNavigation } from 'react-router-dom';

const formStyle: CSSProperties = {
  border: '1px solid #D7D7D7',
  borderRadius: 10,
  width: 400,
  padding: 25,
  paddingLeft: 5,
  paddingBottom: 5,
  maxWidth: 600
}

type FieldType = {
  email?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SigninForm: React.FC = () => {
  const { signin, userData, errorMessage } = useAuth() as AuthContextValue;
  const navigate = useNavigate();
  const onFinish = (values: { email: string; password: string }) => {
    signin(values.email, values.password);
  };


  useEffect(() => { 
    if (userData) {
      navigate('/list', { replace: true});
    }
  }, [userData]);
  return <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={formStyle}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input placeholder='email@example.com' />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password placeholder='password' />
    </Form.Item>
    {errorMessage && <div style={{color: 'red', display: 'flex', justifyContent: 'center', marginBottom: 10}}>{errorMessage}</div>}
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Signin
      </Button>
    </Form.Item>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}}>
      <div>Don't have an account?</div>
      <Button type='link' onClick={() => navigate('/signup')}>Signup</Button>
    </div>
  </Form>
};

export default SigninForm;