import React from 'react';

export interface UserContext {
    user: string,
    token: string,
}

export const AuthContext: React.Context<Partial<UserContext>> = React.createContext({});
