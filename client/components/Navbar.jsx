import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <span>
                    Macro Calco
                </span>
            </ul>
            <ul className='nav-links'>
                <Link to='/'>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;