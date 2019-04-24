export interface Link {
  linkId: number;
  startNodeId: number;
  endNodeId: number;
  numberOfFiberPairsInCable: number;
  fiberPairCost: number;
  numberOfLambdasInFiber: number;
}
