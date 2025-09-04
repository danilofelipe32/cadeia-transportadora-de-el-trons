export interface Position {
  top: string;
  left: string;
  opacity: number;
}

export interface ParticleState {
  electrons: Position[];
  matrixProtons: Position[];
  intermembraneProtons: Position[];
  atp: Position;
}

export interface AnimationStep {
  name: string;
  description: string;
  duration: number;
  particleState: Partial<ParticleState>;
}
