import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
import {  signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';

const UpdateMovie = () => {
    const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
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
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const movieDocRef = doc(firestore, 'movies', id);
      const movieDoc = await getDoc(movieDocRef);
      setSelectedMovie({ id: movieDoc.id, ...movieDoc.data() });
    };

    fetchMovie();
  }, [id]);

  const handleUpdateMovie = async () => {
    try {
      const movieDocRef = doc(firestore, 'movies', id);
      await updateDoc(movieDocRef, selectedMovie);
      alert("Movie is updated");
      navigate('/home');
    } catch (error) {
      console.error('Error updating movie:', error.message);
    }
  };

  return (
    <>
    <div>
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/moviesList">MovieList</Nav.Link>
        </Nav>
        <span><Button variant="danger" onClick={handleLogout}>
          Logout
        </Button></span>
      </Navbar>
 
    </div>
      <h2>Update Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={selectedMovie?.title || ''}
        onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Director"
        value={selectedMovie?.director || ''}
        onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={selectedMovie?.year || ''}
        onChange={(e) => setSelectedMovie({ ...selectedMovie, year: e.target.value })}
      />
      <button onClick={handleUpdateMovie}>Update Movie</button>
      <Link to="/home">Back to Movies</Link>
      <div>
            <h3>Movie Image</h3>
            <img src={selectedMovie?.imageUrl || 'https://via.placeholder.com/100' } alt={selectedMovie?.title} style={{ maxWidth: '100%' }} />
          </div>
    </div>
    </>
  );
};

export default UpdateMovie;


// // import React, { useState, useEffect } from 'react';
// // import { Link, useParams, useNavigate } from 'react-router-dom';
// // import { doc, getDoc, updateDoc } from 'firebase/firestore';
// // import { firestore } from '../../config/firebaseconfig';
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// // import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
// // import { signOut } from 'firebase/auth';
// // import { auth } from '../../config/firebaseconfig';

// // const UpdateMovie = () => {
// //   const navigate = useNavigate();
// //   const [selectedMovie, setSelectedMovie] = useState(null);

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth);

// //       navigate('/login');
// //       console.log('User signed out');
// //       alert('User signed out');

// //       // Redirect or perform any additional logic after signing out
// //     } catch (error) {
// //       console.error('Error signing out:', error.message);
// //     }
// //   };

// //   const { id } = useParams();

// //   useEffect(() => {
// //     const fetchMovie = async () => {
// //       const movieDocRef = doc(firestore, 'movies', id);
// //       const movieDoc = await getDoc(movieDocRef);
// //       setSelectedMovie({ id: movieDoc.id, ...movieDoc.data() });
// //     };

// //     fetchMovie();
// //   }, [id]);

// //   const handleUpdateMovie = async () => {
// //     try {
// //       const movieDocRef = doc(firestore, 'movies', id);
// //       await updateDoc(movieDocRef, selectedMovie);
// //       alert('Movie is updated');
// //       navigate('/home');
// //     } catch (error) {
// //       console.error('Error updating movie:', error.message);
// //     }
// //   };

// //   return (
// //     <>
// //       <div>
// //         <Navbar bg="dark" variant="dark" fixed="top">
// //           <Navbar.Brand href="/home">Home</Navbar.Brand>
// //           <Nav className="mr-auto">
// //             <Nav.Link href="/moviesList">MovieList</Nav.Link>
// //           </Nav>
// //           <span>
// //             <Button variant="danger" onClick={handleLogout}>
// //               Logout
// //             </Button>
// //           </span>
// //         </Navbar>
// //       </div>
// //       <div>
// //         <h2>Update Movie</h2>
// //         <input
// //           type="text"
// //           placeholder="Title"
// //           value={selectedMovie?.title || ''}
// //           onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Director"
// //           value={selectedMovie?.director || ''}
// //           onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Year"
// //           value={selectedMovie?.year || ''}
// //           onChange={(e) => setSelectedMovie({ ...selectedMovie, year: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Image URL"
// //           value={selectedMovie?.imageURL || ''}
// //           onChange={(e) => setSelectedMovie({ ...selectedMovie, imageURL: e.target.value })}
// //         />
// //         <button onClick={handleUpdateMovie}>Update Movie</button>
// //         <Link to="/home">Back to Movies</Link>
// //       </div>
// //     </>
// //   );
// // };

// // export default UpdateMovie;

// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { firestore, storage } from '../../config/firebaseconfig';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
// import { signOut } from 'firebase/auth';
// import { auth } from '../../config/firebaseconfig';

// const UpdateMovie = () => {
//   const navigate = useNavigate();
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [newImage, setNewImage] = useState(null);

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

//   const handleUpdateMovie = async () => {
//     try {
//       const movieDocRef = doc(firestore, 'movies', id);

//       // Update other details
//       await updateDoc(movieDocRef, selectedMovie);

//       // Update image if a new one is selected
//       if (newImage) {
//         const storageRef = storage.ref(`moviesimg/${id}`);
//         await storageRef.put(newImage);
//         const imageURL = await storageRef.getDownloadURL();
//         await updateDoc(movieDocRef, { imageURL }, { merge: true });
//       }

//       alert('Movie is updated');
//       navigate('/home');
//     } catch (error) {
//       console.error('Error updating movie:', error.message);
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setNewImage(e.target.files[0]);
//     }
//   };

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
//         <h2>Update Movie</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={selectedMovie?.title || ''}
//           onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Director"
//           value={selectedMovie?.director || ''}
//           onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Year"
//           value={selectedMovie?.year || ''}
//           onChange={(e) => setSelectedMovie({ ...selectedMovie, year: e.target.value })}
//         />
//         <input type="file" onChange={handleImageChange} />
//         <button onClick={handleUpdateMovie}>Update Movie</button>
//         <Link to="/home">Back to Movies</Link>
//       </div>
//     </>
//   );
// };

// export default UpdateMovie;
