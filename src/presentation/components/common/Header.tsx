import React from 'react';
import { Brain, ShieldCheck, UserCheck, Sparkles, Building2, Lock, LayoutDashboard, Cpu, Terminal, PhoneCall, Code2 } from 'lucide-react';
import { User } from '../../../types';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onOpenSplash: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onOpenSplash,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard },
    { id: 'xai', label: 'Módulo XAI Interativo', icon: Cpu },
    { id: 'portfolio', label: 'Portfólio de Soluções', icon: Sparkles },
    { id: 'auth', label: 'Segurança & OAuth', icon: Lock },
    { id: 'architecture', label: 'Clean Architecture & Guia', icon: Code2 },
    { id: 'contact', label: 'Atendimento & Agendamento', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 text-slate-100">
      {/* Top Banner with CNPJ and CEO Tag */}
      <div className="bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border-b border-cyan-500/10 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSplash}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-mono font-semibold"
            title="Ver Apresentação Corporativa"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{COMPANY_INFO.name}</span>
          </button>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 font-mono">
            CNPJ: <span className="text-slate-200">{COMPANY_INFO.cnpj}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full text-cyan-300">
            <UserCheck className="w-3 h-3 text-cyan-400" />
            <span className="font-medium">CEO: {COMPANY_INFO.ceo}</span>
            <span className="hidden md:inline text-cyan-400/70 text-[10px]">(Especialista XAI)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">Inference Engine ON</span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Brain className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
                IMPULSO DIGITAL
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                XAI v4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium">
              Soluções em Inteligência Artificial Explicável
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Auth Button / Profile */}
        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 px-3 py-1.5 rounded-xl text-xs text-slate-200 transition-all hover:bg-slate-800"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-semibold text-cyan-300 leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-400 capitalize">{user.role} • {user.company}</p>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="lg:hidden flex overflow-x-auto gap-1 px-3 py-2 border-t border-slate-800 bg-slate-950/90 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 bg-slate-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
