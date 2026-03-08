import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Home, Calendar, Megaphone, MessageSquare, Car, BookOpen, Award, BarChart, Settings, Sparkles } from 'lucide-react';

type Role = 'volunteer' | 'coordinator' | 'admin';

type NavItem = { to: string; label: string; icon: any };

type AppShellProps = {
  children: React.ReactNode;
  role: Role;
};

const navMap: Record<Role, NavItem[]> = {
  volunteer: [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/opportunities', label: 'Opportunities', icon: Sparkles },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/chat', label: 'Chatrooms', icon: MessageSquare },
    { to: '/carpools', label: 'Carpools', icon: Car },
    { to: '/training', label: 'Training Hub', icon: BookOpen },
    { to: '/profile', label: 'Profile / Badges', icon: Award },
  ],
  coordinator: [
    { to: '/coord/dashboard', label: 'Coordinator Dashboard', icon: BarChart },
    { to: '/coord/events', label: 'Event Manager', icon: Calendar },
    { to: '/coord/volunteers', label: 'Volunteer Manager', icon: Award },
    { to: '/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/reports', label: 'Reports / Analytics', icon: BarChart },
    { to: '/chat', label: 'Channels', icon: MessageSquare },
    { to: '/carpools', label: 'Carpools', icon: Car },
    { to: '/training', label: 'Training Manager', icon: BookOpen },
  ],
  admin: [
    { to: '/admin/ai', label: 'AI Tools', icon: Sparkles },
    { to: '/admin/settings', label: 'Integrations', icon: Settings },
    { to: '/reports', label: 'Analytics', icon: BarChart },
  ],
};

export function AppShell({ children, role }: AppShellProps) {
  const nav = navMap[role] || navMap.volunteer;

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />
      <div className="relative z-10 flex">
        <aside className="hidden h-screen w-72 flex-shrink-0 border-r border-[color:var(--border)] bg-[color:var(--panel)]/80 backdrop-blur md:flex">
          <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--green)] font-semibold text-slate-900 shadow-fern">
                EH
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">Eco-Leaders</p>
                <p className="text-lg font-semibold">Volunteer Hub</p>
              </div>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                        isActive
                          ? 'bg-[color:rgba(227,176,74,0.12)] text-gold shadow-ember'
                          : 'text-[color:var(--muted)] hover:bg-[color:var(--panel-2)]',
                      ].join(' ')
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="mt-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-2)] p-4 text-sm">
              <p className="font-semibold">Live signals</p>
              <p className="mt-1 text-[color:var(--muted)]">Announcements and chat will appear instantly here.</p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--panel)]/70 backdrop-blur">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                <Bell size={18} />
                <span>Stay updated</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-full border border-[color:var(--border)] bg-[color:var(--panel-2)] px-3 py-1 text-xs text-[color:var(--muted)] md:block">
                  Role: {role}
                </div>
                <div className="h-9 w-9 rounded-full bg-[color:var(--green)] text-xs font-semibold text-slate-900 flex items-center justify-center">
                  {role.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
