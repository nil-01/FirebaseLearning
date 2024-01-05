// import React, { useState } from 'react';
// import { Link ,useNavigate} from 'react-router-dom';
// import { collection, addDoc } from 'firebase/firestore';
// import { firestore } from '../../config/firebaseconfig';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import { Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
// import { signOut } from 'firebase/auth';
// import { auth } from '../../config/firebaseconfig';

// const AddMovie = () => {
//     const navigate = useNavigate();
//     const handleLogout = async () => {
//         try {
//           await signOut(auth);
    
//           navigate('/login');
//           console.log('User signed out');
//           alert("User signed out");
    
//           // Redirect or perform any additional logic after signing out
//         } catch (error) {
//           console.error('Error signing out:', error.message);
//         }
//       };
//   const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '' });

//   const handleAddMovie = async () => {
//     try {
//       const moviesCollection = collection(firestore, 'movies');
//       await addDoc(moviesCollection, newMovie);
//       alert("Movie is added");
//       navigate('/home');
//     } catch (error) {
//       console.error('Error adding movie:', error.message);
//     }
//   };

//   return (
//     <>
//     <div>
//     <Navbar bg="dark" variant="dark" fixed="top">
//       <Navbar.Brand href="/home">Home</Navbar.Brand>
//       <Nav className="mr-auto">
//         <Nav.Link href="/moviesList">MovieList</Nav.Link>
//       </Nav>
//       <span><Button variant="danger" onClick={handleLogout}>
//         Logout
//       </Button></span>
//     </Navbar>

//   </div>
//     <div>
//       <h2>Add New Movie</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={newMovie.title}
//         onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Director"
//         value={newMovie.director}
//         onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Year"
//         value={newMovie.year}
//         onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
//       />
//       <button onClick={handleAddMovie}>Add Movie</button>
//       <Link to="/home">Back to Movies</Link>
//     </div>
//     </>
//   );
// };

// export default AddMovie;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Add these lines
import { firestore, storage } from '../../config/firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseconfig';

const AddMovie = () => {
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '' });
  const [image, setImage] = useState(null); // Added state for image file

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

  const handleAddMovie = async () => {
    try {
      debugger;
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `moviesimg/${image.name}`);
      await uploadBytes(storageRef, image);

      // Get download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Add movie data to Firestore, including the image URL
      const moviesCollection = collection(firestore, 'movies');
      await addDoc(moviesCollection, { ...newMovie, imageUrl });

      alert('Movie is added');
      navigate('/home');
    } catch (error) {
      alert('Error in saving movie');
      console.error('Error adding movie:', error.message);
    }
  };

  const handleImageChange = (e) => {
    // Update image state when a new image is selected
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

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
        <h2>Add New Movie</h2>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Director"
          value={newMovie.director}
          onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
        />
        <input
          type="text"
          placeholder="Year"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleAddMovie}>Add Movie</button>
        <Link to="/home">Back to Movies</Link>
      </div>
    </>
  );
};

export default AddMovie;
