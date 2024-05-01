import React, { createContext, useState } from 'react';
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [position, setPosition] = useState(null);
    return <AuthContext.Provider value={{ user, setUser, position, setPosition }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
