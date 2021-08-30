import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    formUI: {
        margin: '50px',
        overflow: 'auto',
        textAlign: 'center'
    },
    title: {
        color: '#000'
    }
});

const Home = () => {
    const classes = useStyles();

    return(
        <div className={classes.formUI}>
            <Typography variant="h4" className={classes.title}>Welcome to home page.</Typography>
        </div>
    )
}

export default Home;