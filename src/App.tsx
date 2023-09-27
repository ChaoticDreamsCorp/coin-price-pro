import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/Home';
import PostDataContainer from './containers/PostData';
import Navigation from './components/Shared/Navigation';
import Footer from './components/Shared/Footer';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<main className="inner cover"><HomeContainer /></main>} />
        <Route path="/example" element={<main className="inner cover"><PostDataContainer /></main>} />        
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
