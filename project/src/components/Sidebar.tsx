import React from 'react';
import { Users, Shield, Layout, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Layout },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-indigo-700 to-indigo-900">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-white">RBAC Admin</h1>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-800'
                } group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out`}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}