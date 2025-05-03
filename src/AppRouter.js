
// AppRouter.js - 라우팅 구성 파일
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentShop from './StudentMarketplace';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentShop />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
