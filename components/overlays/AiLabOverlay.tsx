'use client';

import { useState } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { SERVICES } from '@/data/services';
import { X, Cpu, Terminal, Play, CheckCircle2, ArrowRight, Bot, Sparkles } from 'lucide-react';

export function AiLabOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  if (activeOverlay !== 'ai-lab') return null;

  const aiService = SERVICES.find((s) => s.id === 'ai-engineering') || SERVICES[0];

  const samplePrompts = [
    'Deploy autonomous code review swarm across 14 repositories',
    'Synthesize 10M vector documents with sub-second RAG retrieval',
    'Execute self-healing ERP database migration with zero downtime',
  ];

  const handleRunSimulation = (promptToRun?: string) => {
    const prompt = promptToRun || inputPrompt;
    if (!prompt.trim() || isSimulating) return;

    soundManager.playClick(soundEnabled);
    setIsSimulating(true);
    setSimulationLogs(['[AGENT_DISPATCH] Initializing autonomous worker swarm...']);

    const steps = [
      `[TASK_PLANNER] Parsing query: "${prompt.slice(0, 45)}..."`,
      '[MEMORY_STORE] Vector lookup: 12,400 embeddings retrieved in 42ms',
      '[SWARM_NODE_01] Reasoning model initialized. Executing tool calls...',
      '[DETERMINISTIC_CHECK] Output verified against JSON schema. Zero hallucinations.',
      '[COMPLETION] Swarm task resolved in 340ms with 99.8% confidence score.',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulationLogs((prev) => [...prev, step]);
        soundManager.playFootstep(soundEnabled);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
          soundManager.playChime(soundEnabled);
        }
      }, (idx + 1) * 450);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#3A7DFF] text-white px-2 py-0.5 uppercase">
                RESEARCH FACILITY
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                AUTONOMOUS COGNITION // SEC.02
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              QEVN AI LAB
            </h2>
            <p className="text-sm sm:text-base font-mono font-bold text-neutral-700 mt-1">
              BUILDING INTELLIGENT SYSTEMS THAT SHIP AND SCALE
            </p>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Close (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Overview Box */}
        <div className="brutalist-border bg-[#0E1726] text-white p-5 sm:p-6 mb-8 brutalist-shadow">
          <div className="flex items-center gap-2 text-[#38BDF8] font-mono text-xs font-bold uppercase mb-2">
            <Bot className="w-4 h-4" />
            <span>FRONTIER AGENTIC ARCHITECTURE</span>
          </div>
          <p className="text-sm sm:text-base font-mono leading-relaxed text-slate-300">
            {aiService.fullDesc}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-8">
          <div className="font-mono text-xs font-bold text-neutral-600 uppercase mb-3">
            CORE RESEARCH CAPABILITIES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {aiService.capabilities.map((cap, i) => (
              <div
                key={i}
                className="brutalist-border bg-white p-3.5 flex items-center gap-3 brutalist-shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3A7DFF] shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-black">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Agent Simulation Console */}
        <div className="brutalist-border-thick bg-[#0A0A0A] text-[#F7F7F2] p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                LIVE AGENT SWARM SIMULATOR
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-500">ENGINE // RUNTIME V4</span>
          </div>

          {/* Quick preset prompt pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputPrompt(p);
                  handleRunSimulation(p);
                }}
                disabled={isSimulating}
                className="brutalist-btn bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-[#38BDF8] text-[11px] font-mono py-1 px-2.5 text-left"
              >
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                {p}
              </button>
            ))}
          </div>

          {/* Prompt Input Form */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Enter task for autonomous swarm (or pick a preset above)..."
              disabled={isSimulating}
              className="flex-1 bg-black border-2 border-neutral-700 p-3 font-mono text-xs sm:text-sm text-white focus:border-[#38BDF8] outline-hidden"
            />
            <button
              onClick={() => handleRunSimulation()}
              disabled={isSimulating || !inputPrompt.trim()}
              className="brutalist-btn bg-[#3A7DFF] text-white py-3 px-6 text-xs sm:text-sm font-black hover:bg-[#2563EB] disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  DISPATCHING...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  DISPATCH SWARM
                </>
              )}
            </button>
          </div>

          {/* Terminal Execution Logs */}
          <div className="bg-black border border-neutral-800 p-3.5 font-mono text-xs text-neutral-300 min-h-28 space-y-1">
            {simulationLogs.length === 0 ? (
              <div className="text-neutral-600 italic">
                Awaiting task dispatch. Select a sample prompt above or enter your own mission parameters.
              </div>
            ) : (
              simulationLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={idx === simulationLogs.length - 1 ? 'text-[#38BDF8] font-bold' : ''}
                >
                  &gt; {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black">
          <div className="font-mono text-xs text-neutral-600 text-center sm:text-left">
            WANT TO BUILD AN AUTONOMOUS AI SYSTEM FOR YOUR ENTERPRISE?
          </div>
          <button
            onClick={() => {
              soundManager.playClick(soundEnabled);
              openOverlay('post-office');
            }}
            className="w-full sm:w-auto brutalist-btn bg-[#3A7DFF] text-white py-3 px-6 text-sm font-black hover:bg-[#2563EB]"
          >
            START AN AI PROJECT
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
