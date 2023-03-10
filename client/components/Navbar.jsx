import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div>
                <h1>
                    Macro Calco
                </h1>
            </div>
            <nav className='nav-links'>
                <Link to='home'>
                    <a>Home</a>
                </Link>
                <Link to='find'>
                    <a>Find Recipe</a>
                </Link>
                <Link to='myaccount'>
                    <a>My Account</a>
                </Link>
                <Link to='logout'>
                    <button>Logout</button>
                </Link>
            </nav>
        </header>
    )
}

export default Navbar;