import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './app/Layout.tsx';
import HomePage from './app/HomePage.tsx';
import AmenityDetailPage from './app/AmenityDetailPage.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:amenitiesId" element={<AmenityDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}



