import React, {useState, useCallback, useEffect} from 'react';
import ts from "typescript/lib/tsserverlibrary";
import allFilesAreJsOrDts = ts.server.allFilesAreJsOrDts;

const storageName: string = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id ,token: jwtToken
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName)!);

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true);
    }, [login]);

    return {login, logout, token, userId, ready};
}