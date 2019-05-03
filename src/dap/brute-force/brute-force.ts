import { List } from 'immutable';
import { Graph } from '../../types/graph';
import { computeLinkLoads } from '../link-computation';

export const solveUsingBruteforce = (graph: Graph, allSolutions: [][][]) => {
  let bestSolution: [][] = [];

  for (const [index, singleSolution] of allSolutions.entries()) {
    const linkLoads = computeLinkLoads(graph, singleSolution);
    let maxOverloads = List();
    let objectiveFunctionValue = List();

    linkLoads.forEach((linkLoad: number, linkIndex: number) => {
      const link = graph.links.get(linkIndex);
      // @ts-ignore
      const linkCapacity = link.numberOfFiberPairsInCable * link.numberOfLambdasInFiber;
      const linkOverload = linkLoad - linkCapacity;
      maxOverloads = maxOverloads.push(Math.max(0, linkOverload));
    });

    objectiveFunctionValue = objectiveFunctionValue.set(index, Math.max(...maxOverloads));

    if (objectiveFunctionValue.get(index) === 0) {
      bestSolution = singleSolution;
      break;
    }
  }

  return bestSolution;
};
