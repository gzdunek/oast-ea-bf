import { List } from 'immutable';
import { Demand } from './demand';
import { Link } from './link';

export interface Graph {
  demands: List<Demand>;
  links: List<Link>
}
