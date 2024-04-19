import Parser from "./frontend/parser";
import { tokenize } from "./frontend/tokenize";
import { evaluate } from "./runtime/interpreter";

const source = await Bun.file("src/foo.txt").text();

const parser = new Parser();
const ast = parser.produceAST(source);

console.log("AST", JSON.stringify(ast, null, 2));

const result = evaluate(ast);
console.log("EVAL", result);

// for (const token of tokenize(source)) {
//   console.log(JSON.stringify(token));
// }
