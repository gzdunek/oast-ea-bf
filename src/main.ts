// import { List } from 'immutable';
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
    console.log(parsedFile.demands.toJS());
  } catch (e) {
    console.log(e);
  }
};

main();
