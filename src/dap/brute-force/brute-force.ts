import { Graph } from '../../types/graph';
import { Solution } from '../../types/solution';
import { sortSolutions } from '../evolution-algorithm/utils';
import { computeDapAllocationCost, computeDdapAllocationCost } from '../link-computation';

export const solveDdapUsingBruteforce = (graph: Graph, allAllocations: Allocation[]): Solution => {
  const allSolutions = allAllocations.map((allocation: Allocation) => ({
    allocation,
    costAndLinkLoads: computeDdapAllocationCost(graph, allocation),
  }));

  const sortedSolutions = sortSolutions(allSolutions);

  return sortedSolutions[0];
};

export const solveDapUsingBruteforce = (graph: Graph, allAllocations: Allocation[]): Solution => {
  let bestSolution;

  for (const [, singleSolution] of allAllocations.entries()) {
    const objectiveFunctionValue = computeDapAllocationCost(graph, singleSolution);

    if (objectiveFunctionValue.cost === 0) {
      bestSolution = { allocation: singleSolution, costAndLinkLoads: objectiveFunctionValue };
      break;
    }
  }

  // @ts-ignore
  return bestSolution;
};
