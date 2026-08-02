import { XaiModel, ServiceStatus, SolutionItem, AuditLogItem, ServiceMetric } from '../types';

export const INITIAL_MODELS: XaiModel[] = [
  {
    id: 'mod-credit-risk-xai',
    name: 'Impulso Credit XAI v4.2',
    version: '4.2.1',
    category: 'Risk Analytics',
    accuracy: 98.4,
    fairnessScore: 99.2,
    driftScore: 0.012,
    latencyMs: 14,
    status: 'active',
    lastAuditDate: '2026-07-28',
    description: 'Classificação de risco de crédito corporativo com árvore de decisões explicáveis e atribuição SHAP em tempo real.'
  },
  {
    id: 'mod-fraud-neural-xai',
    name: 'Neural Fraud Guard 3.0',
    version: '3.0.0',
    category: 'Fraud Detection',
    accuracy: 99.7,
    fairnessScore: 98.8,
    driftScore: 0.008,
    latencyMs: 8,
    status: 'active',
    lastAuditDate: '2026-07-30',
    description: 'Detecção instantânea de anomalias em transações PIX/Cartão com explicação imediata do motivo do bloqueio.'
  },
  {
    id: 'mod-health-diagnosis-xai',
    name: 'BioData Diagnostic XAI',
    version: '2.1.0',
    category: 'Medical AI',
    accuracy: 97.1,
    fairnessScore: 99.5,
    driftScore: 0.019,
    latencyMs: 32,
    status: 'evaluating',
    lastAuditDate: '2026-07-25',
    description: 'Suporte à decisão clínica identificando biomarcadores chave com heatmap de saliência e grau de certeza.'
  },
  {
    id: 'mod-llm-gov-xai',
    name: 'Impulso LLM Governance Shield',
    version: '1.5.0',
    category: 'LLM Governance',
    accuracy: 99.1,
    fairnessScore: 99.9,
    driftScore: 0.005,
    latencyMs: 18,
    status: 'active',
    lastAuditDate: '2026-08-01',
    description: 'Filtro e auditoria de alucinações e vazamento de dados em LLMs para ecossistemas enterprise.'
  }
];

export const SERVICE_STATUSES: ServiceStatus[] = [
  {
    id: 'srv-xai-core',
    name: 'Impulso XAI Inference Engine',
    status: 'operational',
    uptimePercentage: 99.99,
    avgLatencyMs: 12.4,
    region: 'sa-east-1 (São Paulo)',
    lastUpdated: 'Agora'
  },
  {
    id: 'srv-feature-store',
    name: 'Realtime Data Feature Store',
    status: 'operational',
    uptimePercentage: 99.98,
    avgLatencyMs: 4.8,
    region: 'sa-east-1 (São Paulo)',
    lastUpdated: 'Agora'
  },
  {
    id: 'srv-audit-ledger',
    name: 'Algorithmic Audit Ledger',
    status: 'operational',
    uptimePercentage: 100.0,
    avgLatencyMs: 18.2,
    region: 'us-east-1 (Virginia Backup)',
    lastUpdated: 'Agora'
  },
  {
    id: 'srv-bias-monitor',
    name: 'Continuous Bias & Drift Monitor',
    status: 'operational',
    uptimePercentage: 99.95,
    avgLatencyMs: 22.0,
    region: 'sa-east-1 (São Paulo)',
    lastUpdated: 'Agora'
  }
];

export const REALTIME_METRICS: ServiceMetric[] = [
  { timestamp: '16:00', throughput: 14200, latency: 12.1, accuracy: 98.4, drift: 0.011 },
  { timestamp: '17:00', throughput: 18900, latency: 11.8, accuracy: 98.5, drift: 0.012 },
  { timestamp: '18:00', throughput: 24500, latency: 13.2, accuracy: 98.3, drift: 0.010 },
  { timestamp: '19:00', throughput: 21100, latency: 12.0, accuracy: 98.6, drift: 0.012 },
  { timestamp: '20:00', throughput: 28400, latency: 14.1, accuracy: 98.4, drift: 0.013 },
  { timestamp: '21:00', throughput: 31200, latency: 12.5, accuracy: 98.7, drift: 0.011 }
];

