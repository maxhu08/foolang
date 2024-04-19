import { type RuntimeValue, type NumberValue, type NullValue } from "./values";
import {
  type Statement,
  type BinaryExpression,
  type NumericLiteral,
  type Program,
} from "../frontend/ast";

function evaluateProgram(program: Program): RuntimeValue {
  let lastEvaluated: RuntimeValue = {
    type: "tnull",
    value: "null",
  } as NullValue;

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}

function evaluateBinaryExpression(binop: BinaryExpression): RuntimeValue {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);

  if (lhs.type === "tnumber" && rhs.type === "tnumber") {
    return evaluateNumericBinaryExpression(
      lhs as NumberValue,
      rhs as NumberValue,
      binop.operator,
    );
  }

  return { type: "tnull", value: "null" } as NullValue;
}

function evaluateNumericBinaryExpression(
  lhs: NumberValue,
  rhs: NumberValue,
  operator: string,
) {
  let result = 0;

  if (operator === "+") {
    result = lhs.value + rhs.value;
  } else if (operator === "-") {
    result = lhs.value + rhs.value;
  } else if (operator === "*") {
    result = lhs.value * rhs.value;
  } else if (operator === "/") {
    // TODO add zero check
    result = lhs.value / rhs.value;
  } else if (operator === "%") {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "tnumber" } as NumberValue;
}

export function evaluate(astNode: Statement): RuntimeValue {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: (astNode as NumericLiteral).value,
        type: "tnumber",
      } as NumberValue;

    case "BinaryExpression":
      return evaluateBinaryExpression(astNode as BinaryExpression);

    case "Program":
      return evaluateProgram(astNode as Program);

    case "NullLiteral":
      return {
        value: "null",
        type: "tnull",
      } as NullValue;

    default:
      console.error(
        "this AST Node has not been setup for interpretation",
        astNode,
      );
      process.exit(0);
  }
}
