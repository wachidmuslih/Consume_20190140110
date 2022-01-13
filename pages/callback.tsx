import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { supabase } from '../utils/SupabaseClient';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event: any, sessionState: any) => {
                if (sessionState?.user) {
                    router.push('/');
                }
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [router]);

    return null;
};

export default Callback;