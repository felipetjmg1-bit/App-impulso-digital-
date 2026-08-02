import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building2, UserCheck, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

export const ContactAndBookingView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Proposta de Projeto XAI');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Canais de Atendimento & Agendamento
            </h1>
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Suporte Executivo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fale diretamente com a equipe técnica e o CEO {COMPANY_INFO.ceo}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Empresa Cadastrada</span>
            <h3 className="text-lg font-extrabold text-slate-100">{COMPANY_INFO.name}</h3>
            <p className="text-xs text-slate-400 mt-1">
              CNPJ: <span className="text-slate-200 font-mono font-semibold">{COMPANY_INFO.cnpj}</span>
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <UserCheck className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-200">CEO & Liderança de XAI:</p>
                <p className="text-slate-400">{COMPANY_INFO.ceo} ({COMPANY_INFO.ceoTitle})</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <Mail className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-200">E-mail Corporativo:</p>
                <p className="text-cyan-300 font-mono">{COMPANY_INFO.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-200">Localização:</p>
                <p className="text-slate-400">{COMPANY_INFO.contact.address}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950 border border-cyan-500/30">
            <p className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Horário de Atendimento Executivo:
            </p>
            <p className="text-[11px] text-slate-300">
              Segunda a Sexta, das 08h às 19h (Horário de Brasília)
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-extrabold text-slate-100 mb-1">
            Envie uma Mensagem Direta à Diretoria
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Preencha os dados para solicitar orçamento, parceria técnica ou demonstração do ecossistema XAI.
          </p>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-slate-100">Mensagem Enviada com Sucesso!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Agradecemos o contato. A equipe da Impulso Digital responderá em breve ao e-mail informado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Seu Nome / Cargo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Silva (CTO)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">E-mail Corporativo:</label>
                  <input
                    type="email"
                    required
                    placeholder="roberto@suaempresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Assunto:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="Proposta de Projeto XAI">Proposta de Projeto XAI (Explicabilidade)</option>
                  <option value="Arquitetura de Data Lakehouse">Arquitetura de Data Lakehouse & Streaming</option>
                  <option value="Consultoria com Felipe Aquino">Consultoria Estratégica com Felipe Aquino</option>
                  <option value="Auditoria e Governança ISO 42001">Auditoria e Governança Algorítmica ISO 42001</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Mensagem:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Descreva resumidamente suas necessidades técnicas ou desafios de negócio..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Enviar Mensagem para a Impulso Digital</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
