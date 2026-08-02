import React from 'react';
import { Brain, ShieldCheck, Cpu, Database, Award, UserCheck, ArrowRight, X, Sparkles, Building2, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

interface SplashScreenProps {
  onClose: () => void;
  onExploreXai: () => void;
  onBookConsultation: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onClose,
  onExploreXai,
  onBookConsultation,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 text-slate-100 my-8 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Ir para o Dashboard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Empresa Homologada & Registrada
          </span>
          <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
            CNPJ: {COMPANY_INFO.cnpj}
          </span>
        </div>

        {/* Title & Brand */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                <Brain className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-white bg-clip-text text-transparent">
                {COMPANY_INFO.name}
              </h1>
              <p className="text-sm text-cyan-400 font-mono font-medium">
                Soluções em Inteligência Artificial Explicável (XAI) & Arquitetura Avançada
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-3xl">
            {COMPANY_INFO.description}
          </p>
        </div>

        {/* CEO Profile Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-bold text-xl">
                FA
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <UserCheck className="w-3 h-3 text-slate-950" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">{COMPANY_INFO.ceo}</h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                  CEO & Liderança Técnica
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {COMPANY_INFO.ceoTitle}
              </p>
              <p className="text-xs text-cyan-300/80 mt-1 italic">
                "{COMPANY_INFO.slogan}"
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookConsultation();
            }}
            className="whitespace-nowrap bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Agendar Consultoria Direta</span>
          </button>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">
              Explicabilidade XAI
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modelos preditivos transparentes com mapas SHAP/LIME de atribuição visual e auditoria explicativa de decisões.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">
              Arquitetura de Dados
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Data Lakehouses de alta escala, streaming de eventos em tempo real e Feature Stores de ultra baixa latência.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-4 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">
              Governança & Ética
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitoramento automatizado de viés, prevenção de Data Drift e conformidade completa com ISO/IEC 42001 e LGPD.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onExploreXai();
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <span>Acessar Módulo XAI e Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-5 py-3 rounded-xl text-xs transition-colors"
          >
            Apenas Navegar
          </button>
        </div>
      </div>
    </div>
  );
};
