import React from 'react'
import { useNavigate } from 'react-router-dom'
import WithAuth from '../hoc/withAuth';
import AddUser from '../components/users/AddUser';

function AddUserPage() {
    return (
        <div style={{ marginTop: 50}}>
            <AddUser />
        </div>
    )
}

export default WithAuth(AddUserPage)
