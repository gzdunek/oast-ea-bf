import * as math from 'mathjs';
import { EvolutionAlgorithmState } from '../../types/evolution-algorithm-state';
import { Solution } from '../../types/solution';

export const mutate = (population: Solution[], mutationProbability: number, state: EvolutionAlgorithmState) => {
  population.forEach((solution: Solution) => {
    if (canMutate(mutationProbability)) {
      for (const demand of solution.allocation) {
        const pathsCount = demand.length;
        if (pathsCount > 1) {
          const take = math.randomInt(0, pathsCount);
          let give = math.randomInt(0, pathsCount);
          while (take === give) {
            give = math.randomInt(0, pathsCount);
          }
          if (demand[take] > 0) {
            demand[take] -= 1;
            demand[give] += 1;
          }
        }
        state.mutationsCount += 1;
      }
    }
  });
};

const canMutate = (mutationProbability: number): boolean => {
  return math.random(0, 1) < mutationProbability;
};
