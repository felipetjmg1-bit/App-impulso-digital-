import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, RefreshCw, UserCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

export const XaiAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Olá! Sou o Assistente de Inteligência Artificial Explicável da **${COMPANY_INFO.name}** (CNPJ: ${COMPANY_INFO.cnpj}), liderada pelo CEO **${COMPANY_INFO.ceo}**.\n\nComo posso ajudar você hoje com dúvidas sobre XAI (SHAP, LIME), governança de modelos, arquitetura de dados ou agendamento de consultorias?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, content: textToSend }];
    setMessages(newMessages);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/xai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newMessages.slice(0, -1),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Desculpe, ocorreu uma instabilidade temporária. Por favor tente novamente.' },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Erro ao conectar ao servidor da Impulso Digital.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetQuestions = [
    'O que é XAI e como funciona o SHAP e LIME?',
    'Como a Impulso Digital garante conformidade com a ISO/IEC 42001?',
    'Quais são os serviços de consultoria oferecidos por Felipe Aquino?',
    'Como posso integrar a Feature Store com meu Data Lakehouse?',
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Assistente Virtual XAI
              <span className="bg-cyan-500/10 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                Gemini 3.6 Flash
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {COMPANY_INFO.name} • Especialista em I.A. Explicável
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Supervisionado por Felipe Aquino</span>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-2 no-scrollbar">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="whitespace-nowrap bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/40 text-[11px] px-3 py-1 rounded-full transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 font-sans text-xs">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Gerando resposta com raciocínio XAI...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2 focus-within:border-cyan-500/50 transition-colors"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre XAI, governança de I.A., arquitetura de dados..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-xs px-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 p-2 rounded-lg transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
