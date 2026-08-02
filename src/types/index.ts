export type Role = 'client' | 'executive' | 'partner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  company: string;
  avatar?: string;
  cnpjsAssociated?: string[];
}

export interface FeatureImportance {
  feature: string;
  weight: number; // -1 to 1 or percentage
  value: string | number;
  direction: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface DecisionNode {
  id: string;
  feature: string;
  threshold: string;
  gain: number;
  directionLeft: string;
  directionRight: string;
  samples: number;
  confidence: number;
}

export interface XaiModel {
  id: string;
  name: string;
  version: string;
  category: 'Risk Analytics' | 'Computer Vision' | 'LLM Governance' | 'Fraud Detection' | 'Medical AI';
  accuracy: number;
  fairnessScore: number;
  driftScore: number;
  latencyMs: number;
  status: 'active' | 'evaluating' | 'retraining' | 'idle';
  lastAuditDate: string;
  description: string;
}

export interface ServiceMetric {
  timestamp: string;
  throughput: number;
  latency: number;
  accuracy: number;
  drift: number;
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptimePercentage: number;
  avgLatencyMs: number;
  region: string;
  lastUpdated: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  techStack: string[];
  icon: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  modelTarget: string;
  resultStatus: 'success' | 'flagged' | 'denied';
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  hash: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}
