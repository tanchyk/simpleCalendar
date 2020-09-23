import {createContext} from 'react';

interface LContext {
    token: string | null
    userId: number | null
    isAuth: boolean

    login(jwtToken: string, id: number): void

    logout(): void
}

export const LoginContext = createContext<LContext>({token: null, userId: null, isAuth: false, login() {}, logout() {}} as LContext);