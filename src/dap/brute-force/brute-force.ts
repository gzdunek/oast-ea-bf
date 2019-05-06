import { Graph } from '../../types/graph';
import { Solution } from '../../types/solution';
import { computeAllocationCost } from '../link-computation';

export const solveUsingBruteforce = (graph: Graph, allSolutions: Allocation[]): Solution => {
  let bestSolution: Solution;

  for (const [, singleSolution] of allSolutions.entries()) {
    const objectiveFunctionValue = computeAllocationCost(graph, singleSolution);

    if (objectiveFunctionValue === 0) {
      bestSolution = { allocation: singleSolution, cost: objectiveFunctionValue };
      break;
    }
  }

  // @ts-ignore
  return bestSolution;
};
