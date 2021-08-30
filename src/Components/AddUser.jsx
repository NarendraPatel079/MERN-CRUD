import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, Button, Typography, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { addUser } from '../Service/api';
const bcrypt = require('bcryptjs');

const useStyles = makeStyles({
    formUI: {
        margin: 'auto 50px',
        overflow: 'auto'
    },
    formGroup: {
        width: 'inherit',
        display: 'block',
        background: '#fff',
        '& > *': {
            // FormControl css
            margin: '0px 20px 20px 20px',
            display: 'block'
        }
    },
    title: {
        color: '#000'
    },
    saveBtn: {
        marginBottom: 20,
        display: 'inline-block'
    }
});

const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const AddUser = () => {
    const [user, setUser] = useState(initialValues);
    const { name, username, email, password, phone } = user;
    const classes = useStyles();
    const history = useHistory();

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //console.log(user);
    }

    const addUserDetails = async () => {
        const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        // console.log('hashedPassword = ' + hashedPassword);
        if (hashedPassword) {
            // console.warn('user', user);
            user['password'] = hashedPassword;
            // console.warn('user', user);

            const res = await addUser(user);
            //console.log(res);
            if (res.hasOwnProperty('data')) {
                window.notify(res.data.message, res.data.status);
                if (res.data.status === 'success') {
                    if (window.isLoggedIn) {
                        history.push('./all');
                    } else {
                        history.push('./login');
                    }
                }
            } else {
                window.notify("Something went wrong, Please try again.", "dark");
            }
        } else {
            window.notify("Please enter valid password.", "warning");
        }
    }

    return (
        <div className={classes.formUI}>
            <FormGroup className={classes.formGroup}>
                <Typography variant="h4" className={classes.title}>Add User</Typography>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={name} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="username">User Name</InputLabel>
                    <Input id="username" name="username" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={username} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input type="email" id="email" name="email" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={email} />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password" name="password" onChange={(e) => onValueChange(e)} value={password} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" name="phone" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={phone} />
                </FormControl>
                <Button className={classes.saveBtn} variant="contained" color="primary" onClick={() => addUserDetails()} >Add User</Button>
            </FormGroup>
        </div>
    )
}

export default AddUser;