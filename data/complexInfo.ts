
export interface Reaction {
    label: string;
    equation: string;
}

export interface ComplexInfo {
    title: string;
    subtitle: string;
    description: string;
    reactions: Reaction[];
}

export type ComplexKey = 'I' | 'II' | 'III' | 'IV' | 'ATP_SYNTHASE';

export const COMPLEX_INFO: Record<ComplexKey, ComplexInfo> = {
    'I': {
        title: "Complexo I",
        subtitle: "NADH Desidrogenase",
        description: "Este complexo aceita elétrons de alta energia do NADH. A energia liberada durante a transferência de elétrons é usada para bombear prótons (H+) da matriz mitocondrial para o espaço intermembrana.",
        reactions: [
            {
                label: "Oxidação do NADH",
                equation: "NADH + H⁺ → NAD⁺ + 2e⁻"
            },
            {
                label: "Bombeamento de Prótons",
                equation: "4H⁺ (matriz) → 4H⁺ (espaço intermembrana)"
            }
        ]
    },
    'II': {
        title: "Complexo II",
        subtitle: "Succinato Desidrogenase",
        description: "O Complexo II aceita elétrons do FADH₂, que é outro carreador de elétrons. Diferente dos outros complexos, ele não bombeia prótons através da membrana. Ele serve como um ponto de entrada alternativo para elétrons na cadeia.",
        reactions: [
            {
                label: "Oxidação do FADH₂",
                equation: "FADH₂ → FAD + 2H⁺ + 2e⁻"
            }
        ]
    },
    'III': {
        title: "Complexo III",
        subtitle: "Complexo Citocromo bc₁",
        description: "Recebe elétrons da Coenzima Q (ubiquinona) e os transfere para o Citocromo C. Este processo também bombeia prótons através da membrana, contribuindo para o gradiente de prótons.",
        reactions: [
            {
                label: "Transferência de Elétrons",
                equation: "Q(2H) + 2 Cyt c (ox) → Q + 2 Cyt c (red) + 2H⁺"
            },
            {
                label: "Bombeamento de Prótons",
                equation: "4H⁺ (matriz) → 4H⁺ (espaço intermembrana)"
            }
        ]
    },
    'IV': {
        title: "Complexo IV",
        subtitle: "Citocromo c oxidase",
        description: "A etapa final da cadeia de transporte de elétrons. O Complexo IV transfere os elétrons para o oxigênio (O₂), o aceptor final de elétrons, que então se combina com prótons para formar água. Este processo também bombeia prótons.",
        reactions: [
            {
                label: "Redução do Oxigênio",
                equation: "4e⁻ + 4H⁺ + O₂ → 2H₂O"
            },
            {
                label: "Bombeamento de Prótons",
                equation: "2H⁺ (matriz) → 2H⁺ (espaço intermembrana)"
            }
        ]
    },
    'ATP_SYNTHASE': {
        title: "ATP Sintase",
        subtitle: "A Turbina Molecular",
        description: "Esta enzima usa a energia potencial armazenada no gradiente de prótons (força próton-motriz) para sintetizar ATP a partir de ADP e fosfato inorgânico (Pi). Os prótons fluem através da ATP sintase, fazendo com que ela gire e catalise a produção de ATP.",
        reactions: [
            {
                label: "Síntese de ATP",
                equation: "ADP + Pᵢ + H⁺ (fora) → ATP + H₂O + H⁺ (dentro)"
            }
        ]
    }
};
