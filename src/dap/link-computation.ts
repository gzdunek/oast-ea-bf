import { List } from 'immutable';
import { Demand } from '../types/demand';
import { Graph } from '../types/graph';
import { Link } from '../types/link';
import { Path } from '../types/path';

export const computeLinkLoads = (graph: Graph): List<number> => {
  const linkLoads: List<number> = List();

  graph.demands.forEach((demand: Demand) => {
    demand.paths.forEach((path: Path) => {
      path.links.forEach((link: number) => {
        if (graph.links.some((graphLink: Link) => link === graphLink.linkId)) {
          // link
        }
      });
    });
  });
};

const computeLinkLoad = (numberOfLambdaPaths: number[], )
