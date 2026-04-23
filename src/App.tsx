import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/Layout';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const CV = lazy(() => import('./pages/CV'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Suspense><Home /></Suspense>} />
            <Route path="cv" element={<Suspense><CV /></Suspense>} />
            <Route path="projects" element={<Suspense><Projects /></Suspense>} />
            <Route path="contact" element={<Suspense><Contact /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
