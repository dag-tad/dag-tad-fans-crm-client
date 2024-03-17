import React from 'react'
import { IUserData } from '../../stores/AuthProvider'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom';

interface IUser {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
}
const UsersList = (data: { users: IUser[] }) => {
    const { users } = data;
    const navigate = useNavigate();
    
    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id'
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Name'
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email'
        },
        {
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
            title: 'Phone Number'
        },
        {
            key: Math.random().toString(),
            dataIndex: 'id',
            render: (id: number)=> (<Button type='primary' onClick={() => navigate(`/detail/${id}`)}>Detail</Button>) 
        },
    ];
    return (
        <Table columns={columns} dataSource={users} />
    )
}

export default UsersList
