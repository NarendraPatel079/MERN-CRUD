import React from 'react';
import { Redirect } from 'react-router-dom';

const Authenticate = (props) => {
    const Cmp = props.cmp;
    //console.log(props);
    return (
        <div>
            {!window.isLoggedIn ? <Redirect to="/"></Redirect> : <Cmp /> }
        </div>
    );
};

export default Authenticate;