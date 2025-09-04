
import React from 'react';
import { X } from 'lucide-react';
import type { ComplexInfo } from '../data/complexInfo';

interface InfoModalProps {
  content: ComplexInfo;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ content, onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800/80 ring-1 ring-white/20 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 text-white relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-cyan-300 mb-2">{content.title}</h2>
        <p className="text-sm text-blue-200 italic mb-4">{content.subtitle}</p>
        <p className="text-base text-gray-200 mb-4">{content.description}</p>

        <div className="space-y-3">
          {content.reactions.map((reaction, index) => (
            <div key={index} className="bg-black/30 p-3 rounded-lg">
              <p className="font-semibold text-emerald-300 mb-1">{reaction.label}</p>
              <p className="font-mono text-sm bg-gray-900 p-2 rounded">{reaction.equation}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InfoModal;
