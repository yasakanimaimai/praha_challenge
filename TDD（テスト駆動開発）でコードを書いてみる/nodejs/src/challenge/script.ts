import { Command } from "commander";

import { fourArithmeticOperations } from "./modules/fourArithmeticOperations";
import add from "./modules/add";
import divide from "./modules/divide";
import multiply from "./modules/multiply";
import subtract from "./modules/subtract";

function main() {
  const program = new Command();
  program.parse(process.argv);

  const executor = new fourArithmeticOperations({
    add,
    multiply,
    subtract,
    divide
  });
  
  const operatorName = program.args[0];
  const numbers = program.args.slice(1).map(str => parseInt(str, 10));
  const result = executor.exec(operatorName, ...numbers);

  console.log('result: ' + result);
}

main();