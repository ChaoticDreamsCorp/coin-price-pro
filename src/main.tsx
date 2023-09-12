import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeContainer from './containers/Home';
import Navigation from './components/Shared/Navigation';
import Footer from './components/Shared/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navigation />
    <main className="inner cover">
      <HomeContainer />
    </main>
    <Footer />
  </React.StrictMode>
)
