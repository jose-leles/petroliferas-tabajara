import React from "react"
import { AppWrapper } from '../context/AppWrapper';

function Application({ Component, pageProps }) {
    
    return <AppWrapper>
        <Component {...pageProps} />
    </AppWrapper>
}

export default Application