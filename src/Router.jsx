import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import Layout from './components/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Home />} />
          <Route path="/history" element={<Home />} />
          <Route path="/demo" element={<Home />} />
          <Route path="/register" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
