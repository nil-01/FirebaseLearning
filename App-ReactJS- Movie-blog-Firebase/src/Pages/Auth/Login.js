import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDocs, query, where,collection,and } from 'firebase/firestore';
import { auth ,firestore} from '../../config/firebaseconfig';
// import { getDoc,doc } from 'firebase/firestore';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    debugger;
    e.preventDefault();

    try {
   
      const emailQuery = query(collection(firestore, 'users'), and (where('Email', '==', email),where('Password','==',password)));
      const emailQuerySnapshot = await getDocs(emailQuery);
      // Check if the user exists in Firestore based on email
    //   const userDoc = await getDoc(doc(firestore, 'users', user.email));
    //    console.log(userDoc);
      if (!emailQuerySnapshot.empty) {
        // User exists, proceed with login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        navigate('/home');
        console.log(user);
      } else {
        // User does not exist in Firestore
        console.log('User does not exist.');
        // You can handle this case, e.g., show an error message or redirect to a signup page
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const onGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Google sign-in successful
        const user = result.user;
        
        // Check if the user is new (created during this sign-in)
       
          // Add user data to Firestore
          firestore.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            // Add more user data as needed
          })
          .then(() => {
            console.log('User data stored in Firestore:', user);
            alert('User is logged in successfully');
            navigate('/home');
          })
          .catch((error) => {
            alert('Error in sign in');
            console.error('Error storing user data in Firestore:', error);
          });
      
          // User already exists, navigate to home directly
          navigate('/home');
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main>
        <section className="container mt-5">
          <div className="card p-4">
            <h1 className="text-center mb-4">Blog App</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="email-address" className="form-label">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  className="form-control"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={onLogin}>
                  Login
                </button>
              </div>

              <div className="mb-3">
                <button className="btn btn-danger" onClick={onGoogleSignIn}>
                  Sign in with Google
                </button>
              </div>
            </form>

            <p className="text-sm text-center">
              No account yet?{' '}
              <NavLink to="/signup" className="text-primary">
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
