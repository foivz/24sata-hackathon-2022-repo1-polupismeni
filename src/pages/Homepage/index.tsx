import React from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { firestore } from '../../firebase';

const Homepage = () => {
    const articlesRef = firestore.collection('articles');
    const a = articlesRef.orderBy('title').limit(5).get().then((snapShot) => snapShot.docs.forEach((s) => console.log(s.data())));
    return (
        <div>
            
        </div>
    );
};

export default Homepage;
