import { useEffect, useState } from "react";
import { getUsers, deleteUser } from '../Service/api';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@material-ui/core";
import classes from '../Assets/css/style.module.css';
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [usersList, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async() => {
        const response = await getUsers();
        //console.log(response);
        if (response.hasOwnProperty('data')) {
            window.notify(response.data.message, response.data.status);

            if (response.data.status === 'success') {
                setUsers(response.data.data);
            }
        } else {
            setUsers(response);
        }
    };

    const deleteUserData = async(id) => {
        const confirmBox = window.confirm("Do you really want to delete?");
        if (confirmBox) {
            let res = await deleteUser(id);
            //console.log(res);
            if (res.hasOwnProperty('data')) {
                window.notify(res.data.message, res.data.status);
            }
            getAllUsers();
        }
    }
    
    //const classes = useStyles();
    return(
        <div className={classes.tableDiv}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>UserName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usersList.map(user => (
                            <TableRow key="row{user._id}">
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" style={{marginRight: 10}} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => deleteUserData(user._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AllUsers; 