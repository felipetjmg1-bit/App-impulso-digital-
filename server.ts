import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper lazy getter for Google GenAI SDK
  let aiClient: GoogleGenAI | null = null;
  function getGenAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY || "";
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      company: "Impulso Digital Soluções em I.A.",
      cnpj: "57.291.550/0001-24",
      ceo: "Felipe Aquino",
      timestamp: new Date().toISOString(),
    });
  });

  // XAI Explanation API using Gemini
  app.post("/api/xai/analyze", async (req, res) => {
    try {
      const { modelName, inputFeatures, prediction, context } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          success: true,
          explanation: `[Simulação XAI Impulso Digital]: Para a predição "${prediction || 'Positiva'}" no modelo "${modelName || 'Neural Credit Risk'}", as variáveis chave que influenciaram o resultado foram: 1. Score de Crédito Histórico (+42%), 2. Razão Dívida/Renda (-28%), 3. Tempo de Relacionamento (+15%). A política de transparência da Impulso Digital garante auditabilidade de 99.8%.`,
          featureAttributions: [
            { feature: "Score de Crédito", weight: 0.42, direction: "positive" },
            { feature: "Razão Dívida/Renda", weight: -0.28, direction: "negative" },
            { feature: "Tempo de Relacionamento", weight: 0.15, direction: "positive" },
            { feature: "Volume Transacional", weight: 0.09, direction: "positive" },
            { feature: "Inadimplência Recente", weight: -0.06, direction: "negative" },
          ],
          confidenceScore: 0.942,
          biasRiskScore: "Baixo (0.012 - Padrão ISO/IEC 42001)",
        });
      }

      const ai = getGenAI();
      const prompt = `Você é a IA do sistema de Inteligência Artificial Explicável (XAI) da Impulso Digital Soluções em I.A., liderada pelo especialista em XAI e Arquiteturas Avançadas de Dados, Felipe Aquino (CNPJ: 57.291.550/0001-24).
Forneça um relatório resumido de XAI em português claro e técnico para uma tomada de decisão crítica de negócios.

Dados do Modelo:
- Modelo: ${modelName || "Modelo Preditivo Neural"}
- Predição Realizada: ${prediction || "Aprovado / Confiança Elevada"}
- Atributos de Entrada: ${JSON.stringify(inputFeatures || {})}
- Contexto de Negócio: ${context || "Análise de Risco Operacional"}

Instruções de Resposta:
Retorne a explicação nos seguintes pontos:
1. Resumo da Decisão Algorítmica em linguagem natural e transparente.
2. Principais variáveis de influência (SHAP/LIME valores) com impacto % estimado.
3. Avaliação de Viés, Ética e Governança segundo padrões de XAI da Impulso Digital.
4. Recomendação executiva.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "Você é o motor de XAI (Explainable AI) da Impulso Digital Soluções em I.A. Suas respostas devem transmitir precisão, autoridade técnica e clareza absoluta.",
        },
      });

      res.json({
        success: true,
        explanation: response.text || "Análise XAI gerada com sucesso.",
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("XAI Analysis Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Falha no processamento da análise XAI.",
      });
    }
  });

  // Interactive AI Executive / XAI Assistant
  app.post("/api/xai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          success: true,
          reply: `Olá! Sou o Assistente de Inteligência Artificial Explicável da **Impulso Digital Soluções em I.A.**, empresa liderada pelo CEO **Felipe Aquino**. Como posso ajudar na governança de dados, auditoria de algorítmos ou arquiteturas XAI da sua empresa?`,
        });
      }

      const ai = getGenAI();
      const systemInstruction = `Você é o Assistente Virtual Oficial da Impulso Digital Soluções em I.A. (CNPJ: 57.291.550/0001-24).
A Impulso Digital é referência em Inteligência Artificial Explicável (XAI), Arquitetura Avançada de Dados, Governança de Modelos Preditivos e Engenharia de Machine Learning.
O CEO da empresa é o Felipe Aquino, especialista renomado em XAI.
Responda de forma profissional, atenciosa, precisa e em português do Brasil.`;

      const formattedContents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          formattedContents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.content }],
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      res.json({
        success: true,
        reply: response.text || "Como posso ajudar você hoje?",
      });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Erro de comunicação com assistente XAI.",
      });
    }
  });

  // Vite middleware for dev or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Impulso Digital Server] Rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
