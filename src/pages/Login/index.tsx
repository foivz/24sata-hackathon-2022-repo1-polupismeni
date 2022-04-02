import React from 'react';
import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Button } from '@material-ui/core';
import { GrGoogle, GrFacebook } from 'react-icons/gr';
// import FirebaseApp, { firebaseAuth } from 'firebase';

import './_login.scss'
import { firebaseAuth } from '../../firebase';
import { BrowserHistory } from 'history';

interface Props {
    history: BrowserHistory | undefined;
}
// const auth = firebase.auth();

const Login = (props: Props) => {
    const { history } = props;
 
    const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebaseAuth.signInWithPopup(provider).then((user) => {
            console.log('tu', history)

        });
	}
    const signInWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebaseAuth.signInWithPopup(provider).then((user) => console.log(user.user?.displayName))
    }
    return (
        <div className='login'>
            <div className='login__title'>everyEuro</div>
            <img src='/chart-192.png' alt='chart'>
            </img>
           <Button onClick={signInWithGoogle} style={{'color': '#4E9F3D', 'border': '1px solid #4E9F3D', 'width': '35vh', 'marginTop': '8px'}}
           endIcon={<GrGoogle  style={{'color': '#4E9F3D'}}/>}>Log in via google</Button>
           <Button onClick={signInWithFacebook} style={{'color': '#4E9F3D', 'border': '1px solid #4E9F3D', 'width': '35vh', 'marginTop': '8px'}}
           endIcon={<GrFacebook  style={{'color': '#4E9F3D'}}/>}>Log in via facebook</Button>
        </div>
    );
};

export default Login;