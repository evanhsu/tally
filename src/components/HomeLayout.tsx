import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import {Routes} from "../routes/routes";

export const HomeLayout = () => {
    return (
        <BrowserRouter>
            <h1>Home Page</h1>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/voters">Voters</Link>
                    </li>
                    <li>
                        <Link to="/elections">Elections</Link>
                    </li>
                </ul>
            </nav>

            <Routes/>

        </BrowserRouter>

    )
}