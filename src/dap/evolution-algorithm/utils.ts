import { Solution } from '../../types/solution';

export const sortSolutions = (solutions: Solution[]): Solution[] => {
  return [...solutions].sort((a: Solution, b: Solution) => a.cost - b.cost);
};
