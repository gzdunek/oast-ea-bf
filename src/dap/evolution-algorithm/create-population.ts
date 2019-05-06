import * as math from 'mathjs';
import { Demand } from '../../types/demand';
import { Graph } from '../../types/graph';
import { Path } from '../../types/path';
import { Solution } from '../../types/solution';
import { computeAllocationCost } from '../link-computation';
import { sortSolutions } from './utils';

export const createPopulation = (populationAmount: number, graph: Graph) => {
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
      // shuffleArray(allocation[demandIndex]);
    });
    population.push(allocation);
  }

  return sortSolutions(getSolutions(graph, population));
};

const getSolutions = (graph: Graph, allocations: Allocation[]): Solution[] => {
  return allocations.map((allocation: Allocation) => ({
    allocation,
    cost: computeAllocationCost(graph, allocation),
  }));
};

// const shuffleArray = <T extends {}>(arr: T[]): T[] => arr.sort(() => math.random(-0.5, 0.5));
