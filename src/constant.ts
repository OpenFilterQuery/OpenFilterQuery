export enum TokenType {
  UnaryLogicalOperator = "UnaryLogicalOperator",
  BinaryLogicalOperator = "BinaryLogicalOperator",
  BooleanLiteral = "BooleanLiteral",
  StringLiteral = "StringLiteral",
  NumericLiteral = "NumericLiteral",
  Identifier = "Identifier",
  Comma = "Comma",
  OpenParenthesis = "OpenParenthesis",
  CloseParenthesis = "CloseParenthesis",
  EqualityCompareOperator = "EqualityCompareOperator",
  GreaterOrLesserCompareOperator = "GreaterOrLesserCompareOperator",
  EndOfQuery = "EedOfQuery",
}

export enum UnaryLogicalOperator {
  Not = "NOT",
}

export enum BinaryLogicalOperator {
  And = "AND",
  Or = "OR",
}

export enum EqualityCompareOperator {
  Equal = "==",
  NotEqual = "!=",
}

export enum GreaterOrLesserCompareOperator {
  GreaterThan = ">",
  GreaterOrEqualThan = ">=",
  LesserThan = "<",
  LesserOrEqualThan = "<=",
}
