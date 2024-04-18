import Parser from "./frontend/parser";
import { tokenize } from "./frontend/tokenize";

const source = await Bun.file("src/foo.txt").text();

const parser = new Parser();
const ast = parser.produceAST(source);

console.log(JSON.stringify(ast, null, 2));

// for (const token of tokenize(source)) {
//   console.log(JSON.stringify(token));
// }
