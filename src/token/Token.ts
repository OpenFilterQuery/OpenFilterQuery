import {
  TokenType,
  UnaryLogicalOperator,
  BinaryLogicalOperator,
  EqualityCompareOperator,
  GreaterOrLesserCompareOperator,
} from "../constant";

export type Token =
  | UnaryLogicalOperatorToken
  | BinaryLogicalOperatorToken
  | BooleanLiteralToken
  | DateLiteralToken
  | StringLiteralToken
  | NumericLiteralToken
  | IdentifierToken
  | CommaToken
  | OpenParenthesisToken
  | CloseParenthesisToken
  | EqualityCompareOperatorToken
  | LargeOrSmallCompareOperatorToken
  | EndOfQueryToken;

interface IToken {
  type: TokenType;
  value: string | number | boolean | null;
}

export interface IdentifierToken extends IToken {
  type: TokenType.Identifier;
  value: string;
}

export interface StringLiteralToken extends IToken {
  type: TokenType.StringLiteral;
  value: string;
}

export interface NumericLiteralToken extends IToken {
  type: TokenType.NumericLiteral;
  value: number;
}

export interface DateLiteralToken extends IToken {
  type: TokenType.DateLiteral;
  value: string;
}

export interface BooleanLiteralToken extends IToken {
  type: TokenType.BooleanLiteral;
  value: boolean;
}

export interface CommaToken extends IToken {
  type: TokenType.Comma;
  value: null;
}

export interface OpenParenthesisToken extends IToken {
  type: TokenType.OpenParenthesis;
  value: null;
}

export interface CloseParenthesisToken extends IToken {
  type: TokenType.CloseParenthesis;
  value: null;
}

export interface UnaryLogicalOperatorToken extends IToken {
  type: TokenType.UnaryLogicalOperator;
  value: UnaryLogicalOperator;
}

export interface BinaryLogicalOperatorToken extends IToken {
  type: TokenType.BinaryLogicalOperator;
  value: BinaryLogicalOperator;
}

export interface EqualityCompareOperatorToken extends IToken {
  type: TokenType.EqualityCompareOperator;
  value: EqualityCompareOperator;
}

export interface LargeOrSmallCompareOperatorToken extends IToken {
  type: TokenType.GreaterOrLesserCompareOperator;
  value: GreaterOrLesserCompareOperator;
}

export interface EndOfQueryToken extends IToken {
  type: TokenType.EndOfQuery;
  value: null;
}
