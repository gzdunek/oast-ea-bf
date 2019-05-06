import { EvolutionAlgorithmConfig } from '../../types/evolution-algorithm-config';
import { EvolutionAlgorithmState } from '../../types/evolution-algorithm-state';
import { Graph } from '../../types/graph';
import { Solution } from '../../types/solution';
import { computeAllocationCost } from '../link-computation';
import { createPopulation } from './create-population';
import { cross } from './cross';
import { mutate } from './mutate';
import { sortSolutions } from './utils';

export const solveUsingEvolutionAlgorithm = (graph: Graph, config: EvolutionAlgorithmConfig) => {
  const algorithmState: EvolutionAlgorithmState = {
    time: 0,
    mutationsCount: 0,
    noChangeGenerations: 0,
  };
  let population = createPopulation(config.startPopulationAmount, graph);
  let iteration = 0;
  let bestCostAndAllocation = getSolutionCostAndAllocation(population[0]);
  const startTime = new Date().getTime();
  let offsprings: Solution[] = [];
  while (!shouldStop(algorithmState, config) && bestCostAndAllocation.cost !== 0) {
    console.log('iteration ', iteration);
    offsprings = cross(population, config.crossoverProbability);
    mutate(offsprings, config.mutationProbability, algorithmState);
    offsprings = offsprings.map((offspring: Solution) => ({
      allocation: offspring.allocation,
      cost: computeAllocationCost(graph, offspring.allocation),
    }));
    population.push(...offsprings);
    population = getAmountOfBestSolutions(population, config.startPopulationAmount);
    const newBestCostAndAllocation = getSolutionCostAndAllocation(population[0]);
    if (bestCostAndAllocation.cost <= newBestCostAndAllocation.cost) {
      algorithmState.noChangeGenerations += 1;
      console.log('current solution ', newBestCostAndAllocation.cost);
    } else {
      console.log('else current solution ', newBestCostAndAllocation);
      algorithmState.noChangeGenerations = 0;
      bestCostAndAllocation = newBestCostAndAllocation;
    }
    algorithmState.time = new Date().getTime() - startTime;
    iteration += 1;
  }
  console.log(bestCostAndAllocation);
};

const getAmountOfBestSolutions = (solutions: Solution[], amount: number): Solution[] => {
  return sortSolutions(solutions).slice(0, amount);
};

const getSolutionCostAndAllocation = (solutions: Solution) => {
  return {
    cost: solutions.cost,
    allocation: solutions.allocation,
  };
};

const shouldStop = (currentState: EvolutionAlgorithmState, config: EvolutionAlgorithmConfig) => {
  if (currentState.time / 1000 > config.maxTime) {
    return true;
  }

  if (currentState.mutationsCount > config.maxMutationsCount) {
    return true;
  }

  return currentState.noChangeGenerations > config.maxNoChangeGenerations;
};
