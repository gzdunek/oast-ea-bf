// tslint:disable-next-line:typedef variable-name no-any
export function combineArrays(array_of_arrays: any) {
  const odometer = new Array(array_of_arrays.length);
  odometer.fill(0);

  const output = [];

  let newCombination = formCombination(odometer, array_of_arrays);

  output.push(newCombination);

  while (odometer_increment(odometer, array_of_arrays)) {
    newCombination = formCombination(odometer, array_of_arrays);
    output.push(newCombination);
  }

  return output;

  // tslint:disable-next-line:typedef no-shadowed-variable variable-name no-any
  function formCombination(odometer: any, array_of_arrays: any) {
    // tslint:disable-next-line:no-function-expression variable-name no-any
    return odometer.reduce(function(accumulator: any, odometer_value: any, odometer_index: any) {
      // tslint:disable-next-line:prefer-template
      accumulator.push(array_of_arrays[odometer_index][odometer_value]);

      return accumulator;
    }, []);
  }

  // @ts-ignore
  // tslint:disable-next-line:no-shadowed-variable typedef variable-name
  function odometer_increment(odometer, array_of_arrays) {
    // tslint:disable-next-line:variable-name no-increment-decrement
    for (let i_odometer_digit = odometer.length - 1; i_odometer_digit >= 0; i_odometer_digit--) {
      const maxee = array_of_arrays[i_odometer_digit].length - 1;

      if (odometer[i_odometer_digit] + 1 <= maxee) {
        // tslint:disable-next-line:no-increment-decrement
        odometer[i_odometer_digit]++;

        return true;
      } else {
        if (i_odometer_digit - 1 < 0) {
          return false;
        } else {
          odometer[i_odometer_digit] = 0;
          continue;
        }
      }
    }
  }
}
