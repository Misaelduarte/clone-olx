import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <>
            <h2>Bem vindo a Home!</h2>
            <br /><br />

            <Link to="/about">About</Link>
        </>
    );
}

export default Home;
