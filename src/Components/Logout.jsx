import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    localStorage.setItem('Auth', '');
    window.isLoggedIn = false;
    history.push('/login');
    window.location.reload(false);
    
}

export default Logout;