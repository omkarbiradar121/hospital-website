import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { AIChat } from './components/AIChat.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Departments from './pages/Departments.tsx';
import Doctors from './pages/Doctors.tsx';
import Emergency from './pages/Emergency.tsx';
import Portal from './pages/Portal.tsx';
import Login from './pages/Login.tsx';
import LabServices from './pages/LabServices.tsx';
import Blog from './pages/Blog.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route 
          path="*" 
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/portal" element={<Portal />} />
                  <Route path="/lab-services" element={<LabServices />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
              <Footer />
              <AIChat />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

