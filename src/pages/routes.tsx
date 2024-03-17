import { RouteObject } from "react-router-dom";

import SigninPage from "./SigninPage";
import CreateUserPage from "./CreateUserPage";
import UsersListPage from "./UsersListPage";
import UserDetailPage from "./UserDetailPage";
import SignupPage from "./SignupPage";
import AddUserPage from "./AddUserPage";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <SigninPage />
    },
    {
        path: '/signin',
        element: <SigninPage />
    },
    {
        path: '/add-user',
        element: <AddUserPage />
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
    {
        path: '/create',
        element: <CreateUserPage />
    },
    {
        path: '/list',
        element: <UsersListPage />
    },
    {
        path: '/detail/:id',
        element: <UserDetailPage />
    }
]

export default routes;