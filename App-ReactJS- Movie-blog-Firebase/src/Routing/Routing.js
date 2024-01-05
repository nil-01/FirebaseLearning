
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Auth/Login';
import Signup from '../Pages/Auth/SignUp';
import NotFound from '../Pages/Page404';
import Home from '../Pages/Home';
import AddMovie from '../Pages/Movies/AddMovie';
import UpdateMovie from '../Pages/Movies/UpdateMovie';
import Movies from '../Pages/Movies/Movies';
import PreviewMovie from '../Pages/Movies/Previewmovie';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/home' element={<Home/>}/> 
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/updatemovie/:id" element={<UpdateMovie />} />
        <Route path="/previewmovie/:id" element={<PreviewMovie />} />
      </Routes>
    </Router>
  );
};

export default Routing;
