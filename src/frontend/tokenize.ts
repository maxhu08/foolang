import { isAlphabetic, isNumber, isWhitespace } from "./is";

export enum TokenType {
  Null,
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
  EOF,
}

export interface Token {
  value: string;
  type: TokenType;
}

export const token = (type: TokenType, value: string = ""): Token => {
  return {
    type,
    value,
  };
};

export const tokenize = (source: string): Token[] => {
  const KEYWORDS: Record<string, TokenType> = {
    let: TokenType.Let,
    null: TokenType.Null,
  };

  const tokens: Token[] = [];

  const src = source.split("");

  // build each token
  while (src.length > 0) {
    if (src[0] === "(") {
      tokens.push(token(TokenType.OpenParen, src.shift()));
    } else if (src[0] === ")") {
      tokens.push(token(TokenType.CloseParen, src.shift()));
    } else if (
      src[0] === "+" ||
      src[0] === "-" ||
      src[0] === "*" ||
      src[0] === "/" ||
      src[0] === "%"
    ) {
      tokens.push(token(TokenType.BinaryOperator, src.shift()));
    } else if (src[0] === "=") {
      tokens.push(token(TokenType.Equals, src.shift()));
    } else {
      // multi character tokens

      // number token
      if (isNumber(src[0])) {
        let num = "";

        while (src.length > 0 && isNumber(src[0])) {
          num += src.shift();
        }

        tokens.push(token(TokenType.Number, num));
      } else if (isAlphabetic(src[0])) {
        // identifier token

        let identifier = "";

        while (src.length > 0 && isAlphabetic(src[0])) {
          identifier += src.shift();
        }

        // check for reserved KEYWORDS
        const reserved = KEYWORDS[identifier];

        if (typeof reserved === "number") {
          tokens.push(token(TokenType.Identifier, identifier));
        } else {
          // keywords
          tokens.push(token(reserved, identifier));
        }
      } else if (isWhitespace(src[0])) {
        src.shift();
      } else {
        console.log("Unrecognized character found in source:", src[0]);
        process.exit(1);
      }
    }
  }

  tokens.push(token(TokenType.EOF, "eof"));

  return tokens;
};
