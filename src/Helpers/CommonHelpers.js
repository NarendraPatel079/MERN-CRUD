export function isLoggedIn(user)  {
    let userInfo = localStorage.getItem('Auth');
    let isLoggedIn = false;
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
    } else {
        userInfo = {};
    }
    if (userInfo) {
        isLoggedIn = (Object.keys(userInfo).length) ? true : false;
    }
    //console.log(isLoggedIn);
    //console.log('Auth', userInfo);
    return isLoggedIn;
}