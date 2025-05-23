import { useLocation } from "react-router-dom";
import Chat from "../components/chat/Chat";
import History from "../components/history/History";
import Demo from "../components/demo/Demo";
import Register from "../components/user/Register";

const Sub = () => {
  const { pathname } = useLocation();

  let content;

  if (pathname === "/chat") content = <Chat />;
  else if (pathname === "/history") content = <History />;
  else if (pathname === "/demo") content = <Demo />;
  else if (pathname === "/register") content = <Register />;
  else content = <div>404 - 존재하지 않는 경로입니다.</div>;

  return <>{content}</>;
};

export default Sub;
