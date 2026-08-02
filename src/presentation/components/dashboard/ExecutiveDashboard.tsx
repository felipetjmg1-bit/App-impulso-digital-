import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { Cpu, Activity, Zap, ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight, Play, RefreshCw, BarChart2 } from 'lucide-react';
import { XaiModel, ServiceStatus, ServiceMetric, AuditLogItem } from '../../../types';
import { COMPANY_INFO } from '../../../domain/entities/CompanyInfo';

interface ExecutiveDashboardProps {
  models: XaiModel[];
  services: ServiceStatus[];
  metrics: ServiceMetric[];
  auditLogs: AuditLogItem[];
  onSelectModelForXai: (modelId: string) => void;
  onRefreshMetrics: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  models,
  services,
  metrics,
  auditLogs,
  onSelectModelForXai,
  onRefreshMetrics,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Status Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/20 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Painel Executivo de I.A. & Operações
            </h1>
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistemas Nominais
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Plataforma de Monitoramento da {COMPANY_INFO.name} • Liderança do CEO {COMPANY_INFO.ceo}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshMetrics}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Atualizar Telemetria</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: XAI Accuracy */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-4 shadow-sm hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Acurácia Média XAI</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-100 font-mono">98.6%</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              +0.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Conformidade com ISO 42001
          </p>
        </div>

        {/* Card 2: Latency */}
        <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-4 shadow-sm hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Latência de Inferência</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-100 font-mono">12.1 ms</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              Ultra Baixa
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Engine Rust / C++ Acelerado
          </p>
        </div>

        {/* Card 3: Data Throughput */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-4 shadow-sm hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Throughput Preditivo</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-100 font-mono">31.2k /s</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              +14% pico
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Inspecionados via Feature Store
          </p>
        </div>

        {/* Card 4: Bias Drift */}
        <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 shadow-sm hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Índice de Bias Drift</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400 font-mono">0.011</span>
            <span className="text-xs text-emerald-400 font-medium">
              Aprovado
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sem viés demográfico detectado
          </p>
        </div>
      </div>

      {/* Main Realtime Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Throughput & Latency over time */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Vazão de Requisições & Latência (Tempo Real)
              </h3>
              <p className="text-xs text-slate-400">
                Volume de predições explicadas por hora na infraestrutura da Impulso Digital
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-500" />
                Throughput (req/s)
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
                Latência (ms)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="throughput" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorThroughput)" name="Throughput" />
                <Area type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" name="Latência (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Health Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Status das Micro-serviços XAI
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Saúde da infraestrutura operacional
            </p>

            <div className="space-y-3">
              {services.map((srv) => (
                <div key={srv.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{srv.name}</p>
                    <p className="text-[10px] text-slate-500">{srv.region} • Latência: {srv.avgLatencyMs}ms</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {srv.uptimePercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Governança automatizada Impulso Digital • SLA Enterprise 99.99%
            </p>
          </div>
        </div>
      </div>

      {/* Active Models & XAI Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Modelos Preditivos XAI Ativos em Produção
            </h3>
            <p className="text-xs text-slate-400">
              Selecione um modelo para simular e visualizar a atribuição de atributos (SHAP / LIME)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {model.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">v{model.version}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {model.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {model.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Acurácia:</span>
                    <p className="font-mono text-emerald-400 font-semibold">{model.accuracy}%</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Latência:</span>
                    <p className="font-mono text-slate-200">{model.latencyMs}ms</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectModelForXai(model.id)}
                className="mt-4 w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>Analisar XAI (SHAP)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Logs Recentes de Auditoria Algorítmica & Segurança
            </h3>
            <p className="text-xs text-slate-400">
              Registros imutáveis de verificações de viés, re-treinamentos e solicitações de explicabilidade
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Data/Hora</th>
                <th className="p-3">Agente / Ator</th>
                <th className="p-3">Ação Realizada</th>
                <th className="p-3">Resultado</th>
                <th className="p-3">Hash Verificador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50">
                  <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-3 font-semibold text-slate-200">{log.actor}</td>
                  <td className="p-3 text-slate-300">{log.action}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      log.resultStatus === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {log.resultStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-cyan-400/80">{log.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
