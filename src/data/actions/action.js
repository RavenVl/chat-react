import * as dataType from './dataType';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { push } from 'connected-react-router';

const secretOrKey = 'secret';

export const userLogin = (user) => {
    return dispatch => {
        axios.post('http://localhost:3030/api/auth', user)
            .then(function (response) {
                if (response.data !== '') {
                    sessionStorage.setItem('token', response.data.token);
                    const decoded = jwt.verify(response.data.token, secretOrKey);
                    sessionStorage.setItem('user', JSON.stringify(decoded));
                    dispatch(
                        {
                            type: dataType.USER_LOGIN,
                            user: decoded
                        });
                    dispatch(push('/chat'));

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

};

export const profileCreate = (profile) =>{
    return dispatch => {

    }
};
export const getProfile = () =>{
    return dispatch => {
        let token=sessionStorage.getItem('token');
        axios.get('http://localhost:3030/api/profile',{
            headers:{
                'token':token
            }
        })
            .then((response)=> {
                if (response.data !== '') {
                   let { text, fb, vk, youtube } = response.data;
                    dispatch(
                        {
                            type: dataType.GET_PROFILE,
                            profile: {text, fb, vk, youtube}
                        });
                    dispatch(push('/profile'));

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};