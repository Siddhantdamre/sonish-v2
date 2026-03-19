import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import Assistant from './components/ui/Assistant';
import AdminAssistant from './components/ui/AdminAssistant';
import Home from './pages/Home';

// Inner component to access the router's useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <CookieBanner />
        <Assistant />
        <AdminAssistant />
      </div>
    </Router>
  );
}

export default App;
