// import { List } from 'immutable';
// import { solveUsingBruteforce } from './dap/brute-force/brute-force';
// import { generateAllSolutions } from './dap/brute-force/solutions-generation';
import * as math from 'mathjs';
import { solveUsingEvolutionAlgorithm } from './dap/evolution-algorithm/evolution-algorithm';
import { parseFile } from './parser/parser';
import { EvolutionAlgorithmConfig } from './types/evolution-algorithm-config';

const main = async () => {
  math.config({ randomSeed: 'oast' });

  const eaStartupConfig: EvolutionAlgorithmConfig = {
    startPopulationAmount: 500,
    crossoverProbability: 0.7,
    mutationProbability: 0.16,
    maxMutationsCount: 50000000,
    maxNoChangeGenerations: 2500000,
    maxTime: 600,
  };
  // const startArguments = List(process.argv.map(String)).skip(2);

  // if (startArguments.isEmpty()) {
  //   console.error('No file to read');
  //   process.exitCode = 1;x
  //
  //   return;
  // }

  try {
    // const graph = await parseFile(startArguments.get<string>(0, ''));
    const graph = await parseFile('/Users/grzegorz/Projects/oast-ea-bf/src/big-test-file.txt');
    // const solutions = generateAllSolutions(graph);
    // const bestSolution = solveUsingBruteforce(graph, solutions);
    solveUsingEvolutionAlgorithm(graph, eaStartupConfig);
    // console.log(bestSolution);
  } catch (e) {
    console.log(e);
  }
};

main();
