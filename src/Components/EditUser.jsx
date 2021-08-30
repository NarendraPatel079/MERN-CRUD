import { useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, Button, Typography, makeStyles } from '@material-ui/core';
import { useHistory, useParams, Link } from 'react-router-dom';
import { editUser, getUsers } from '../Service/api';

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
    phone: ''
};

const EditUser = () => {
    const [ user, setUser ] = useState(initialValues);
    const { name, username, email, phone } = user;
    const { id } = useParams();

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async() => {
        const response = await getUsers(id);
        //console.log(response);
        if (response.hasOwnProperty('data')) {
            if (response.data.status === 'success') {
                setUser(response.data.data);
            }
        }
    }

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        //console.log(user);
    }

    const editUserDetails = async() => {
        const res = await editUser(id, user);
        //console.log(res);
        if (res.hasOwnProperty('data')) {
            window.notify(res.data.message, res.data.status);
        }
        history.push('../all');
    }

    return(
        <div className={classes.formUI}>
            <FormGroup className={classes.formGroup}>
                <Typography variant="h4" className={classes.title}>Edit User</Typography>
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
                    <Input id="email" name="email" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={email} />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" name="phone" aria-describedby="my-helper-text" onChange={(e) => onValueChange(e)} value={phone} />
                </FormControl>
                <Button className={classes.saveBtn} variant="contained" color="primary" onClick={() => editUserDetails()} >Edit User</Button>
                <Button className={classes.saveBtn} variant="contained" color="secondary" to="../all" component={Link} style={{marginRight: 10}} >Back</Button>
            </FormGroup>
        </div>
    )
}

export default EditUser; 