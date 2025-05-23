import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Main from "./pages/Main";
import Sub from "./pages/Sub";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="main" element={<Main />} />
          <Route path="chat" element={<Sub />} />
          <Route path="history" element={<Sub />} />
          <Route path="demo" element={<Sub />} />
          <Route path="register" element={<Sub />} />{" "}
          {/* ✅ 반드시 있어야 함 */}
        </Route>

        <Route path="*" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
