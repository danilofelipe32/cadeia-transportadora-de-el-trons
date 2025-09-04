
import React from 'react';
import ElectronTransportChain from './components/ElectronTransportChain';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Cadeia Transportadora de Elétrons</h1>
          <p className="text-blue-200 mt-2 text-lg">Uma animação interativa da respiração celular.</p>
        </header>
        <main className="w-full bg-black/20 rounded-2xl shadow-2xl p-2 lg:p-4 overflow-hidden ring-1 ring-white/10 backdrop-blur-sm">
          <ElectronTransportChain />
        </main>
        <footer className="text-center mt-6 text-blue-300 text-sm">
          <p>Clique nos complexos para saber mais. Construído com React, TypeScript e Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
