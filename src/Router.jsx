import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import Layout from './components/Layout';
import SignUp from './page/signup';
import Demo from './page/demo';
import Chat from './page/chat';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/history" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
