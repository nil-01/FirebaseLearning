// // import React, { useEffect } from 'react';
// // import { onAuthStateChanged } from "firebase/auth";
// // import { auth } from '../config/firebaseconfig';
 
// // const Home = () => {
 
// //     useEffect(()=>{
// //         onAuthStateChanged(auth, (user) => {
// //             if (user) {
// //               // User is signed in, see docs for a list of available properties
// //               // https://firebase.google.com/docs/reference/js/firebase.User
// //               const uid = user.uid;
// //               // ...
// //               console.log("uid", uid)
// //             } else {
// //               // User is signed out
// //               // ...
// //               console.log("user is logged out")
// //             }
// //           });
         
// //     }, [])
 
// //   return (
// //     <section>        
// //       …
// //     </section>
// //   )
// // }
 
// // export default Home

// import React, { useEffect } from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../config/firebaseconfig';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Home = () => {
//  const navigate = useNavigate();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // Redirect or handle the case when the user is not authenticated
//         console.log('User is not signed in');
//       }
//     });

//     return () => unsubscribe(); // Cleanup the listener on component unmount
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);

//       navigate('/login');
//       console.log('User signed out');

//       // Redirect or perform any additional logic after signing out
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <section>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/home">Home</NavLink>
//           </li>
//           {/* Add additional navigation items */}
//           <li>
//             <NavLink to="/dashboard">Dashboard</NavLink>
//           </li>
//           <li>
//             <button onClick={handleLogout}>Logout</button>
//           </li>
//         </ul>
//       </nav>
//       {/* Your Home component content goes here */}
//     </section>
//   );
// };

// export default Home;

//  import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../config/firebaseconfig';
//  import React, { useEffect } from 'react';
// import {  NavLink,useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // Redirect or handle the case when the user is not authenticated
//         console.log('User is not signed in');
//       }
//     });

//     return () => unsubscribe(); // Cleanup the listener on component unmount
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);

//       navigate('/login');
//       console.log('User signed out');

//       // Redirect or perform any additional logic after signing out
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Navbar.Brand href="/home">Home</Navbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link href="/dashboard">Dashboard</Nav.Link>
//         </Nav>
//         <Button variant="danger" onClick={handleLogout}>Logout</Button>
//       </Navbar>
//       {/* Your Home component content goes here */}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
import Movies from './Movies/Movies';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect or handle the case when the user is not authenticated
        console.log('User is not signed in');
        alert("User is not signed in")
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate('/login');
      console.log('User signed out');
      alert("User signed out");

      // Redirect or perform any additional logic after signing out
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
   <>
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">MovieList</Nav.Link>
        </Nav>
        <span><Button variant="danger" onClick={handleLogout}>
          Logout
        </Button></span>
      </Navbar>
 
    </div>
    <div className='container'>
             <Movies/>
    </div>
    </>
  );
};

export default Home;

