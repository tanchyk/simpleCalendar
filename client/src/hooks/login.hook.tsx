import React, {useState, useCallback, useEffect, ReactElement} from 'react';

const storageName: string = 'userData';

export const useLogin = () => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    const login = useCallback((jwtToken: string, id: number): void => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id ,token: jwtToken
        }))
    }, []);

    const logout = useCallback((): void => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect((): void => {
        const data = JSON.parse(localStorage.getItem(storageName)!);

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true);
    }, [login]);

    return  {login, logout, token, userId, ready};
}