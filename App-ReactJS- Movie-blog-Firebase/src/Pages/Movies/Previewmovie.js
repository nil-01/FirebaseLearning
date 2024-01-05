// import React, { useState, useEffect } from 'react';
// import { Link, useParams,useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../../config/firebaseconfig';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
// import {  signOut } from 'firebase/auth';
// import { auth } from '../../config/firebaseconfig';

// const PreviewMovie = () => {
//     const navigate = useNavigate();
//     const [selectedMovie, setSelectedMovie] = useState(null);
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);

//       navigate('/login');
//       console.log('User signed out');
//       alert("User signed out");

//       // Redirect or perform any additional logic after signing out
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const movieDocRef = doc(firestore, 'movies', id);
//       const movieDoc = await getDoc(movieDocRef);
//       setSelectedMovie({ id: movieDoc.id, ...movieDoc.data() });
//     };

//     fetchMovie();
//   }, [id]);



//   return (
//     <>
//     <div>
//     <div>
//       <Navbar bg="dark" variant="dark" fixed="top">
//         <Navbar.Brand href="/home">Home</Navbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link href="/moviesList">MovieList</Nav.Link>
//         </Nav>
//         <span><Button variant="danger" onClick={handleLogout}>
//           Logout
//         </Button></span>
//       </Navbar>
 
//     </div>
//       <h2>Update Movie</h2>
//       <input disabled
//         type="text"
//         placeholder="Title"
//         value={selectedMovie?.title || ''}
//         onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
//       />
//       <input disabled
//         type="text"
//         placeholder="Director"
//         value={selectedMovie?.director || ''}
//         onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
//       />
//       <input disabled
//         type="text"
//         placeholder="Year"
//         value={selectedMovie?.year || ''}
//         onChange={(e) => setSelectedMovie({ ...selectedMovie, year: e.target.value })}
//       />

     
//       <Link to="/home">Back to Movies</Link>
//     </div>
//     </>
//   );
// };

// export default PreviewMovie;


// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../../config/firebaseconfig';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
// import { signOut } from 'firebase/auth';
// import { auth } from '../../config/firebaseconfig';

// const PreviewMovie = () => {
//   const navigate = useNavigate();
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);

//       navigate('/login');
//       console.log('User signed out');
//       alert('User signed out');

//       // Redirect or perform any additional logic after signing out
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const movieDocRef = doc(firestore, 'movies', id);
//       const movieDoc = await getDoc(movieDocRef);
//       setSelectedMovie({ id: movieDoc.id, ...movieDoc.data() });
//     };

//     fetchMovie();
//   }, [id]);

//   return (
//     <>
//       <div>
//         <Navbar bg="dark" variant="dark" fixed="top">
//           <Navbar.Brand href="/home">Home</Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link href="/moviesList">MovieList</Nav.Link>
//           </Nav>
//           <span>
//             <Button variant="danger" onClick={handleLogout}>
//               Logout
//             </Button>
//           </span>
//         </Navbar>
//       </div>
//       <div>
//         <h2>Preview Movie</h2>
//         <input disabled type="text" placeholder="Title" value={selectedMovie?.title || ''} />
//         <input disabled type="text" placeholder="Director" value={selectedMovie?.director || ''} />
//         <input disabled type="text" placeholder="Year" value={selectedMovie?.year || ''} />

   
//           <div>
//             <h3>Movie Image</h3>
//             <img src={selectedMovie?.imageURL} alt={selectedMovie?.title} style={{ maxWidth: '100%' }} />
//           </div>


//         <Link to="/home">Back to Movies</Link>
//       </div>
//     </>
//   );
// };

// export default PreviewMovie;


import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';

const PreviewMovie = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      console.log('User signed out');
      alert('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    debugger;
    const fetchMovie = async () => {
      const movieDocRef = doc(firestore, 'movies', id);
      const movieDoc = await getDoc(movieDocRef);
      setSelectedMovie({ id: movieDoc.id, ...movieDoc.data() });
    };

      fetchMovie();
  }, [id]);

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/moviesList">MovieList</Nav.Link>
          </Nav>
          <span>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </span>
        </Navbar>
      </div>
      <div>
        <h2>Preview Movie</h2>
        <input disabled type="text" placeholder="Title" value={selectedMovie?.title || ''} />
        <input disabled type="text" placeholder="Director" value={selectedMovie?.director || ''} />
        <input disabled type="text" placeholder="Year" value={selectedMovie?.year || ''} />


          <div>
            <h3>Movie Image</h3>
            <img src={selectedMovie?.imageUrl || 'https://via.placeholder.com/100' } alt={selectedMovie?.title} style={{ maxWidth: '100%' }} />
          </div>
       

        <Link to="/home">Back to Movies</Link>
      </div>
    </>
  );
};

export default PreviewMovie;
