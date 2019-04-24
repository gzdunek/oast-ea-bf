import { List } from 'immutable';
import { Path } from './path';

export interface Demand {
  startNodeId: number;
  endNodeId: number;
  volume: number;
  paths: List<Path>;
}
