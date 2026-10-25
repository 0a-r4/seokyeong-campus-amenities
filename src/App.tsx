import { Routes, Route } from 'react-router-dom';
import Layout from './app/Layout.tsx';
import HomePage from './app/HomePage.tsx';
import AmenityDetailPage from './app/AmenityDetailPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:amenitiesId" element={<AmenityDetailPage />} />
      </Route>
    </Routes>
  );
}


