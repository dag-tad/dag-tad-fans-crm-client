import React, { CSSProperties, useEffect } from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextValue, useUser } from '../../stores/UserProvider';

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

const AddUser: React.FC = () => {
    const { addUser, errorMessage } = useUser() as UserContextValue;
    const navigate = useNavigate();
    const onFinish = (values: FieldType) => {
        addUser(values.email, values.password, values.fullName, values.phoneNumber);
    };

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
        {errorMessage && <div style={{ color: 'red', display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            Email already exist
        </div>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            <Button type="primary" htmlType="submit">
                Save
            </Button>
            <Link to="/list">
                <Button type="primary" htmlType="submit">
                    Cancel
                </Button>
            </Link>
        </div>
    </Form>
};

export default AddUser;