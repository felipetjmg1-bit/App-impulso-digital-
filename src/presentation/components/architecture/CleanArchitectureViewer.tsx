import React, { useState } from 'react';
import { Folder, FileCode, Layers, Terminal, Copy, Check, Code2, BookOpen, Cpu, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

export const CleanArchitectureViewer: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const treeData = [
    {
      layer: 'Presentation Layer (Camada de Apresentação)',
      color: 'border-cyan-500/40 text-cyan-300',
      description: 'Interface do Usuário (UI/UX Mobile e Web), componentes React, visualizadores de gráficos e gerenciamento de estado visual.',
      files: [
        '/src/presentation/components/common/Header.tsx - Navegação corporativa e badges',
        '/src/presentation/components/splash/SplashScreen.tsx - Tela corporativa CNPJ e CEO',
        '/src/presentation/components/dashboard/ExecutiveDashboard.tsx - Telemetria e Recharts',
        '/src/presentation/components/xai/XaiExplainerTool.tsx - Gráficos SHAP/LIME e Árvore de Decisão',
        '/src/presentation/components/xai/XaiAiAssistant.tsx - Chatbot com Gemini XAI',
        '/src/presentation/components/auth/AuthModal.tsx - Modal OAuth e Inspetor JWT',
        '/src/presentation/components/portfolio/SolutionsPortfolio.tsx - Portfólio & Agendamento',
      ],
    },
    {
      layer: 'Domain Layer (Camada de Domínio / Regras de Negócio)',
      color: 'border-indigo-500/40 text-indigo-300',
      description: 'Entidades centrais da Impulso Digital, interfaces de casos de uso e contratos de explicabilidade alheios a frameworks.',
      files: [
        '/src/domain/entities/CompanyInfo.ts - Dados oficiais (CNPJ: 57.291.550/0001-24, CEO Felipe Aquino)',
        '/src/types/index.ts - Modelos XAI, Feature Importance, Service Status, User e Audit Log',
      ],
    },
    {
      layer: 'Data Layer (Camada de Dados & Integrações)',
      color: 'border-purple-500/40 text-purple-300',
      description: 'Serviços de API, cliente Google GenAI backend (Gemini 3.6 Flash), persistência e mock datasets de alta fidelidade.',
      files: [
        '/server.ts - Servidor Express full-stack com rotas /api/xai/analyze e /api/xai/chat',
        '/src/data/mockData.ts - Modelos de produção, telemetria em tempo real e audit trail',
      ],
    },
  ];

  const codeSnippets = [
    {
      title: '1. Instalação das Dependências no Terminal',
      command: 'npm install react react-dom express @google/genai recharts motion lucide-react clsx tailwind-merge\nnpm install -D tsx esbuild typescript @types/express @types/node vite @tailwindcss/vite',
      description: 'Executa a instalação de todos os pacotes necessários em ambiente gratuito.',
    },
    {
      title: '2. Execução do Servidor em Modo Desenvolvedor',
      command: 'npm run dev',
      description: 'Inicia o servidor Express full-stack integrado com o Vite na porta 3000 com recarga automática.',
    },
    {
      title: '3. Build para Produção (Cloud Run / Docker)',
      command: 'npm run build && npm start',
      description: 'Compila o código frontend estático e empacota o backend Express com esbuild em um único arquivo dist/server.cjs.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Arquitetura Clean & Guia de Implementação
            </h1>
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Clean Architecture
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualização das camadas do projeto e guia passo a passo para execução local do aplicativo oficial
          </p>
        </div>
      </div>

      {/* Layer breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {treeData.map((layer, idx) => (
          <div key={idx} className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between ${layer.color}`}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-100">{layer.layer}</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">{layer.description}</p>

              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Arquivos da Camada:</p>
                {layer.files.map((file, fIdx) => (
                  <div key={fIdx} className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex items-start gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Step by Step Implementation Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Guia Prático de Execução & Deploy
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Instruções técnicas para rodar a aplicação da {COMPANY_INFO.name} em qualquer ambiente
          </p>
        </div>

        <div className="space-y-4">
          {codeSnippets.map((snippet, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200">{snippet.title}</h4>
                <button
                  onClick={() => copyToClipboard(snippet.command, idx)}
                  className="flex items-center gap-1.5 text-[11px] bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 px-2.5 py-1 rounded-lg transition-all"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400">{snippet.description}</p>

              <pre className="bg-slate-900 p-3 rounded-xl text-cyan-300 font-mono text-xs overflow-x-auto border border-slate-800/80">
                <code>{snippet.command}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
