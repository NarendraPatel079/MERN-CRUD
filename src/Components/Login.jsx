import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, Button, Typography, makeStyles } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { Login } from '../Service/api';

const useStyles = makeStyles({
    formUI: {
        margin: 'auto 50px',
        overflow: 'auto'
    },
    formGroup: {
        width: 'inherit',
        display: 'block',
        background: '#fff',
        paddingTop: '20px',
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
    email: '',
    password: ''
};

const Home = () => {
    const [user, setUser] = useState(initialValues);
    const { email, password } = user;
    const classes = useStyles();
    const history = useHistory();

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //console.log(user);
    }

    const findUser = async () => {
        const hashedPassword = btoa(user.password);
        if (hashedPassword) {
            user['password'] = hashedPassword;
            const res = await Login(user);
            //console.log(res);
            if (res.hasOwnProperty('data')) {
                window.notify(res.data.message, res.data.status);
                if (res.data.status === 'success') {
                    localStorage.setItem("Auth", JSON.stringify(res.data.data));
                    window.isLoggedIn = true;
                    history.push('./all');
                    window.location.reload(false);
                }
            }
        } else {
            window.notify("Please enter valid password.", "warning");
        }
    }

    return (
        <div className={classes.formUI}>
            <FormGroup className={classes.formGroup}>
                <Typography variant="h4" className={classes.title}>Login</Typography>
                <FormControl>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input type="email" id="email" name="email" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={email} />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password" name="password" onChange={(e) => onValueChange(e)} value={password} />
                </FormControl>
                <Button className={classes.saveBtn} variant="contained" color="primary" onClick={() => findUser()} >Login</Button>
                <Button className={classes.saveBtn} variant="contained" color="secondary" component={Link} to='/add' >Register</Button>
            </FormGroup>
        </div>
    )
}

export default Home;