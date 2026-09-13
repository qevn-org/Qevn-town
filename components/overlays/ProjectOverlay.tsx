'use client';

import { useState } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import { PROJECTS, Project } from '@/data/projects';
import { X, FolderGit2, CheckCircle2, ArrowRight, Layers, BarChart3 } from 'lucide-react';

export function ProjectOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const selectedProjectId = useTownStore((s) => s.selectedProjectId);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  const [activeProjId, setActiveProjId] = useState<string>(
    selectedProjectId || PROJECTS[0].id
  );

  if (activeOverlay !== 'project') return null;

  const currentProject: Project =
    PROJECTS.find((p) => p.id === activeProjId) || PROJECTS[0];

  const handleSelectProject = (id: string) => {
    soundManager.playClick(soundEnabled);
    setActiveProjId(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-10 brutalist-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-black bg-[#FF4444] text-white px-2 py-0.5 uppercase">
                COMMERCIAL PORTFOLIO
              </span>
              <span className="font-mono text-xs text-neutral-500 font-bold">
                PROJECT STREET // 04 PRODUCTION BUILDS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              SHIPPED WORK
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Close (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-black pb-4">
          {PROJECTS.map((proj) => {
            const isSelected = proj.id === currentProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={`brutalist-btn text-xs sm:text-sm py-2.5 px-4 font-black uppercase transition-all ${
                  isSelected
                    ? 'bg-black text-[#F7F7F2] brutalist-shadow-lime'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                <FolderGit2 className="w-4 h-4" style={{ color: proj.accent }} />
                {proj.title}
              </button>
            );
          })}
        </div>

        {/* Active Project Dossier */}
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="brutalist-border bg-white p-6 brutalist-shadow">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="font-mono text-xs font-bold text-neutral-600 uppercase">
                {currentProject.category} // {currentProject.year}
              </span>
              <span
                className="font-mono text-xs font-black px-2.5 py-0.5 border-2 border-black"
                style={{ backgroundColor: currentProject.accent, color: '#0A0A0A' }}
              >
                STATUS: {currentProject.status}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-2">
              {currentProject.title}
            </h3>
            <p className="text-sm sm:text-base font-mono text-neutral-700 font-bold mb-4">
              {currentProject.tagline}
            </p>
            <p className="text-xs sm:text-sm font-mono text-neutral-600 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Metrics & Impact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentProject.metrics.map((m, i) => (
              <div key={i} className="brutalist-border bg-[#0A0A0A] text-white p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 uppercase mb-1">
                  <BarChart3 className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span>{m.label}</span>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: currentProject.accent }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Deliverables */}
            <div className="brutalist-border bg-white p-5">
              <div className="font-mono text-xs font-black uppercase mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>KEY SYSTEM DELIVERABLES</span>
              </div>
              <div className="space-y-2">
                {currentProject.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-mono text-neutral-700">
                    <span className="text-[#FF4444] font-black">&gt;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div className="brutalist-border bg-white p-5">
              <div className="font-mono text-xs font-black uppercase mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3A7DFF]" />
                <span>TECHNOLOGY INFRASTRUCTURE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs font-bold border-2 border-black bg-[#ECEAE2] px-2.5 py-1 text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-6 border-t-2 border-black">
          <div className="font-mono text-xs text-neutral-600 text-center sm:text-left">
            INTERESTED IN A SYSTEM LIKE THIS FOR YOUR ORGANIZATION?
          </div>
          <button
            onClick={() => {
              soundManager.playClick(soundEnabled);
              openOverlay('post-office');
            }}
            className="w-full sm:w-auto brutalist-btn bg-[#B7FF00] text-black py-3 px-6 text-sm font-black hover:bg-[#a5ea00]"
          >
            DISCUSS THIS ARCHITECTURE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
