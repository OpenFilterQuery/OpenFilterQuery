import { getEnumFromValue } from "../util/getEnumFromValue";
import {
  BinaryLogicalOperator,
  EqualityCompareOperator,
  GreaterOrLesserCompareOperator,
  TokenType,
  UnaryLogicalOperator,
} from "../constant";
import { Token } from "./Token";

const tokenRegexRules: Array<{ type: TokenType; regex: RegExp }> = [
  {
    type: TokenType.UnaryLogicalOperator,
    regex: /^((NOT)|(not)|(Not))/,
  },
  {
    type: TokenType.BinaryLogicalOperator,
    regex: /^((AND)|(And)|(and)|(OR)|(Or)|(or))/,
  },
  {
    type: TokenType.BooleanLiteral,
    regex: /^((TRUE)|(true)|(FALSE)|(false))/,
  },
  {
    type: TokenType.DateLiteral,
    regex:
      /^"(\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?)"/,
  },
  {
    type: TokenType.StringLiteral,
    regex: /^"([^"]+)"/,
  },
  {
    type: TokenType.NumericLiteral,
    regex: /^([+-]?([0-9]*[.])?[0-9]+)/,
  },
  {
    type: TokenType.Identifier,
    regex: /^([a-zA-Z]+)/,
  },
  {
    type: TokenType.Comma,
    regex: /^([,])/,
  },
  {
    type: TokenType.OpenParenthesis,
    regex: /^([(])/,
  },
  {
    type: TokenType.CloseParenthesis,
    regex: /^([)])/,
  },

  {
    type: TokenType.EqualityCompareOperator,
    regex: /^((==)|(!=))/,
  },
  {
    type: TokenType.GreaterOrLesserCompareOperator,
    regex: /^((<=)|(<)|(>=)|(>))/,
  },
  {
    type: TokenType.EndOfQuery,
    regex: /^($)/,
  },
];

export interface TokenExtractResult {
  token: Token;
  nextRemainQuery: string;
}

export class TokenExtractor {
  extractToken(remainQuery: string): TokenExtractResult {
    remainQuery = remainQuery.trimStart();

    for (const tokenRegexRule of tokenRegexRules) {
      const type = tokenRegexRule.type;
      const regex = tokenRegexRule.regex;
      const matchResult = regex.exec(remainQuery);
      if (!matchResult) continue;

      const matchedText = matchResult[0];

      switch (type) {
        case TokenType.UnaryLogicalOperator: {
          const value = matchResult[0].toUpperCase();
          return {
            token: {
              type,
              value: getEnumFromValue(UnaryLogicalOperator, value),
            },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.BinaryLogicalOperator: {
          const value = matchResult[0].toUpperCase();
          return {
            token: {
              type,
              value: getEnumFromValue(BinaryLogicalOperator, value),
            },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.BooleanLiteral: {
          const value = matchResult[0];
          return {
            token: {
              type,
              value: value.toUpperCase() === "TRUE" ? true : false,
            },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.DateLiteral: {
          const value = matchResult[1];
          return {
            token: { type, value },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.StringLiteral: {
          const value = matchResult[1];
          return {
            token: { type, value },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.NumericLiteral: {
          const value = matchResult[0];
          return {
            token: { type, value: Number(value) },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.Identifier: {
          const value = matchResult[0];
          return {
            token: { type, value },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.Comma: {
          return {
            token: { type, value: null },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.OpenParenthesis: {
          return {
            token: { type, value: null },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.CloseParenthesis: {
          return {
            token: { type, value: null },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.EqualityCompareOperator: {
          const value = matchResult[0];
          return {
            token: {
              type,
              value: getEnumFromValue(EqualityCompareOperator, value),
            },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.GreaterOrLesserCompareOperator: {
          const value = matchResult[0];
          return {
            token: {
              type,
              value: getEnumFromValue(GreaterOrLesserCompareOperator, value),
            },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }

        case TokenType.EndOfQuery: {
          return {
            token: { type, value: null },
            nextRemainQuery: remainQuery.slice(matchedText.length),
          };
        }
      }
    }

    throw new Error(`Unexpected token [near] ${remainQuery.slice(0, 50)}`);
  }
}
