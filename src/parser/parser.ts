import { promises } from 'fs';
import { List } from 'immutable';
import * as os from 'os';
import { Demand } from '../types/demand';
import { Graph } from '../types/graph';
import { Link } from '../types/link';
import { Path } from '../types/path';

export const parseFile = async (path: string): Promise<Graph> => {
  const file = await promises.readFile(path, { encoding: 'utf-8' });

  return parseMp2k(file);
};

export const parseMp2k = (source: string): Graph => {
  const [linksSource, demandsSource] = source.split('-1');

  return { links: parseLinks(linksSource), demands: parseDemands(demandsSource) };
};

const parseLinks = (linksAsString: string): List<Link> => {
  const sourceByLine = List(linksAsString.split(os.EOL));

  return sourceByLine
    .filter((val: string) => val !== '')
    .skip(1)
    .map(parseLink);
};

const parseLink = (linkAsString: string, index: number): Link => {
  const linkSeparated = linkAsString.split(' ');

  return {
    linkId: index,
    startNodeId: parseInt(linkSeparated[0], 0),
    endNodeId: parseInt(linkSeparated[1], 0),
    numberOfFiberPairsInCable: parseInt(linkSeparated[2], 0),
    fiberPairCost: parseInt(linkSeparated[3], 0),
    numberOfLambdasInFiber: parseInt(linkSeparated[4], 0),
  };
};

const parseDemands = (demandsAsString: string): List<Demand> => {
  const demandsSeparated = List(demandsAsString.split(`${os.EOL}${os.EOL}`));

  return demandsSeparated
    .filter((val: string) => val !== '')
    .skip(1)
    .map(parseDemand);
};

const parseDemand = (demandAsString: string): Demand => {
  const lines = List(demandAsString.split(os.EOL));
  const lineSeparated = lines.get(0, '').split(' ');

  return {
    startNodeId: parseInt(lineSeparated[0], 0),
    endNodeId: parseInt(lineSeparated[1], 0),
    volume: parseInt(lineSeparated[2], 0),
    paths: lines
      .skip(2)
      .filter((val: string) => val.length > 0)
      .map(
        (line: string): Path => {
          const linePath = List(line.split(' '));

          return {
            id: parseInt(linePath.get(0, ''), 0),
            links: linePath.skip(1).map((val: string) => parseInt(val, 0)),
          };
        },
      ),
  };
};
