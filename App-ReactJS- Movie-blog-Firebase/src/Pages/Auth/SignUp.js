import React, { useState } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth ,firestore} from '../../config/firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the email already exists in the users collection
      const emailQuery = query(collection(firestore, 'users'), where('Email', '==', email));
      const emailQuerySnapshot = await getDocs(emailQuery);
  
      if (!emailQuerySnapshot.empty) {
        // Email already exists, handle accordingly (e.g., show an error message)
        alert('Email already exists');
        return;
      }
  
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Add user data to Firestore, including hashed password (for educational purposes only)
        const user = userCredential.user;
        const hashedPassword = password; 
        const userToken = user.UserToken || 'defaultUserToken';

        // Add user data to Firestore
        await addDoc(collection(firestore, 'users'), {
          Email: user.email,
          Password: hashedPassword,
          displayName: user.displayName,
          photoURL: user.photoURL,
          UId: user.uid,
          UserToken: userToken,
          // Add more user data as needed
        });
        console.log('User registered successfully:', user);
        navigate('/login');
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <main className="mt-5 ">
    
      <section className="container " >
        <div className="card p-4">
          <h1 className="text-center mb-4">Blog App</h1>
          <form>
            <div className="mb-s3">
              <label htmlFor="email-address" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="text-sm text-center">
            Already have an account?{' '}
            <NavLink to="/login" className="text-primary">
              Sign in
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
