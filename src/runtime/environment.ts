import type { RuntimeValue } from "./values";

export default class Environment {
  private parent?: Environment;
  private variables?: Map<string, RuntimeValue>;

  constructor(parentENV?: Environment) {
    this.parent = parentENV;
    this.variables = new Map();
  }
}
