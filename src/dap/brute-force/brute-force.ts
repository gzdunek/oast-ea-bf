import { List } from 'immutable';
import { Demand } from '../../types/demand';
import { Graph } from '../../types/graph';
import { Link } from '../../types/link';

export const solveUsingBruteForce = (graph: Graph) => {
  const objectiveFunctionValue: number = Number.MAX_SAFE_INTEGER;
};

const generateLambdaPathsNumberPerDemand = (demand: Demand) => {
  const link: Link;

  const generateX = (demandVolume: number, numberOfLambdasPerPath: List<number>, pathIndex: number) => {
    for (let numberOfLambdas = 0; numberOfLambdas <= demandVolume; numberOfLambdas = numberOfLambdas + 1) {
      if (pathIndex < demand.paths.size) {
        const updatedNumberOfLambdasPerPath = numberOfLambdasPerPath.set(pathIndex, numberOfLambdas);
        generateX(demandVolume - numberOfLambdas, updatedNumberOfLambdasPerPath, pathIndex + 1);
      } else {
        demand.path;
        const linkCapacity = link.numberOfFiberPairsInCable * link.numberOfLambdasInFiber;
        // const linkSize =
      }
    }
  };

  generateX(demand.volume, List(), 0);
};
