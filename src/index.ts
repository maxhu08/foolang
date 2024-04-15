import Parser from "./frontend/parser";

const source = await Bun.file("src/foo.txt").text();

const parser = new Parser();
const ast = parser.produceAST(source);
console.log(ast);

// for (const token of tokenize(source)) {
//   console.log(JSON.stringify(token));
// }
