import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Button } from '@material-ui/core';

import './_login.scss'

const auth = firebase.auth();

const Login = () => {
    const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider).then((user) => console.log(user.user?.displayName));
	}
    return (
        <div>
            <Button onClick={signInWithGoogle}>NIUKOLAMALI PEDER</Button>
        </div>
    );
};

export default Login;