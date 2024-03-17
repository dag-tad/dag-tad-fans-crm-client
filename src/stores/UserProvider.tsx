import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUserData } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export type UserContextValue = {
    users: IUserData[],
    user: IUserData | undefined,
    addUser: (email: string, password: string, fullName: string, phoneNumber: string) => void,
    fetchUsers: () => void,
    getUserId: (id: number) => void,
    errorMessage: string | undefined;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: any) => {
    const [users, setUsers] = useState<IUserData[]>([]);
    const [user, setUser] = useState<IUserData | undefined>();
    const [userId, getUserId] = useState<number>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    
    const _fetchUsers = () => {
        return api.get('/get-all', {
            headers: {
                token: localStorage.getItem('token')
            }
        });
    }
    
    const _getUser = () => {
        return api.get(`/get-user/${userId}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
    }

    const { data, refetch: fetchUsers} = useQuery(['users'], _fetchUsers);
    const { data: _userData, refetch: fetchUser} = useQuery(['user by id', ], _getUser, {enabled: false});

    const {
        data: newUserData,
        mutate: _addUser,
        error: addUserError,
        isLoading,
    } = useMutation({
        mutationKey: ["add-user"],
        mutationFn: ({ email, password, fullName, phoneNumber }: { email: string, password: string, fullName: string, phoneNumber: string }) => {
            return api.post('/signup', { email, password , name: fullName, phoneNumber})
        },
    });

    const addUser = (email: string, password: string, fullName: string, phoneNumber: string ) => {
        _addUser({ email, password, fullName, phoneNumber });
    }

    useEffect(() => {
        if (data) {
            setUsers(data.data as unknown as any);
        }
    }, [data]);

    useEffect(() => {
        if(userId){
            fetchUser();
        }
    }, [userId])

    useEffect(() => {
        if(addUserError){
            setErrorMessage('error');
        } 
    }, [addUserError])

    useEffect(() => {
        if (_userData) {
            setUser(_userData.data as unknown as any);
        }
    }, [_userData]);
    
    useEffect(() => {
        if (newUserData) {
            setErrorMessage(undefined);
        }
    }, [newUserData]);

    useEffect(() => {
        if (!addUserError) {
            navigate('/list');
        }
    }, [newUserData]);

    return (
        <UserContext.Provider
            value={{
                users,
                user,
                addUser,
                fetchUsers,
                getUserId,
                errorMessage
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
