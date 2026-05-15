'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Building2, 
  LayoutDashboard, 
  Terminal, 
  ChevronRight,
  Menu,
  X,
  Settings,
  HelpCircle,
  Power
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'COMMAND_CENTER', href: '/', icon: LayoutDashboard },
    { name: 'USER_NODES', href: '/etudiants', icon: Users },
    { name: 'UNIT_CORES', href: '/departements', icon: Building2 },
  ];

  const secondaryItems = [
    { name: 'CONFIG', href: '#', icon: Settings },
    { name: 'SUPPORT', href: '#', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-black border border-white/10 text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-72 bg-[#080808] border-r border-white/5 z-[90] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-8 border-b border-white/5">
            <Link href="/" className="flex items-center space-x-4 group" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                <Terminal size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter uppercase">
                  NOIR_OS
                </span>
                <span className="text-[8px] font-mono tracking-[0.4em] text-white/30">KERNEL_CORE_4.0</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-1">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 mb-6 ml-2">PRIMARY_ACCESS</div>
            {navItems.map((item: any) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center justify-between px-4 py-4 text-[11px] font-mono tracking-widest transition-all duration-300 relative",
                    isActive 
                      ? "text-primary" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center relative z-10">
                    <item.icon size={16} className={cn("mr-4 transition-colors", isActive ? "text-primary" : "text-white/20 group-hover:text-white")} />
                    {item.name}
                  </div>
                  {isActive && (
                    <>
                      <ChevronRight size={12} />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary" />
                    </>
                  )}
                </Link>
              );
            })}

            <div className="pt-12 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 mb-6 ml-2">SYSTEM_UTIL</div>
            {secondaryItems.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-4 py-4 text-[11px] font-mono tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <item.icon size={16} className="mr-4 text-white/20 group-hover:text-white" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* System Terminal Status */}
          <div className="p-8 mt-auto border-t border-white/5 bg-black/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-mono text-white/20 uppercase">Auth_Session</span>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </div>
            <button className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-red-500/20 text-red-500 text-[10px] font-mono tracking-widest hover:bg-red-500 hover:text-black transition-all duration-500 uppercase">
              <Power size={14} />
              <span>Terminate</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

