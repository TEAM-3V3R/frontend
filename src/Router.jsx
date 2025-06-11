import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './page/home';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Home />} />
        <Route path="/history" element={<Home />} />
        <Route path="/demo" element={<Home />} />
        <Route path="/register" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
