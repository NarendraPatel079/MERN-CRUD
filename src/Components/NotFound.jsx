import React from 'react';
import { NavLink } from 'react-router-dom';
import "../Assets/css/not_found.css";

// document.body.style.backgroundColor = "green";

const NotFound = () => {
    return (
        <div className="not-found-section">
            <div id="clouds">
                <div className="cloud x1"></div>
                <div className="cloud x1_5"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>
            </div>
            <div className='c'>
                <div className='_404'>404</div>
                <hr />
                <div className='_1'>THE PAGE</div>
                <div className='_2'>WAS NOT FOUND</div>
                <NavLink exact to="./" className='btn'>Back To Home</NavLink>
            </div>
        </div>
    )
}

export default NotFound;