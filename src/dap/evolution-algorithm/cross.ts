import * as math from 'mathjs';
import { Solution } from '../../types/solution';

export const cross = (population: Solution[], crossoverProbability: number): Solution[] => {
  const newPopulation: Solution[] = [];
  const parentCount = Math.floor(population.length / 2);
  const parents = shuffleArray(population);
  for (let i = 0; i < parentCount * 2; i += 2) {
    if (math.random(0, 1) < crossoverProbability) {
      const offsprings: Allocation[] = [[], []];
      for (let j = 0; j < population[0].allocation.length; j += 1) {
        if (math.random(0, 1) < 0.5) {
          offsprings[0].push(parents[i + 1].allocation[j]);
          offsprings[1].push(parents[i].allocation[j]);
        } else {
          offsprings[0].push(parents[i].allocation[j]);
          offsprings[1].push(parents[i + 1].allocation[j]);
        }
      }
      newPopulation.push({ allocation: offsprings[0], cost: Number.MAX_SAFE_INTEGER });
      newPopulation.push({ allocation: offsprings[1], cost: Number.MAX_SAFE_INTEGER });
    }
  }

  return newPopulation;
};

const shuffleArray = <T extends {}>(arr: T[]): T[] => [...arr].sort(() => math.random(-0.5, 0.5));
