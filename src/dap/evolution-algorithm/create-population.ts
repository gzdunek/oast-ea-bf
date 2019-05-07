import * as math from 'mathjs';
import { Demand } from '../../types/demand';
import { Graph } from '../../types/graph';
import { Path } from '../../types/path';
import { Solution } from '../../types/solution';
import { sortSolutions } from './utils';

export const createPopulation = (populationAmount: number, graph: Graph, computeAllocationCostFunction: Function) => {
  const population: Allocation[] = [];

  for (let i = 0; i < populationAmount; i += 1) {
    const allocation: Allocation = [];
    graph.demands.forEach((demand: Demand, demandIndex: number) => {
      allocation.push([]);
      let volumeUsed = 0;
      demand.paths.forEach((path: Path) => {
        const availableVolume = demand.volume - volumeUsed;
        if (demand.paths.last() !== path) {
          const randomVolume = math.randomInt(0, availableVolume);
          volumeUsed += randomVolume;
          allocation[demandIndex].push(randomVolume);
        } else {
          allocation[demandIndex].push(availableVolume);
        }
      });
    });
    population.push(allocation);
  }

  return sortSolutions(getSolutions(graph, population, computeAllocationCostFunction));
};

const getSolutions = (graph: Graph, allocations: Allocation[], computeAllocationCostFunction: Function): Solution[] => {
  return allocations.map((allocation: Allocation) => ({
    allocation,
    costAndLinkLoads: computeAllocationCostFunction(graph, allocation),
  }));
};
