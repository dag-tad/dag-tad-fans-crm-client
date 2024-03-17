import React, { useEffect } from 'react'
import { UserContextValue, useUser } from '../stores/UserProvider';
import UserDetail from '../components/users/UserDetail';
import { useParams } from 'react-router-dom';
import WithAuth from '../hoc/withAuth';

function UserDetailPage() {
    const { user, getUserId } = useUser() as UserContextValue;
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getUserId(parseInt(id));
        }
    }, []);
    
    return (
        <UserDetail name={user?.name!} email={user?.email!} phoneNumber={user?.phoneNumber!} />
    )
}

export default WithAuth(UserDetailPage)
