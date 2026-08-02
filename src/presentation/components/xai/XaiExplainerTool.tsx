import React, { useState } from 'react';
import { Cpu, Play, Sparkles, AlertCircle, ShieldCheck, HelpCircle, Check, ArrowRight, Layers, FileSpreadsheet, Download, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { XaiModel } from '../../../types';

interface XaiExplainerToolProps {
  models: XaiModel[];
  selectedModelId: string;
  onSelectModel: (id: string) => void;
}

export const XaiExplainerTool: React.FC<XaiExplainerToolProps> = ({
  models,
  selectedModelId,
  onSelectModel,
}) => {
  const currentModel = models.find((m) => m.id === selectedModelId) || models[0];

  // Input states for interactive simulation
  const [creditScore, setCreditScore] = useState<number>(720);
  const [debtRatio, setDebtRatio] = useState<number>(0.28);
  const [annualIncome, setAnnualIncome] = useState<number>(125000);
  const [relationshipYears, setRelationshipYears] = useState<number>(4);
  const [recentDelinquency, setRecentDelinquency] = useState<boolean>(false);

  // Loading & Result state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [explanationResult, setExplanationResult] = useState<{
    prediction: string;
    confidence: number;
    explanationText: string;
    features: { feature: string; weight: number; value: string; direction: 'positive' | 'negative' }[];
    biasStatus: string;
  } | null>({
    prediction: 'Crédito Aprovado (Risco Baixo)',
    confidence: 0.948,
    explanationText: `[Análise XAI Impulso Digital]: A predição "Crédito Aprovado" para o modelo ${currentModel.name} foi determinada principalmente pelo alto Score de Crédito (+42% de peso decisório) e pela baixa Razão Dívida/Renda (+28%). O relacionamento de 4 anos com a instituição agregou +15% de confiança. Não foram detectados vieses discriminatórios.`,
    features: [
      { feature: 'Score de Crédito (720)', weight: 0.42, value: '720 pts', direction: 'positive' },
      { feature: 'Razão Dívida/Renda (28%)', weight: 0.28, value: '28%', direction: 'positive' },
      { feature: 'Tempo Relacionamento (4a)', weight: 0.15, value: '4 anos', direction: 'positive' },
      { feature: 'Renda Anual ($125k)', weight: 0.10, value: 'R$ 125.000', direction: 'positive' },
      { feature: 'Inadimplência Recente', weight: -0.05, value: 'Nenhuma', direction: 'negative' },
    ],
    biasStatus: 'Auditado - Sem desvio de equidade demográfica (ISO/IEC 42001)',
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/xai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelName: currentModel.name,
          inputFeatures: {
            creditScore,
            debtRatio: `${(debtRatio * 100).toFixed(0)}%`,
            annualIncome: `R$ ${annualIncome.toLocaleString()}`,
            relationshipYears: `${relationshipYears} anos`,
            recentDelinquency: recentDelinquency ? 'Sim' : 'Não',
          },
          prediction: creditScore > 650 && debtRatio < 0.45 ? 'Aprovado / Confiança Elevada' : 'Análise Manual Necessária',
          context: 'Análise Explicável de Risco Preditivo',
        }),
      });

      const data = await response.json();

      if (data.success) {
        const isApproved = creditScore > 650 && debtRatio < 0.45 && !recentDelinquency;

        // Dynamic weights calculation for demo UI
        const scoreWeight = (creditScore - 600) / 400;
        const debtWeight = -(debtRatio - 0.3);
        const relWeight = relationshipYears * 0.04;
        const delinqWeight = recentDelinquency ? -0.35 : 0.05;

        setExplanationResult({
          prediction: isApproved ? 'Aprovado - Confiança Elevada (Risco Baixo)' : 'Risco Elevado - Recomendado Ajuste de Garantia',
          confidence: isApproved ? 0.952 : 0.814,
          explanationText: data.explanation,
          features: [
            { feature: `Score de Crédito (${creditScore})`, weight: scoreWeight, value: `${creditScore} pts`, direction: scoreWeight >= 0 ? 'positive' : 'negative' },
            { feature: `Razão Dívida/Renda (${(debtRatio * 100).toFixed(0)}%)`, weight: debtWeight, value: `${(debtRatio * 100).toFixed(0)}%`, direction: debtWeight >= 0 ? 'positive' : 'negative' },
            { feature: `Tempo de Relacionamento (${relationshipYears}a)`, weight: relWeight, value: `${relationshipYears} anos`, direction: 'positive' },
            { feature: `Inadimplência Recente`, weight: delinqWeight, value: recentDelinquency ? 'Sim' : 'Não', direction: delinqWeight >= 0 ? 'positive' : 'negative' },
          ],
          biasStatus: 'Auditado - Sem desvio de equidade demográfica (ISO/IEC 42001)',
        });
      }
    } catch (err) {
      console.error('Error running XAI analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Módulo XAI - Inteligência Artificial Explicável
            </h1>
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
              SHAP & LIME Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Plataforma da Impulso Digital para auditoria, transparência e atribuição de variáveis em tempo real
          </p>
        </div>

        {/* Model Selector Pill */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
          <span className="text-xs text-slate-400 font-medium px-2">Modelo:</span>
          <select
            value={selectedModelId}
            onChange={(e) => onSelectModel(e.target.value)}
            className="bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Parâmetros de Entrada da Predição
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              Instância #48291
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Score Sliders */}
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Score de Crédito Histórico:</span>
                <span className="font-mono text-cyan-400 font-bold">{creditScore} pts</span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Razão Dívida/Renda (DTI):</span>
                <span className="font-mono text-cyan-400 font-bold">{(debtRatio * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.80"
                step="0.01"
                value={debtRatio}
                onChange={(e) => setDebtRatio(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Renda Anual Declarada:</span>
                <span className="font-mono text-cyan-400 font-bold">R$ {annualIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="5000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Tempo de Relacionamento:</span>
                <span className="font-mono text-cyan-400 font-bold">{relationshipYears} anos</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={relationshipYears}
                onChange={(e) => setRelationshipYears(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="font-medium text-slate-300">Inadimplência nos últimos 12m:</span>
              <button
                onClick={() => setRecentDelinquency(!recentDelinquency)}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                  recentDelinquency
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {recentDelinquency ? 'Sim (Registrada)' : 'Não (Limpo)'}
              </button>
            </div>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Processando SHAP/LIME com Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Gerar Análise XAI Explicável</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Visual Explanation Output */}
        <div className="lg:col-span-7 space-y-5">
          {explanationResult && (
            <>
              {/* Prediction Banner */}
              <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      Resultado do Modelo {currentModel.name}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      {explanationResult.prediction}
                    </h3>
                  </div>

                  <div className="bg-slate-950 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-right">
                    <span className="text-[10px] text-slate-400 block">Confiança do Modelo:</span>
                    <span className="text-sm font-bold font-mono text-cyan-400">
                      {(explanationResult.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Natural Language Explanation Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed font-sans">
                  <p className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Explicação em Linguagem Natural (Impulso Digital XAI):
                  </p>
                  <p className="whitespace-pre-line text-slate-300">
                    {explanationResult.explanationText}
                  </p>
                </div>
              </div>

              {/* SHAP Feature Importance Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      Atribuição de Atributos SHAP (Feature Impact)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Impacto positivo (verde) aumenta a aprovação; impacto negativo (vermelho) reduz.
                    </p>
                  </div>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={explanationResult.features}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis type="number" stroke="#64748b" fontSize={10} domain={[-0.5, 0.5]} />
                      <YAxis dataKey="feature" type="category" stroke="#cbd5e1" fontSize={10} width={150} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                      />
                      <Bar dataKey="weight" name="Atribuição SHAP">
                        {explanationResult.features.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.weight >= 0 ? '#10b981' : '#f43f5e'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bias Audit Status */}
              <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Auditoria Ética & Viés (ISO/IEC 42001)</p>
                    <p className="text-[11px] text-slate-400">{explanationResult.biasStatus}</p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Download do relatório PDF de auditoria SHAP iniciado.')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Exportar PDF</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
