import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import type { ParticleState, AnimationStep } from '../types';
import { ANIMATION_STEPS, INITIAL_PARTICLES } from '../constants';
import { COMPLEX_INFO, ComplexKey } from '../data/complexInfo';
import InfoModal from './InfoModal';


const Electron: React.FC<{ position: { top: string; left: string }, opacity: number }> = ({ position, opacity }) => (
  <div
    className="absolute w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_8px_2px_rgba(253,244,155,0.7)] transition-all duration-1000 ease-in-out"
    style={{ ...position, opacity, transitionProperty: 'top, left, opacity' }}
  />
);

const Proton: React.FC<{ position: { top: string; left: string }, opacity: number, label?: boolean }> = ({ position, opacity, label = true }) => (
  <div
    className="absolute w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_8px_2px_rgba(135,227,246,0.7)] transition-all duration-1000 ease-in-out flex items-center justify-center animate-bob"
    style={{ ...position, opacity, transitionProperty: 'top, left, opacity' }}
  >
    {label && <span className="text-black text-[8px] font-bold">H+</span>}
  </div>
);

const ATP: React.FC<{ position: { top: string; left: string }, opacity: number }> = ({ position, opacity }) => (
  <div
    className="absolute px-2 py-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-xl transition-all duration-1000 ease-in-out"
    style={{ ...position, opacity, transform: 'translate(-50%, -50%)', transitionProperty: 'top, left, opacity' }}
  >
    ATP
  </div>
);

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`absolute text-center text-xs font-semibold text-blue-200 ${className}`}>
        {children}
    </div>
);


