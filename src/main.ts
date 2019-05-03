// import { List } from 'immutable';
import { solveUsingBruteforce } from './dap/brute-force/brute-force';
import { generateAllSolutions } from './dap/brute-force/solutions-generation';
import { parseFile } from './parser/parser';

const main = async () => {
  // const startArguments = List(process.argv.map(String)).skip(2);

  // if (startArguments.isEmpty()) {
  //   console.error('No file to read');
  //   process.exitCode = 1;x
  //
  //   return;
  // }

  try {
    // const graph = await parseFile(startArguments.get<string>(0, ''));
    const graph = await parseFile('/Users/grzegorz/Projects/oast-ea-bf/src/test-file.txt');
    const solutions = generateAllSolutions(graph);
    const bestSolution = solveUsingBruteforce(graph, solutions);
    console.log(bestSolution);
  } catch (e) {
    console.log(e);
  }
};

main();
