import { List } from 'immutable';
import { Demand } from '../types/demand';
import { Graph } from '../types/graph';
import { Link } from '../types/link';
import { Path } from '../types/path';

export const computeLinkLoads = (graph: Graph, singleSolution: number[][]): List<number> => {
  let linkLoads: List<number> = List();

  graph.demands.forEach((demand: Demand, demandId: number) => {
    demand.paths.forEach((path: Path, pathId: number) => {
      graph.links.forEach((link: Link) => {
        if (path.links.includes(link.linkId + 1)) {
          const newLinkLoad = linkLoads.get(link.linkId, 0) + singleSolution[demandId][pathId];
          linkLoads = linkLoads.set(link.linkId, newLinkLoad);
        }
      });
    });
  });

  return linkLoads;
};