const ElectronTransportChain: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [particles, setParticles] = useState<ParticleState>(INITIAL_PARTICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentKey, setModalContentKey] = useState<ComplexKey | null>(null);

  // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStep: AnimationStep = ANIMATION_STEPS[stepIndex];
  
  const pauseAnimation = () => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeAnimation = () => {
    if (stepIndex < ANIMATION_STEPS.length - 1) {
       setIsPlaying(true);
    }
  };

  const runAnimation = useCallback(() => {
    if (!isPlaying || isModalOpen) return;

    const stepChanges = currentStep.particleState;

    setParticles(p => ({
        ...p,
        electrons: stepChanges.electrons ?? p.electrons,
        matrixProtons: stepChanges.matrixProtons ?? p.matrixProtons,
        intermembraneProtons: stepChanges.intermembraneProtons ?? p.intermembraneProtons,
        atp: stepChanges.atp ?? p.atp,
    }));

    timeoutRef.current = setTimeout(() => {
      setStepIndex((prevIndex) => (prevIndex + 1) % ANIMATION_STEPS.length);
    }, currentStep.duration);

  // NOTE: We disable exhaustive-deps because we only want this to run when isPlaying or stepIndex changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, stepIndex, isModalOpen]);

  useEffect(() => {
    runAnimation();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [runAnimation]);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      if (stepIndex === ANIMATION_STEPS.length - 1) {
        handleReset(true); 
      } else {
        resumeAnimation();
      }
    }
  };

  const handleReset = (playAfterReset = false) => {
    pauseAnimation();
    setStepIndex(0);
    setParticles(INITIAL_PARTICLES);
    if (playAfterReset) {
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  const handleComplexClick = (complexKey: ComplexKey) => {
    pauseAnimation();
    setModalContentKey(complexKey);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContentKey(null);
    resumeAnimation();
  };
  
  const rotorActive = stepIndex >= 12 && stepIndex < 14;

  const gradientLevel = useMemo(() => {
    if (stepIndex >= 12) return 0; // Gradient used up
    if (stepIndex >= 8) return 3; // After complex IV
    if (stepIndex >= 4) return 2; // After complex III
    if (stepIndex >= 2) return 1; // After complex I
    return 0; // Initial state
  }, [stepIndex]);

  const complexClasses = "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center text-white font-bold text-xl rounded-2xl";

  return (
    <div className="w-full relative aspect-[16/9] bg-gray-800/50 rounded-lg p-4 flex flex-col overflow-hidden">
       {/* Labels */}
       <div className="absolute top-2 left-4 text-cyan-200 font-semibold z-10 text-sm">ESPAÇO INTERMEMBRANA</div>
       <div className="absolute bottom-2 left-4 text-blue-300 font-semibold text-sm">MATRIZ MITOCONDRIAL</div>

       {/* Gradient Density Visualizer */}
        <div 
            className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-cyan-400/30 to-transparent transition-opacity duration-1000"
            style={{ opacity: gradientLevel * 0.3 }}
        />

       {/* Membrane */}
        <div className="absolute top-[35%] left-0 right-0 h-[30%] bg-black/30 backdrop-blur-[2px] flex items-center px-4">
            <div className="w-full h-full bg-gradient-to-b from-blue-800/30 to-blue-900/40"></div>
            <span className="absolute right-4 bottom-2 text-xs text-blue-300">Membrana Mitocondrial Interna</span>
        </div>
        <div className="absolute top-[34%] left-0 right-0 h-[32%] flex items-center justify-between">
            {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center opacity-30">
                    <div className="w-1.5 h-3 bg-blue-300 rounded-full" />
                    <div className="w-px h-12 bg-blue-400" />
                    <div className="w-1.5 h-3 bg-blue-300 rounded-full" />
                </div>
            ))}
        </div>

      {/* Complexes */}
      <div onClick={() => handleComplexClick('I')} className={`${complexClasses} absolute top-[28%] left-[10%] w-[10%] h-[40%] bg-gradient-to-br from-teal-500 to-cyan-600`}>I</div>
      <div onClick={() => handleComplexClick('II')} className={`${complexClasses} absolute top-[50%] left-[23%] w-[8%] h-[20%] bg-gradient-to-br from-sky-500 to-blue-600`}>II</div>
      <div onClick={() => handleComplexClick('III')} className={`${complexClasses} absolute top-[28%] left-[34%] w-[10%] h-[40%] bg-gradient-to-br from-indigo-500 to-purple-600`}>III</div>
      <div onClick={() => handleComplexClick('IV')} className={`${complexClasses} absolute top-[32%] left-[48%] w-[10%] h-[30%] bg-gradient-to-br from-pink-500 to-rose-600`}>IV</div>
      
      {/* ATP Synthase */}
      <div onClick={() => handleComplexClick('ATP_SYNTHASE')} className={`${complexClasses} absolute top-[20%] left-[80%] w-[15%] h-[60%] group`}>
        <div className="absolute top-0 left-[15%] w-[70%] h-[40%] bg-gradient-to-b from-emerald-500 to-green-600 rounded-t-full"></div>
        <div className={`absolute top-[40%] left-[25%] w-[50%] h-[20%] bg-green-500 rounded-full flex items-center justify-center ${rotorActive ? 'animate-spin' : ''}`}></div>
        <div className="absolute top-[60%] left-[35%] w-[30%] h-[40%] bg-emerald-600 rounded-b-xl"></div>
        <div className="absolute -bottom-4 w-full text-center text-sm font-bold text-green-300">ATP Sintase</div>
      </div>

      {/* Mobile Carriers */}
      <div className="absolute top-[45%] left-[20%] w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">Q</div>
      <Label className="top-[53%] left-[18.5%] w-10">Coenzima Q</Label>
      
      <div className="absolute top-[30%] left-[45%] w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">Cyt C</div>
      <Label className="top-[40%] left-[43.5%] w-12">Citocromo C</Label>

      {/* Molecules and Paths */}
      <div className="absolute top-[65%] left-[15%] w-px h-[15%] border-l-2 border-dashed border-sky-400 opacity-50"></div>
      
      <Label className="top-[78%] left-[5%]">NADH</Label>
      <Label className="top-[60%] left-[9%] w-20">NAD⁺ + H⁺</Label>

      <Label className="top-[74%] left-[22%]">FADH₂</Label>
      <Label className="top-[60%] left-[27%]">FAD</Label>

      <Label className="top-[65%] left-[53%] w-20">½O₂ + 2H⁺</Label>
      <Label className="top-[75%] left-[58%] text-blue-400">H₂O</Label>

      <Label className="top-[75%] left-[78%]">ADP + P<sub className="text-[0.6rem]">i</sub></Label>

      {/* Particles */}
      {particles.electrons.map((e, i) => <Electron key={`e-${i}`} position={e} opacity={e.opacity} />)}
      {particles.matrixProtons.map((p, i) => <Proton key={`mp-${i}`} position={p} opacity={p.opacity} />)}
      {particles.intermembraneProtons.map((p, i) => <Proton key={`imp-${i}`} position={p} opacity={p.opacity} />)}
      <ATP position={particles.atp} opacity={particles.atp.opacity} />

      {/* UI Overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
        {/* Description and Progress Bar */}
        <div className="w-1/2 max-w-md bg-black/30 backdrop-blur-md p-3 rounded-lg ring-1 ring-white/10">
          <p className="text-sm font-semibold text-white capitalize">{currentStep.name.replace(/_/g, ' ').toLowerCase()}</p>
          <p className="text-xs text-blue-200 mt-1 h-8">{currentStep.description}</p>
          <div className="w-full bg-black/20 rounded-full h-1.5 mt-2 ring-1 ring-white/10">
            <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-500 ease-linear"
                style={{ width: `${((stepIndex) / (ANIMATION_STEPS.length -1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-2">
            <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-blue-600/50 text-white rounded-lg shadow-md hover:bg-blue-500 backdrop-blur-sm ring-1 ring-white/20 flex items-center space-x-2 transition-all"
            >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? "Pausar" : (stepIndex === ANIMATION_STEPS.length - 1 ? "Repetir" : "Reproduzir")}</span>
            </button>
            <button
            onClick={() => handleReset(false)}
            className="px-4 py-2 bg-gray-600/50 text-white rounded-lg shadow-md hover:bg-gray-500 backdrop-blur-sm ring-1 ring-white/20 flex items-center space-x-2 transition-colors"
            >
            <RotateCcw size={18} />
            <span>Resetar</span>
            </button>
        </div>
      </div>
       {isModalOpen && modalContentKey && (
        <InfoModal content={COMPLEX_INFO[modalContentKey]} onClose={closeModal} />
      )}
    </div>
  );
};

export default ElectronTransportChain;