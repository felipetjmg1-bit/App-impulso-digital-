import React, { useState } from 'react';
import { Sparkles, BrainCircuit, DatabaseZap, ShieldCheck, UserCheck, CheckCircle, Calendar, Clock, Building, Mail, Check, ArrowRight, User } from 'lucide-react';
import { SolutionItem } from '../../../types';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

interface SolutionsPortfolioProps {
  solutions: SolutionItem[];
}

export const SolutionsPortfolio: React.FC<SolutionsPortfolioProps> = ({ solutions }) => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-08-10');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [scopeText, setScopeText] = useState('Gostaria de agendar um diagnóstico de XAI para nossa esteira de crédito.');

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setClientName('');
      setClientCompany('');
      setClientEmail('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Portfólio de Soluções de I.A. & Dados
            </h1>
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Arquitetura Enterprise
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Soluções homologadas desenvolvidas sob supervisão técnica do CEO {COMPANY_INFO.ceo}
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4 text-slate-950" />
          <span>Agendar Reunião com Felipe Aquino</span>
        </button>
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                  {sol.category}
                </span>
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
                  {sol.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {sol.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {sol.fullDesc}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Diferenciais & Benefícios:
                </p>
                {sol.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 font-mono block mb-1.5">Tecnologias Utilizadas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sol.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-mono px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSolution(sol);
                setIsBookingOpen(true);
              }}
              className="mt-6 w-full bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Solicitar Demonstração / Proposta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Consultation Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 text-slate-100 my-8">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-100">
                  Solicitação de Agendamento Confirmada!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  A equipe da Impulso Digital e o CEO Felipe Aquino receberam sua solicitação para{' '}
                  <span className="font-mono text-cyan-300">{bookingDate} às {bookingTime}</span>. Entraremos em contato via e-mail corporativo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-4">
                <div>
                  <span className="bg-cyan-500/10 text-cyan-300 text-[10px] font-mono px-2.5 py-0.5 rounded border border-cyan-500/30">
                    Atendimento Executivo Direto
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-100 mt-2">
                    Agendar Reunião com Felipe Aquino
                  </h2>
                  <p className="text-xs text-slate-400">
                    CEO e Especialista em Inteligência Artificial Explicável & Arquitetura Avançada
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Seu Nome:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dra. Ana Paula Santos"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Empresa / Organização:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Fintech X"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">E-mail Corporativo:</label>
                      <input
                        type="email"
                        required
                        placeholder="nome@empresa.com.br"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Data Desejada:</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Horário:</label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Objetivo / Escopo do Projeto:</label>
                    <textarea
                      rows={3}
                      value={scopeText}
                      onChange={(e) => setScopeText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20"
                >
                  Confirmar Agendamento de Consultoria
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
