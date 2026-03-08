import React, { useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import CalendarPage from './pages/CalendarPage';
import Announcements from './pages/Announcements';
import Chat from './pages/Chat';
import Carpool from './pages/Carpool';
import Training from './pages/Training';
import Profile from './pages/Profile';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import EventManager from './pages/EventManager';
import VolunteerManager from './pages/VolunteerManager';
import Reports from './pages/Reports';
import AITools from './pages/AITools';
import { AppShell } from './components/AppShell';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const shell = useMemo(() => <AppShell role={user?.role || 'volunteer'}>{children}</AppShell>, [children, user?.role]);
  return <>{shell}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public marketing */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* login/register disabled; keep landing */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Volunteer app */}
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/opportunities"
        element={
          <Protected>
            <Opportunities />
          </Protected>
        }
      />
      <Route
        path="/calendar"
        element={
          <Protected>
            <CalendarPage />
          </Protected>
        }
      />
      <Route
        path="/announcements"
        element={
          <Protected>
            <Announcements />
          </Protected>
        }
      />
      <Route
        path="/chat"
        element={
          <Protected>
            <Chat />
          </Protected>
        }
      />
      <Route
        path="/carpools"
        element={
          <Protected>
            <Carpool />
          </Protected>
        }
      />
      <Route
        path="/training"
        element={
          <Protected>
            <Training />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />

      {/* Coordinator */}
      <Route
        path="/coord/dashboard"
        element={
          <Protected>
            <CoordinatorDashboard />
          </Protected>
        }
      />
      <Route
        path="/coord/events"
        element={
          <Protected>
            <EventManager />
          </Protected>
        }
      />
      <Route
        path="/coord/volunteers"
        element={
          <Protected>
            <VolunteerManager />
          </Protected>
        }
      />
      <Route
        path="/reports"
        element={
          <Protected>
            <Reports />
          </Protected>
        }
      />

      {/* Admin / AI */}
      <Route
        path="/admin/ai"
        element={
          <Protected>
            <AITools />
          </Protected>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <Protected>
            <Reports />
          </Protected>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
