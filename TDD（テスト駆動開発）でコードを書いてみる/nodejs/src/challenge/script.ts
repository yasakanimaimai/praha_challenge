export const multiply = (...numbers: number[]): number => {
  return numbers.reduce((previousValue, currentValue) => previousValue * currentValue);
};

export const add = (...numbers: number[]): number => {
  return numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};

export const subtract = (...numbers: number[]): number => {
  return numbers.reduce((previousValue, currentValue) => previousValue - currentValue);
};

export const divide = (...numbers: number[]): number => {
  return numbers.reduce((previousValue, currentValue) => previousValue / currentValue);
};

for(var i = 0;i < process.argv.length; i++){
  console.log("argv[" + i + "] = " + process.argv[i]);
}