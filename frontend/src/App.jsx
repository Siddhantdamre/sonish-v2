import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import API from './utils/api';
import { ensureFontLoaded } from './utils/fontUtils';
import { CACHE_KEYS, CACHE_TTLS, fetchJsonWithCache, getCachedValue } from './utils/fetchCache';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

// Lazy load non-critical UI and routes
const Footer = lazy(() => import('./components/layout/Footer'));
const CookieBanner = lazy(() => import('./components/layout/CookieBanner'));
const Assistant = lazy(() => import('./components/ui/Assistant'));
const AdminAssistant = lazy(() => import('./components/ui/AdminAssistant'));
const Collections = lazy(() => import('./pages/Collections'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Returns = lazy(() => import('./pages/Returns'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Terms = lazy(() => import('./pages/Terms'));
const Login = lazy(() => import('./pages/Login'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Search = lazy(() => import('./pages/Search'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Maintenance = lazy(() => import('./pages/Maintenance'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Protected Admin Route wrapper
const PrivateAdminRoute = ({ children }) => {
  const adminInfo = localStorage.getItem('adminInfo');
  if (adminInfo) {
    const user = JSON.parse(adminInfo);
    if (user.isAdmin) {
      return children;
    }
  }
  return <Navigate to="/admin/login" replace />;
};

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const envMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const [apiMaintenance, setApiMaintenance] = useState(() => getCachedValue(CACHE_KEYS.health, CACHE_TTLS.health)?.maintenance ?? false);
  const [showDeferredUi, setShowDeferredUi] = useState(false);

  const applyFont = (fontValue) => {
    ensureFontLoaded(fontValue);
    document.documentElement.style.setProperty('--font-primary', fontValue);
  };

  useEffect(() => {
    const cachedSettings = getCachedValue(CACHE_KEYS.settings, CACHE_TTLS.settings);
    if (cachedSettings?.activeFont) {
      applyFont(cachedSettings.activeFont);
    }

    let isMounted = true;
    const loadGlobalData = async () => {
      if (isAdminRoute) {
        return;
      }

      const [healthResult, settingsResult] = await Promise.allSettled([
        fetchJsonWithCache(`${API}/api/health`, {
          cacheKey: CACHE_KEYS.health,
          ttlMs: CACHE_TTLS.health,
          timeoutMs: 5000,
        }),
        fetchJsonWithCache(`${API}/api/settings`, {
          cacheKey: CACHE_KEYS.settings,
          ttlMs: CACHE_TTLS.settings,
          timeoutMs: 5000,
        }),
      ]);

      if (!isMounted) {
        return;
      }

      if (healthResult.status === 'fulfilled') {
        setApiMaintenance(!!healthResult.value?.maintenance);
      }

      if (settingsResult.status === 'fulfilled' && settingsResult.value?.activeFont) {
        applyFont(settingsResult.value.activeFont);
      }
    };

    loadGlobalData();

    return () => {
      isMounted = false;
    };
  }, [isAdminRoute]);

  useEffect(() => {
    const revealUi = () => setShowDeferredUi(true);

    if (typeof window === 'undefined') {
      revealUi();
      return undefined;
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(revealUi, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(revealUi, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const isMaintenanceMode = envMaintenance || apiMaintenance;
  
  if (isMaintenanceMode && !isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Maintenance />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={
                <PrivateAdminRoute>
                  <AdminDashboard />
                </PrivateAdminRoute>
              } />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdminRoute && showDeferredUi && (
        <Suspense fallback={null}>
          <Footer />
          <CookieBanner />
          <Assistant />
        </Suspense>
      )}
      
      {isAdminRoute && showDeferredUi && (
        <Suspense fallback={null}>
          <AdminAssistant />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
