import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {}): Promise<Object> => {
        setLoading(true);
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const data = await fetch(url, {
                method,
                body,
                headers
            }).then(async (response) => {
                const last =  await response.json();
                if(!response.ok) {
                    throw new Error(last.message);
                }
                return last;
            });

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