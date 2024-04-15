import { tokenize } from "./utils/tokenize";

const source = await Bun.file("src/foo.txt").text();

for (const token of tokenize(source)) {
  console.log(JSON.stringify(token));
}
