import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IUserData {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    token?: string
}

export type AuthContextValue = {
    userData: IUserData | undefined
    isLoading: boolean,
    errorMessage: string | undefined;
    signin: (email: string, password: string) => void,
    signup: (fullName: string, phoneNumber: string, email: string, password: string) => void,
    signout: () => void
    getCurrentUser: () => void
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
    const [userData, setUserData] = useState<IUserData>()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const _getCurrentUser = () => {
        return api.get(`/me`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
    }

    const { data: currentUserData, refetch: getCurrentUser } = useQuery(['currentUser'], _getCurrentUser);

    const {
        data,
        mutate,
        error,
        isLoading,
    } = useMutation({
        mutationKey: ["signin"],
        mutationFn: ({ email, password }: { email: string, password: string }) => {
            return api.post('/signin', { email, password })
        },
    });

    const signin = (email: string, password: string) => {
        mutate({ email, password });
    }

    const {
        data: signupuData,
        mutate: signupMutate,
        error: signupError,
        isLoading: signupIsLoading,
    } = useMutation({
        mutationKey: ["signup"],
        mutationFn: ({ fullName, phoneNumber, email, password }: { fullName: string, phoneNumber: string, email: string, password: string }) => {
            return api.post('/signup', { name: fullName, phoneNumber, email, password })
        },
    });

    const signup = (fullName: string, phoneNumber: string, email: string, password: string) => {
        signupMutate({ email, password , fullName, phoneNumber});
    }

    const signout = () => {
        localStorage.removeItem('token');
        setUserData(undefined);
    }

    useEffect(() => {
        if (data) {
            setUserData(data.data);
        }
    }, [data]);

    useEffect(() => {
        if (signupuData) {
            setUserData(signupuData.data);
        }
    }, [signupuData]);

    useEffect(() => {
        if (userData) {
            setErrorMessage(undefined);
            localStorage.setItem('token', userData.token!);
        }
    }, [userData]);

    useEffect(() => {
        if (currentUserData) {
            setUserData(currentUserData.data);
        }
    }, [currentUserData]);

    useEffect(() => {
        if (error) {
            setErrorMessage('Invalid email or password');
        }
    })

    return (
        <AuthContext.Provider
            value={{
                userData,
                isLoading,
                errorMessage,
                signin,
                signout,
                signup,
                getCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
