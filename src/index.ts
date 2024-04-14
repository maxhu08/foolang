export enum TokenType {
  Number,
  Identifir,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
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
      src[0] === "/"
    ) {
      tokens.push(token(TokenType.BinaryOperator, src.shift()));
    } else if (src[0] === "=") {
      tokens.push(token(TokenType.Equals, src.shift()));
    }
  }

  return tokens;
};
