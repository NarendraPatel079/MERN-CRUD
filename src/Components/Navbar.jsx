import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink, useHistory } from 'react-router-dom';
//Typography
const useStyles = makeStyles({
    hearder: {
        background: "#000"
    },
    tabs: {
        color: "#fff",
        textDecoration: "none",
        marginRight: 20,
        fontSize: 20
    }
});

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar className={classes.hearder} position='static'>
            <Toolbar>
                <NavLink exact to="./" className={classes.tabs}>MERN CRUD</NavLink>
                {
                    window.isLoggedIn
                    ?
                        <NavLink exact to="add" className={classes.tabs}>Add User</NavLink>
                    :
                        ''

                }
                {
                    window.isLoggedIn
                    ?
                        <NavLink exact to="all" className={classes.tabs}>All Users</NavLink>
                    :
                        ''

                }
                {
                    window.isLoggedIn
                    ?
                        <NavLink exact to="./logout" className={classes.tabs} onClick={(e) => {
                            e.preventDefault();
                            const confirmBox = window.confirm(
                                "Do you really want to logout?"
                            )
                            if (confirmBox === true) {
                                history.push('/logout');
                            }
                        }} >Logout</NavLink>
                    :
                        <NavLink exact to="./login" className={classes.tabs}>Login</NavLink>

                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;