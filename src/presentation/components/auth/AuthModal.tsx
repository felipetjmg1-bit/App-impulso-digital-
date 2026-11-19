import React, { useState } from 'react';
import { Lock, Shield, Key, UserCheck, Sparkles, Check, X, ShieldAlert, Globe, Github, Building } from 'lucide-react';
import { User, Role } from '../../../types';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

interface AuthModalProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  user,
  onLogin,
  onLogout,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const [email, setEmail] = useState('cliente.enterprise@empresa.com.br');
  const [name, setName] = useState('Dr. Marcelo Oliveira');
  const [company, setCompany] = useState('Banco Alpha S.A.');
  const [authProvider, setAuthProvider] = useState<string | null>(null);

  const handleSimulateOAuth = (provider: string) => {
    setAuthProvider(provider);
    setTimeout(() => {
      onLogin({
        id: `usr-${Date.now()}`,
        name: name || 'Usuário Autenticado',
        email: email || 'usuario@empresa.com.br',
        role: selectedRole,
        company: company || 'Empresa Parceira',
        cnpjsAssociated: [COMPANY_INFO.cnpj, '12.345.678/0001-90'],
      });
      setAuthProvider(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Logged In View - Session Security Inspector */
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">{user.name}</h3>
                <p className="text-xs text-slate-400">{user.email} • {user.company}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px]">
                  <span className="bg-cyan-500/10 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                    Login simulado (sem provedor OAuth ou JWT real)
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    Autenticação simulada
                  </span>
                </div>
              </div>
            </div>

            {/* Token details */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Key className="w-4 h-4" /> Payload de demonstração (não é JWT)
                </span>
                <span className="text-emerald-400 text-[10px]">Valores ilustrativos, sem sessão real</span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px]">Payload Claims (RBAC):</span>
                <pre className="bg-slate-900 p-3 rounded-xl text-cyan-300 overflow-x-auto text-[11px] mt-1 border border-slate-800">
{JSON.stringify(
  {
    iss: "https://auth.impulsodigital.ai",
    sub: user.id,
    aud: "impulsodigital-xai-app",
    role: user.role,
    company: user.company,
    cnpj_demo: COMPANY_INFO.cnpj,
    demo_only: true,
    exp: Math.floor(Date.now() / 1000) + 28800,
  },
  null,
  2
)}
                </pre>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              >
                Encerrar Sessão Segura
              </button>

              <button
                onClick={onClose}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition-all"
              >
                Voltar ao Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono mb-2 border border-cyan-500/30">
                <Lock className="w-3.5 h-3.5" />
                Autenticação Segura Impulso Digital
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100">
                Acesse o Painel XAI & Soluções
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Conexão criptografada com controle de acesso baseado em funções (RBAC)
              </p>
            </div>

            {/* Role Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Selecione seu Perfil de Acesso:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'client', label: 'Cliente Enterprise' },
                  { id: 'executive', label: 'Executivo C-Level' },
                  { id: 'partner', label: 'Parceiro I.A.' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as Role)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedRole === r.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Demo Credentials */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Nome Completo:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Empresa / Organização:</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2.5">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block text-center">
                Ou Autentique com OAuth 2.0 / SSO Enterprise:
              </span>

              <button
                onClick={() => handleSimulateOAuth('Google Workspace')}
                disabled={authProvider !== null}
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Entrar com Google Workspace Corporate</span>
              </button>

              <button
                onClick={() => handleSimulateOAuth('GitHub Enterprise')}
                disabled={authProvider !== null}
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 text-indigo-400" />
                <span>Entrar com GitHub Enterprise</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-500">
                Protegido por criptografia TLS 1.3 • Impulso Digital Soluções em I.A. (CNPJ: {COMPANY_INFO.cnpj})
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
