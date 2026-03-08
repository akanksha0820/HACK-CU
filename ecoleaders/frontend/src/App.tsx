import React, { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [role] = useState<'volunteer' | 'coordinator' | 'admin'>('volunteer');
  const shell = useMemo(
    () => (page: React.ReactNode) => <AppShell role={role}>{page}</AppShell>,
    [role],
  );

  return (
    <Routes>
      {/* Public marketing */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={shell(<Home />)} />

      {/* Volunteer app */}
      <Route path="/dashboard" element={shell(<Dashboard />)} />
      <Route path="/opportunities" element={shell(<Opportunities />)} />
      <Route path="/calendar" element={shell(<CalendarPage />)} />
      <Route path="/announcements" element={shell(<Announcements />)} />
      <Route path="/chat" element={shell(<Chat />)} />
      <Route path="/carpools" element={shell(<Carpool />)} />
      <Route path="/training" element={shell(<Training />)} />
      <Route path="/profile" element={shell(<Profile />)} />

      {/* Coordinator */}
      <Route path="/coord/dashboard" element={shell(<CoordinatorDashboard />)} />
      <Route path="/coord/events" element={shell(<EventManager />)} />
      <Route path="/coord/volunteers" element={shell(<VolunteerManager />)} />
      <Route path="/reports" element={shell(<Reports />)} />

      {/* Admin / AI */}
      <Route path="/admin/ai" element={shell(<AITools />)} />
      <Route path="/admin/settings" element={shell(<Reports />)} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
