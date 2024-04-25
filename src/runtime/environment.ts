import type { RuntimeValue } from "./values";

export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeValue>;

  constructor(parentENV?: Environment) {
    this.parent = parentENV;
    this.variables = new Map();
  }

  public declareVariable(varname: string, value: RuntimeValue): RuntimeValue {
    if (this.variables.has(varname)) {
      throw `Cannot redeclare existing variable: ${varname}`;
    }

    this.variables.set(varname, value);
    return value;
  }

  public assignVariable(varname: string, value: RuntimeValue): RuntimeValue {
    const env = this.resolve(varname);
    env.variables.set(varname, value);

    return value;
  }

  public lookupVariable(varname: string): RuntimeValue {
    const env = this.resolve(varname);

    return env.variables.get(varname) as RuntimeValue;
  }

  public resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }

    if (this.parent === undefined) {
      throw `Cannot resolve: '${varname}' as it does not exist`;
    }

    return this.parent.resolve(varname);
  }
}
