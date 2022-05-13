import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import NewAlbum from "./pages/NewAlbum";
import NewTrack from "./pages/NewTrack";
import DeleteTrack from "./pages/DeleteTrack";
import DeleteAlbum from "./pages/DeleteAlbum";
import Navbar from "./components/Navbar"

export default class routes extends Component {
  render() {
    return (
        <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/new" element={<NewAlbum />} />
          <Route path="/album/delete" element={<DeleteAlbum />} />
          <Route path="/track/new" element={<NewTrack />} />
          <Route path="/track/delete" element={<DeleteTrack />} />
        </Routes>
      </Router>
    )
  }
}
