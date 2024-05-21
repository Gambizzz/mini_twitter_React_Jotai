import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import PostList from './components/Posts/PostList';
import PrivateRoute from './components/Auth/PrivateRoute';
import UserProfile from './components/Profile/UserProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<PrivateRoute component={Profile} />} />
      <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />} />
      <Route path="/user/:userId" element={<PrivateRoute component={UserProfile} />} />
      <Route path="/posts" element={<PrivateRoute component={PostList} />} />
    </Routes>
  );
};

export default App;
