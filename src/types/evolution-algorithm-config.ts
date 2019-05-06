export interface EvolutionAlgorithmConfig {
  startPopulationAmount: number;
  crossoverProbability: number;
  mutationProbability: number;
  maxTime: number;
  maxMutationsCount: number;
  maxNoChangeGenerations: number;
}
