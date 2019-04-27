// import { List } from 'immutable';
import { solveUsingBruteForce } from './dap/brute-force/brute-force';
import { parseFile } from './parser/parser';

const main = async () => {
  // const startArguments = List(process.argv.map(String)).skip(2);

  // if (startArguments.isEmpty()) {
  //   console.error('No file to read');
  //   process.exitCode = 1;
  //
  //   return;
  // }

  try {
    // const parsedFile = await parseFile(startArguments.get<string>(0, ''));
    const parsedFile = await parseFile('/Users/grzegorz/Projects/oast-ea-bf/src/test-file.txt');
    const solutions = solveUsingBruteForce(parsedFile);
    console.log(solutions[0]);
    console.log(solutions.length);
  } catch (e) {
    console.log(e);
  }
};

main();
