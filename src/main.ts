import { solveProblem } from './solve-problem';
import { EvolutionAlgorithmConfig } from './types/evolution-algorithm-config';
import { Method } from './types/method';
import { Problem } from './types/problem';

const main = async () => {
  const problemType = Problem.Dap;
  const solveMethod = Method.BruteForce;
  const filePath = '/Users/grzegorz/Projects/oast-ea-bf/src/net4.txt';
  const seed = 'oast';
  const eaStartupConfig: EvolutionAlgorithmConfig = {
    startPopulationAmount: 500,
    crossoverProbability: 0.7,
    mutationProbability: 0.16,
    maxMutationsCount: 50000000,
    maxNoChangeGenerations: 2500000,
    maxTime: 30,
  };

  return solveProblem(problemType, solveMethod, eaStartupConfig, seed, filePath);
};

main();
