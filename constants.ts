import type { AnimationStep, ParticleState } from './types';

// Define posições iniciais determinísticas para uma animação consistente.
const INITIAL_MATRIX_PROTONS = [
  { top: '70%', left: '13%', opacity: 1 }, { top: '80%', left: '18%', opacity: 1 },
  { top: '68%', left: '25%', opacity: 1 }, { top: '75%', left: '32%', opacity: 1 },
  { top: '82%', left: '38%', opacity: 1 }, { top: '65%', left: '45%', opacity: 1 },
  { top: '78%', left: '51%', opacity: 1 }, { top: '85%', left: '58%', opacity: 1 },
  { top: '70%', left: '65%', opacity: 1 }, { top: '80%', left: '72%', opacity: 1 },
];

const INITIAL_INTERMEMBRANE_PROTONS = [
  { top: '15%', left: '20%', opacity: 0.8 }, { top: '10%', left: '40%', opacity: 0.8 },
  { top: '20%', left: '60%', opacity: 0.8 }, { top: '12%', left: '75%', opacity: 0.8 },
];

export const INITIAL_PARTICLES: ParticleState = {
  electrons: [
    { top: '80%', left: '10%', opacity: 0 },
    { top: '80%', left: '12%', opacity: 0 },
  ],
  matrixProtons: INITIAL_MATRIX_PROTONS,
  intermembraneProtons: INITIAL_INTERMEMBRANE_PROTONS,
  atp: { top: '95%', left: '88%', opacity: 0 },
};