export const SOLUTIONS_PORTFOLIO: SolutionItem[] = [
  {
    id: 'sol-xai-suite',
    title: 'Plataforma XAI Enterprise',
    category: 'Explicabilidade & Transparência',
    badge: 'Flagship Core',
    shortDesc: 'Caixa preta zero. Explicabilidade matemática (SHAP/LIME) em milissegundos para qualquer modelo de ML.',
    fullDesc: 'A Plataforma XAI Enterprise da Impulso Digital transforma modelos preditivos opacos em sistemas 100% auditáveis e inteligíveis para reguladores, executivos e clientes finais.',
    benefits: [
      'Garantia de conformidade com normativas do BACEN, SUSEP e ISO/IEC 42001',
      'Dashboards visuais com gráficos de atribuição de atributos em tempo real',
      'Identificação proativa de viés e discriminação algorítmica',
      'API REST e gRPC com baixa latência para integração em esteiras de produção'
    ],
    techStack: ['Python SHAP/LIME', 'Rust Acceleration Core', 'React / Recharts', 'FastAPI', 'Redis'],
    icon: 'BrainCircuit'
  },
  {
    id: 'sol-data-lakehouse',
    title: 'Arquitetura de Data Lakehouse Neural',
    category: 'Engenharia & Arquitetura de Dados',
    badge: 'Alta Performance',
    shortDesc: 'Pipelines resilientes, streaming de eventos e Feature Store otimizada sob orientação de Felipe Aquino.',
    fullDesc: 'Construção e otimização de arquiteturas de dados modernas com padrão Medallion (Bronze, Silver, Gold), garantindo qualidade de dados, linhagem ponta a ponta e baixíssimo custo operacional.',
    benefits: [
      'Redução de até 60% em custos de infraestrutura em nuvem (AWS/GCP/Azure)',
      'Feature Store distribuída para inferência em menos de 10ms',
      'Linhagem de dados (Data Lineage) automatizada e governada',
      'Ingestão contínua com Apache Iceberg, Delta Lake e Apache Kafka'
    ],
    techStack: ['Apache Iceberg', 'Delta Lake', 'Spark', 'Kafka', 'dbt', 'Snowflake'],
    icon: 'DatabaseZap'
  },
  {
    id: 'sol-bias-governance',
    title: 'Governança & Auditoria Algorítmica',
    category: 'Conformidade & Ética em I.A.',
    badge: 'Auditoria ISO 42001',
    shortDesc: 'Monitoramento contínuo de Data Drift, Concept Drift e cálculo de métricas de equidade demográfica.',
    fullDesc: 'Garantimos que sua I.A. continue precisa e justa ao longo do tempo. Nossa suíte monitora desvios de distribuição de dados e emite alertas antes que falhas aconteçam.',
    benefits: [
      'Alertas automáticos em caso de degradação da acurácia ou aumento de viés',
      'Relatórios formais em PDF/JSON prontos para envio a auditores e órgãos reguladores',
      'Métricas de Disparate Impact, Equal Opportunity e Statistical Parity',
      'Logs imutáveis protegidos por criptografia de dados'
    ],
    techStack: ['Evidently AI', 'Prometheus', 'OpenTelemetry', 'PostgreSQL', 'Grafana'],
    icon: 'ShieldCheck'
  },
  {
    id: 'sol-felipe-consulting',
    title: 'Consultoria Estratégica em XAI & Dados com Felipe Aquino',
    category: 'Consultoria Executiva',
    badge: 'Direto com o CEO',
    shortDesc: 'Mentoria, revisão de arquitetura e design de soluções customizadas lideradas pelo CEO Felipe Aquino.',
    fullDesc: 'Atendimento direto com o CEO Felipe Aquino, especialista em XAI e Arquiteturas Avançadas de Dados. Mapeamos gargalos, definimos o roadmap tecnológico da sua empresa e capacitamos sua equipe.',
    benefits: [
      'Diagnóstico arquitetural completo da sua infraestrutura de dados e I.A.',
      'Desenho de soluções sob medida com ROI mensurável',
      'Workshop executivo para diretores, C-Level e conselho sobre Governança de I.A.',
      'Acompanhamento hands-on do desenvolvimento de projetos críticos'
    ],
    techStack: ['Strategy Frameworks', 'Architecture Blueprints', 'XAI Audit Methodology'],
    icon: 'UserCheck'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-8912',
    timestamp: '2026-08-01 21:42:10',
    actor: 'Sistema Automático XAI Shield',
    action: 'Verificação de Viés Algorítmico - Impulso Credit v4.2',
    modelTarget: 'mod-credit-risk-xai',
    resultStatus: 'success',
    securityLevel: 'low',
    hash: '0x8f1e9a...c43d'
  },
  {
    id: 'log-8911',
    timestamp: '2026-08-01 21:15:02',
    actor: 'Felipe Aquino (CEO)',
    action: 'Aprovação de Re-treinamento de Modelo com Novos Dados',
    modelTarget: 'mod-fraud-neural-xai',
    resultStatus: 'success',
    securityLevel: 'medium',
    hash: '0x7e2b1c...a98f'
  },
  {
    id: 'log-8910',
    timestamp: '2026-08-01 20:30:45',
    actor: 'Auditor Externo (Cliente Enterprise)',
    action: 'Download de Relatório de Transparência SHAP / ISO 42001',
    modelTarget: 'mod-credit-risk-xai',
    resultStatus: 'success',
    securityLevel: 'low',
    hash: '0x1c3d5e...b789'
  },
  {
    id: 'log-8909',
    timestamp: '2026-08-01 19:12:11',
    actor: 'Shield Firewall (Segurança)',
    action: 'Tentativa de Injeção de Prompt em LLM Detectada e Bloqueada',
    modelTarget: 'mod-llm-gov-xai',
    resultStatus: 'denied',
    securityLevel: 'high',
    hash: '0x9d8c7b...f123'
  }
];
