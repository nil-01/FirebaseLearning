
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { firestore } from '../../config/firebaseconfig';


// const Movies = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const moviesCollection = collection(firestore, 'movies');
//       const moviesSnapshot = await getDocs(moviesCollection);
//       const movieList = moviesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMovies(movieList);
//     };

//     fetchMovies();
//   }, []);

//   const handleDeleteMovie = async (id) => {
//     try {
//       const movieDocRef = doc(firestore, 'movies', id);
//       await deleteDoc(movieDocRef);
//       const updatedMovies = movies.filter((movie) => movie.id !== id);
//       setMovies(updatedMovies);
//     } catch (error) {
//       console.error('Error deleting movie:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Movies</h2>
//       <Link to="/addmovie" className="btn btn-primary mb-3">
//         Add New Movie
//       </Link>

//       <table className="table table-dark ">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Director</th>
//             <th>Year</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((movie) => (
//             <tr key={movie.id}>
//               <td>{movie.title}</td>
//               <td>{movie.director}</td>
//               <td>{movie.year}</td>
//               <td>
//                 <div className='d-flex'>

//                 <Link to={`/updatemovie/${movie.id}`} className="btn btn-warning me-2">
//                   Update
//                 </Link>
//                 <Link to={`/previewmovie/${movie.id}`} className="btn btn-info me-2">
//                   Preview
//                 </Link>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteMovie(movie.id)}
//                 >
//                   Delete
//                 </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Movies;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { firestore } from '../../config/firebaseconfig';

// const Movies = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const moviesCollection = collection(firestore, 'movies');
//       const moviesSnapshot = await getDocs(moviesCollection);
//       const movieList = moviesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log(movieList);
//       setMovies(movieList);
//     };

//     fetchMovies();
//   }, []);

//   const handleDeleteMovie = async (id) => {
//     try {
//       const movieDocRef = doc(firestore, 'movies', id);
//       await deleteDoc(movieDocRef);
//       const updatedMovies = movies.filter((movie) => movie.id !== id);
//       setMovies(updatedMovies);
//     } catch (error) {
//       console.error('Error deleting movie:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Movies</h2>
//       <Link to="/addmovie" className="btn btn-primary mb-3">
//         Add New Movie
//       </Link>

//       <table className="table table-dark">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Director</th>
//             <th>Year</th>
//             <th>Image</th> {/* New column for Image */}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map((movie) => (
//             <tr key={movie.id}>
//               <td>{movie.title}</td>
//               <td>{movie.director}</td>
//               <td>{movie.year}</td>
//               <td>
//                 {movie.imageURL && (
//                   <img src={movie.imageURL} alt={movie.title} style={{ width: '100px', height: '100px' }} />
//                 )}
//               </td>
//               <td>
//                 <div className='d-flex'>
//                   <Link to={`/updatemovie/${movie.id}`} className="btn btn-warning me-2">
//                     Update
//                   </Link>
//                   <Link to={`/previewmovie/${movie.id}`} className="btn btn-info me-2">
//                     Preview
//                   </Link>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDeleteMovie(movie.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Movies;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseconfig';

const Movies = () => {
  const [movies, setMovies] = useState([]);

   useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(firestore, 'movies');
      const moviesSnapshot = await getDocs(moviesCollection);
      const movieList = moviesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(movieList);
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    try {
      const movieDocRef = doc(firestore, 'movies', id);
      await deleteDoc(movieDocRef);
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
    } catch (error) {
      console.error('Error deleting movie:', error.message);
    }
  };

  return (
    <div className='mt-4 mb-2'>
      <Link to="/addmovie" className=" mt-5 mb-2 btn btn-primary mb-3">
        Add New Movie
      </Link>

      <table className="table table-dark text-center table-responsive">
        <thead className='text-center'>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Movie Image</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                <img
                  src={movie.imageUrl || 'https://via.placeholder.com/100'}
                  alt={movie.title}
                  style={{ width: '100px', height: '100px' }}
                />
              </td>
          
              <td>
                <div>
                  <Link to={`/updatemovie/${movie.id}`} className="btn btn-warning me-2">
                    Update
                  </Link>
                  <Link to={`/previewmovie/${movie.id}`} className="btn btn-info me-2">
                    Preview
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    Delete
                  </button>
              
                </div>
              </td>
          
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
