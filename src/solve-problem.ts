import * as math from 'mathjs';
import { solveDapUsingBruteforce, solveDdapUsingBruteforce } from './problem-solvers/brute-force/brute-force';
import { generateAllSolutions } from './problem-solvers/brute-force/solutions-generation';
import { solveUsingEvolutionAlgorithm } from './problem-solvers/evolution-algorithm/evolution-algorithm';
import { computeDapAllocationCost, computeDdapAllocationCost } from './problem-solvers/link-computation';
import { parseFile } from './parser/parser';
import { EvolutionAlgorithmConfig } from './types/evolution-algorithm-config';
import { Method } from './types/method';
import { Problem } from './types/problem';

export const solveProblem = async (problemType: Problem, solvingMethod: Method, eaConfig: EvolutionAlgorithmConfig, seed: string, filePath: string) => {
  try {
    math.config({ randomSeed: seed });

    const graph = await parseFile(filePath);
    let bestSolution;

    if (solvingMethod === Method.BruteForce) {
      const solutions = generateAllSolutions(graph);
      bestSolution = problemType === Problem.Dap ? solveDapUsingBruteforce(graph, solutions) : solveDdapUsingBruteforce(graph, solutions);
    } else {
      const costAllocationMethod = problemType === Problem.Dap ? computeDapAllocationCost : computeDdapAllocationCost;
      bestSolution = solveUsingEvolutionAlgorithm(graph, eaConfig, costAllocationMethod);
    }
    console.log(bestSolution);
  } catch (e) {
    console.log(e);
  }
};
