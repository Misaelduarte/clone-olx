import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <>
            <h2>NOT FOUND (404)</h2>
            <br /><br />

            <Link to="/">Voltar para HOME</Link>
        </>
    );
}

export default NotFound;
