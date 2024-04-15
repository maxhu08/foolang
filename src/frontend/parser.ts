import type {
  Statement,
  Program,
  Expression,
  BinaryExpression,
  NumericLiteral,
  Identifier,
} from "./ast";
import { tokenize, TokenType, type Token } from "./tokenize";

export default class Parser {
  private tokens: Token[] = [];

  private notAtEOF() {
    return this.tokens[0].type != TokenType.EOF;
  }

  private at() {
    return this.tokens[0] as Token;
  }

  private eat() {
    const prev = this.tokens.shift() as Token;

    return prev;
  }

  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);

    const program: Program = {
      kind: "Program",
      body: [],
    };

    // parse until EOF
    while (this.notAtEOF()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }

  private parseStatement(): Statement {
    // skip to parseExpression

    return this.parseExpression();
  }

  private parseExpression(): Expression {
    return this.parsePrimaryExpression();
  }

  private parsePrimaryExpression(): Expression {
    const tkType = this.at().type;

    switch (tkType) {
      case TokenType.Identifier:
        this.eat();
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;
      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;

      default:
        console.error("unexpected token found during parsing:", this.at());
        process.exit(1);
    }
  }
}
