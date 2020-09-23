import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {}): Promise<Object> => {
        setLoading(true);
        try {
            if(body) {
                body = JSON.stringify(body);
            }

            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Something wrong');
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearErr = useCallback(()=> setError(null), []);

    return {loading, request, error, clearErr};
}