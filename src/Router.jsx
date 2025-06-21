import { Route, Routes } from 'react-router-dom';
import Home from './page/home';
import Layout from './components/Layout';
import SignUp from './page/signup';
import Demo from './page/demo';
import Chat from './page/chat';
import Inpainting from './page/inpainting';
import History from './page/history';
import HistoryInfo from './page/historyInfo';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:chatId" element={<HistoryInfo />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/inpainting" element={<Inpainting />} />
      </Route>
    </Routes>
  );
}
