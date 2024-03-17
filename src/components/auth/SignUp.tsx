import React, { CSSProperties, useEffect } from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { AuthContextValue, useAuth } from '../../stores/AuthProvider';
import { useNavigate } from 'react-router-dom';

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
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
};

const Signup: React.FC = () => {
    const { signup, userData, errorMessage } = useAuth() as AuthContextValue;
    const navigate = useNavigate();
    const onFinish = (values: FieldType) => {
        signup(values.fullName, values.phoneNumber, values.email, values.password);
    };


    useEffect(() => {
        if (userData) {
            navigate('/list', { replace: true });
        }
    }, [userData]);
    
    return <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={formStyle}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Full name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input placeholder='Full name' />
        </Form.Item>
        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input placeholder='email@example.com' />
        </Form.Item>
        <Form.Item<FieldType>
            label="Phone number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input placeholder='+251-911-111-111-11' />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password placeholder='password' />
        </Form.Item>
        {errorMessage && <div style={{ color: 'red', display: 'flex', justifyContent: 'center', marginBottom: 10 }}>{errorMessage}</div>}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Signup
            </Button>
        </Form.Item>
    </Form>
};

export default Signup;