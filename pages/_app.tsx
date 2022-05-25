import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    // Hack to import bootstrap into next.js
    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;
    }, [])

    return <Component {...pageProps} />
}

export default MyApp
