import { List } from 'immutable';
import { Demand } from '../../types/demand';
import { Graph } from '../../types/graph';
import { combineArrays } from './combine-arrays';

const generateSolutionsForColumn = (demand: Demand): List<List<number>> => {
  let allDemandColumnCombinations: List<List<number>> = List();
  const generateDemandColumn = (demandVolume: number, demandColumn: List<number>, pathIndex: number): List<List<number>> => {
    for (let demandDistributionPerPath = 0; demandDistributionPerPath <= demandVolume; demandDistributionPerPath = demandDistributionPerPath + 1) {
      const updatedDemandColumn = demandColumn.set(pathIndex, demandDistributionPerPath);
      if (pathIndex < demand.paths.size - 1) {
        generateDemandColumn(demandVolume - demandDistributionPerPath, updatedDemandColumn, pathIndex + 1);
      }
      if (pathIndex === demand.paths.size - 1) {
        allDemandColumnCombinations = allDemandColumnCombinations.push(updatedDemandColumn);
      }
    }

    return allDemandColumnCombinations.filter((columnValues: List<number>) => getSum(columnValues) === demand.volume);
  };

  return generateDemandColumn(demand.volume, List(), 0);
};

const getSum = (demandColumn: List<number>): number => demandColumn.reduce((reduction: number, value: number) => reduction + value, 0);

// const linkCapacity = link.numberOfFiberPairsInCable * link.numberOfLambdasInFiber;

export const solveUsingBruteForce = (graph: Graph): [][] => {
  const solutionsForColumnsPerDemands: List<number>[][] = graph.demands
    .map(generateSolutionsForColumn)
    .map((el: List<List<number>>) => el.toArray())
    .toArray();

  return combineArrays(solutionsForColumnsPerDemands);
};