export const ANIMATION_STEPS: AnimationStep[] = [
  // Step 0: Initial State
  {
    name: "COMEÇAR",
    description: "NADH, um carreador de elétrons, aproxima-se do Complexo I para iniciar o processo.",
    duration: 1000,
    particleState: {
      electrons: [
        { top: '80%', left: '10%', opacity: 1 },
        { top: '80%', left: '12%', opacity: 1 },
      ],
    },
  },
  // Step 1: NADH delivers electrons to Complex I
  {
    name: "NADH PARA O COMPLEXO I",
    description: "NADH doa dois elétrons de alta energia para o Complexo I.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '48%', left: '14%', opacity: 1 },
        { top: '52%', left: '14%', opacity: 1 },
      ],
    },
  },
  // Step 2: Electrons to Q, Proton 1 pump
  {
    name: "BOMBEAMENTO DE PRÓTONS NO COMPLEXO I",
    description: "A energia dos elétrons é usada para bombear um próton (H+) da matriz para o espaço intermembrana.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '48%', left: '21%', opacity: 1 },
        { top: '52%', left: '21%', opacity: 1 },
      ],
      matrixProtons: [
        { ...INITIAL_MATRIX_PROTONS[0], opacity: 0 }, // Proton "desaparece" da matriz
        ...INITIAL_MATRIX_PROTONS.slice(1)
      ],
      intermembraneProtons: [
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 } // E "aparece" no espaço intermembrana
      ],
    },
  },
  // Step 3: Q moves to Complex III
  {
    name: "Q PARA O COMPLEXO III",
    description: "A coenzima Q (ubiquinona), o carreador móvel, transporta os elétrons para o Complexo III.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '48%', left: '35%', opacity: 1 },
        { top: '52%', left: '35%', opacity: 1 },
      ],
    },
  },
  // Step 4: Electrons pass through Complex III, Proton 2 pump
  {
    name: "BOMBEAMENTO DE PRÓTONS NO COMPLEXO III",
    description: "A passagem dos elétrons pelo Complexo III bombeia outro próton através da membrana.",
    duration: 1500,
    particleState: {
      matrixProtons: [
        { ...INITIAL_MATRIX_PROTONS[0], opacity: 0 },
        { ...INITIAL_MATRIX_PROTONS[3], opacity: 0 }, // Outro próton bombeado
        ...INITIAL_MATRIX_PROTONS.slice(1,3),
        ...INITIAL_MATRIX_PROTONS.slice(4),
      ],
      intermembraneProtons: [
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 } // Acumulando prótons
      ],
    },
  },
  // Step 5: Electrons to Cyt C
  {
    name: "ELÉTRONS PARA O CITOCROMO C",
    description: "Os elétrons são transferidos para o Citocromo C, outro carreador móvel.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '33%', left: '46%', opacity: 1 },
        { top: '33%', left: '46%', opacity: 1 },
      ],
    },
  },
  // Step 6: Cyt C moves to Complex IV
  {
    name: "CITOCROMO C PARA O COMPLEXO IV",
    description: "Citocromo C transporta os elétrons para o Complexo IV, a etapa final da cadeia.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '45%', left: '52%', opacity: 1 },
        { top: '45%', left: '52%', opacity: 1 },
      ],
    },
  },
  // Step 7: Electrons pass through Complex IV
  {
    name: "ELÉTRONS NO COMPLEXO IV",
    description: "Os elétrons viajam através do Complexo IV.",
    duration: 1000,
    particleState: {},
  },
  // Step 8: Proton 3 pump
  {
    name: "BOMBEAMENTO DE PRÓTONS NO COMPLEXO IV",
    description: "O Complexo IV bombeia o próton final, aumentando ainda mais o gradiente.",
    duration: 1500,
    particleState: {
       matrixProtons: [
        { ...INITIAL_MATRIX_PROTONS[0], opacity: 0 },
        { ...INITIAL_MATRIX_PROTONS[3], opacity: 0 },
        { ...INITIAL_MATRIX_PROTONS[6], opacity: 0 }, // Terceiro próton bombeado
        ...INITIAL_MATRIX_PROTONS.slice(1,3),
        ...INITIAL_MATRIX_PROTONS.slice(4,6),
        ...INITIAL_MATRIX_PROTONS.slice(7),
      ],
      intermembraneProtons: [
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 },
        { top: '25%', left: '53%', opacity: 1 } // O gradiente está se formando
      ],
    },
  },
  // Step 9: Electrons combine with O2 to make water
  {
    name: "FORMAÇÃO DE ÁGUA",
    description: "O oxigênio, o aceptor final de elétrons, pega os elétrons e íons H+ para formar água.",
    duration: 1500,
    particleState: {
      electrons: [
        { top: '70%', left: '53%', opacity: 0 },
        { top: '70%', left: '53%', opacity: 0 },
      ],
    },
  },
   // Step 10: Protons accumulate
  {
    name: "GRADIENTE DE PRÓTONS ESTABELECIDO",
    description: "Um forte gradiente de prótons (energia potencial) agora existe através da membrana.",
    duration: 1000,
    particleState: {
      intermembraneProtons: [
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 },
        { top: '25%', left: '53%', opacity: 1 },
        { top: '18%', left: '80%', opacity: 1 }, // Prótons se movem em direção à ATP sintase
        { top: '20%', left: '75%', opacity: 1 },
      ],
    },
  },
  // Step 11: Protons move to ATP Synthase
  {
    name: "PRÓTONS ENTRAM NA ATP SINTASE",
    description: "O gradiente impulsiona os prótons a fluírem para o canal da ATP Sintase.",
    duration: 1500,
    particleState: {
      intermembraneProtons: [
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 },
        { top: '25%', left: '53%', opacity: 1 },
        { top: '35%', left: '86%', opacity: 1 }, // Prótons entram no canal
        { top: '32%', left: '88%', opacity: 1 },
      ],
    },
  },
  // Step 12: Protons flow through ATP Synthase
  {
    name: "FLUXO DE PRÓTONS ATIVA A SÍNTESE DE ATP",
    description: "O fluxo de prótons gira a ATP Sintase como uma turbina, liberando energia.",
    duration: 2000,
    particleState: {
       intermembraneProtons: [ // Prótons se movem através do canal
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 },
        { top: '25%', left: '53%', opacity: 1 },
        { top: '75%', left: '86%', opacity: 1 }, 
        { top: '78%', left: '88%', opacity: 1 },
       ],
    },
  },
  // Step 13: ATP is produced
  {
    name: "ATP É PRODUZIDO",
    description: "A energia da rotação é usada para combinar ADP e Pi, formando ATP - a principal moeda de energia da célula.",
    duration: 1500,
    particleState: {
      atp: { top: '85%', left: '88%', opacity: 1 },
      intermembraneProtons: [ // Prótons que fluíram desaparecem do espaço intermembrana
        ...INITIAL_INTERMEMBRANE_PROTONS,
        { top: '25%', left: '15%', opacity: 1 },
        { top: '22%', left: '39%', opacity: 1 },
        { top: '25%', left: '53%', opacity: 1 },
        { top: '75%', left: '86%', opacity: 0 }, 
        { top: '78%', left: '88%', opacity: 0 },
      ],
       matrixProtons: [ // E reaparecem na matriz
        ...INITIAL_MATRIX_PROTONS,
        { top: '80%', left: '86%', opacity: 1 },
        { top: '82%', left: '88%', opacity: 1 },
       ]
    },
  },
  // Step 14: End of cycle
  {
    name: "FIM",
    description: "O ciclo está completo! A energia do NADH foi usada para criar ATP.",
    duration: 2000,
    particleState: {
      atp: { top: '90%', left: '88%', opacity: 0 },
    },
  }
];