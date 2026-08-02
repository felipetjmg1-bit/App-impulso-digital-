import React, { useState } from 'react';
import { Header } from './presentation/components/common/Header';
import { SplashScreen } from './presentation/components/splash/SplashScreen';
import { ExecutiveDashboard } from './presentation/components/dashboard/ExecutiveDashboard';
import { XaiExplainerTool } from './presentation/components/xai/XaiExplainerTool';
import { XaiAiAssistant } from './presentation/components/xai/XaiAiAssistant';
import { SolutionsPortfolio } from './presentation/components/portfolio/SolutionsPortfolio';
import { AuthModal } from './presentation/components/auth/AuthModal';
import { CleanArchitectureViewer } from './presentation/components/architecture/CleanArchitectureViewer';
import { ContactAndBookingView } from './presentation/components/contact/ContactAndBookingView';

import { INITIAL_MODELS, SERVICE_STATUSES, REALTIME_METRICS, SOLUTIONS_PORTFOLIO, INITIAL_AUDIT_LOGS } from './data/mockData';
import { COMPANY_INFO } from './domain/entities/CompanyInfo';
import { User } from './types';
import { Building2, ShieldCheck, Heart, UserCheck, Cpu, Code2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedModelId, setSelectedModelId] = useState<string>(INITIAL_MODELS[0].id);

  // Authenticated user state
  const [user, setUser] = useState<User | null>({
    id: 'usr-exec-001',
    name: 'Felipe Aquino',
    email: 'felipe.aquino@impulsodigital.ai',
    role: 'executive',
    company: 'Impulso Digital Soluções em I.A.',
    cnpjsAssociated: [COMPANY_INFO.cnpj],
  });

  // Metrics refresh simulation
  const [metrics, setMetrics] = useState(REALTIME_METRICS);

  const handleRefreshMetrics = () => {
    const updated = metrics.map((m) => ({
      ...m,
      throughput: m.throughput + Math.floor((Math.random() - 0.5) * 2000),
      latency: Number((m.latency + (Math.random() - 0.5) * 1.5).toFixed(1)),
    }));
    setMetrics(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Fixed Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenSplash={() => setShowSplash(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            models={INITIAL_MODELS}
            services={SERVICE_STATUSES}
            metrics={metrics}
            auditLogs={INITIAL_AUDIT_LOGS}
            onSelectModelForXai={(modelId) => {
              setSelectedModelId(modelId);
              setActiveTab('xai');
            }}
            onRefreshMetrics={handleRefreshMetrics}
          />
        )}

        {activeTab === 'xai' && (
          <div className="space-y-8">
            <XaiExplainerTool
              models={INITIAL_MODELS}
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
            />
            <XaiAiAssistant />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <SolutionsPortfolio solutions={SOLUTIONS_PORTFOLIO} />
        )}

        {activeTab === 'auth' && (
          <div className="max-w-3xl mx-auto">
            <AuthModal
              user={user}
              onLogin={(usr) => setUser(usr)}
              onLogout={() => setUser(null)}
              onClose={() => setActiveTab('dashboard')}
            />
          </div>
        )}

        {activeTab === 'architecture' && <CleanArchitectureViewer />}

        {activeTab === 'contact' && <ContactAndBookingView />}
      </main>

      {/* Splash Modal overlay */}
      {showSplash && (
        <SplashScreen
          onClose={() => setShowSplash(false)}
          onExploreXai={() => setActiveTab('xai')}
          onBookConsultation={() => setActiveTab('portfolio')}
        />
      )}

      {/* Auth Modal overlay */}
      {showAuthModal && (
        <AuthModal
          user={user}
          onLogin={(usr) => {
            setUser(usr);
            setShowAuthModal(false);
          }}
          onLogout={() => {
            setUser(null);
            setShowAuthModal(false);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Corporate Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-cyan-400 font-bold text-xs">
                ID
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-200">
                {COMPANY_INFO.name}
              </p>
              <p className="text-[11px] text-slate-500">
                CNPJ: <span className="text-slate-400 font-mono">{COMPANY_INFO.cnpj}</span> • CEO: <span className="text-cyan-400">{COMPANY_INFO.ceo}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO/IEC 42001 Compliant
            </span>
            <button
              onClick={() => setActiveTab('architecture')}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
            >
              <Code2 className="w-3.5 h-3.5" /> Clean Architecture
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Impulso Digital. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
