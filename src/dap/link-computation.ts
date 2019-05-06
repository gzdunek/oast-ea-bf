import { List } from 'immutable';
import { Demand } from '../types/demand';
import { Graph } from '../types/graph';
import { Link } from '../types/link';
import { Path } from '../types/path';

const computeLinkLoads = (graph: Graph, allocation: Allocation): number[] => {
  let linkLoads: List<number> = List();

  graph.demands.forEach((demand: Demand, demandId: number) => {
    demand.paths.forEach((path: Path, pathId: number) => {
      graph.links.forEach((link: Link) => {
        if (path.links.includes(link.linkId + 1)) {
          const newLinkLoad = (linkLoads.get(link.linkId, 0) || 0) + allocation[demandId][pathId];
          linkLoads = linkLoads.set(link.linkId, newLinkLoad);
        }
      });
    });
  });

  return linkLoads.toArray();
};

export const computeAllocationCost = (graph: Graph, allocation: Allocation): number => {
  const linkLoads = computeLinkLoads(graph, allocation);
  const maxOverloads: number[] = [];

  linkLoads.forEach((linkLoad: number, linkIndex: number) => {
    // @ts-ignore
    const link: Link = graph.links.get(linkIndex);
    const y = linkLoad - link.numberOfLambdasInFiber * link.numberOfFiberPairsInCable;

    maxOverloads.push(Math.max(0, y));
  });

  return Math.max(...maxOverloads);
};