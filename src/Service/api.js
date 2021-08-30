import axios from "axios";

const base_url = 'http://localhost:8000';
const url = base_url + '/users';

export const Login = async(user) => {
    return await axios.post(`${url}/login`, user);
    // return await axios.get(url + 'users');
};

export const getUsers = async(id = '') => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
    // return await axios.get(url + 'users');
};

export const addUser = async(user) => {
    // console.log(user);
    return await axios.post(`${url}/add`, user);
}

export const editUser = async(id, user) => {
    //console.log(user);
    return await axios.put(`${url}/${id}`, user);
}

export const deleteUser = async(id, user) => {
    return await axios.delete(`${url}/${id}`, user);
}