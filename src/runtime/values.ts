export type ValueType = "tnull" | "tnumber";

export interface RuntimeValue {
  type: ValueType;
}

export interface NullValue extends RuntimeValue {
  type: "tnull";
  value: "null";
}

export interface NumberValue extends RuntimeValue {
  type: "tnumber";
  value: number;
}
