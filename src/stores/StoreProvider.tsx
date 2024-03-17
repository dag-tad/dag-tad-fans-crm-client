import React, { FC } from "react";
import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";

type StoreProviderProps = {
    children: any;
};

const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
    <AuthProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </AuthProvider>
);

export default StoreProvider;
