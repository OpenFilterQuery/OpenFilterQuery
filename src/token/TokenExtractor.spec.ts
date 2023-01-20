import {
  TokenType,
  BinaryLogicalOperator,
  EqualityCompareOperator,
  GreaterOrLesserCompareOperator,
  UnaryLogicalOperator,
} from "../constant";
import { TokenExtractor, TokenExtractResult } from "./TokenExtractor";

describe("TokenExtractor", () => {
  const extractor = new TokenExtractor();

  describe("extractToken", () => {
    describe("UnaryLogicalOperator", () => {
      it("should extract unary logical operator represent to 'NOT'", () => {
        const query = `NOT title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.UnaryLogicalOperator,
            value: UnaryLogicalOperator.Not,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract unary logical operator represent to 'Not'", () => {
        const query = `Not title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.UnaryLogicalOperator,
            value: UnaryLogicalOperator.Not,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract unary logical operator represent to 'not'", () => {
        const query = `not title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.UnaryLogicalOperator,
            value: UnaryLogicalOperator.Not,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });
    });

    describe("BinaryLogicalOperator", () => {
      it("should extract binary logical operator represent to 'AND'", () => {
        const query = `AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.And,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract binary logical operator represent to 'And'", () => {
        const query = `And title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.And,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract binary logical operator represent to 'and'", () => {
        const query = `and title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.And,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract binary logical operator represent to 'OR'", () => {
        const query = `OR title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.Or,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract binary logical operator represent to 'Or'", () => {
        const query = `Or title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.Or,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });

      it("should extract binary logical operator represent to 'or'", () => {
        const query = `or title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BinaryLogicalOperator,
            value: BinaryLogicalOperator.Or,
          },
          nextRemainQuery: ` title == "Hello, World!"`,
        });
      });
    });

    describe("BooleanLiteral", () => {
      it("should extract boolean literal represent to 'TRUE'", () => {
        const query = `TRUE AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BooleanLiteral,
            value: true,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract boolean literal represent to 'true'", () => {
        const query = `true AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BooleanLiteral,
            value: true,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract boolean literal represent to 'FALSE'", () => {
        const query = `FALSE AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BooleanLiteral,
            value: false,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract boolean literal represent to 'false'", () => {
        const query = `false AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.BooleanLiteral,
            value: false,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });
    });

    describe("StringLiteral", () => {
      it("should extract string literal", () => {
        const query = `"Hello, World!")`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.StringLiteral,
            value: "Hello, World!",
          },
          nextRemainQuery: `)`,
        });
      });
    });

    describe("NumericLiteral", () => {
      it("should extract positive integer literal", () => {
        const query = `1234 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: 1234,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract positive integer literal with sign", () => {
        const query = `+1234 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: 1234,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract positive floating point number literal", () => {
        const query = `1234.5678 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: 1234.5678,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract positive floating point number literal with sign", () => {
        const query = `+1234.5678 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: 1234.5678,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract negative integer literal with sign", () => {
        const query = `-1234 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: -1234,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });

      it("should extract negative floating point number literal with sign", () => {
        const query = `-1234.5678 AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.NumericLiteral,
            value: -1234.5678,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });
    });

    describe("Identifier", () => {
      it("should extract function name identifier token", () => {
        const query = `Contains(title, "Hello, World!")`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.Identifier,
            value: "Contains",
          },
          nextRemainQuery: `(title, "Hello, World!")`,
        });
      });

      it("should extract field name identifier token", () => {
        const query = `title, "Hello, World!")`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.Identifier,
            value: "title",
          },
          nextRemainQuery: `, "Hello, World!")`,
        });
      });
    });

    describe("Comma", () => {
      it("should extract comma", () => {
        const query = `, "Hello, World!")`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.Comma,
            value: null,
          },
          nextRemainQuery: ` "Hello, World!")`,
        });
      });
    });

    describe("OpenParenthesis", () => {
      it("should extract open parenthesis", () => {
        const query = `(title, "Hello, World!")`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.OpenParenthesis,
            value: null,
          },
          nextRemainQuery: `title, "Hello, World!")`,
        });
      });
    });

    describe("CloseParenthesis", () => {
      it("should extract close parenthesis", () => {
        const query = `) AND title == "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.CloseParenthesis,
            value: null,
          },
          nextRemainQuery: ` AND title == "Hello, World!"`,
        });
      });
    });

    describe("EqualityCompareOperator", () => {
      it("should extract equality compare operator represent to '=='", () => {
        const query = `== "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.EqualityCompareOperator,
            value: EqualityCompareOperator.Equal,
          },
          nextRemainQuery: ` "Hello, World!"`,
        });
      });

      it("should extract equality compare operator represent to '!='", () => {
        const query = `!= "Hello, World!"`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.EqualityCompareOperator,
            value: EqualityCompareOperator.NotEqual,
          },
          nextRemainQuery: ` "Hello, World!"`,
        });
      });
    });

    describe("GreaterOrLesserCompareOperator", () => {
      it("should extract greater or lesser compare operator represent to '<'", () => {
        const query = `< 1234`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.GreaterOrLesserCompareOperator,
            value: GreaterOrLesserCompareOperator.LesserThan,
          },
          nextRemainQuery: ` 1234`,
        });
      });

      it("should extract greater or lesser compare operator represent to '<='", () => {
        const query = `<= 1234`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.GreaterOrLesserCompareOperator,
            value: GreaterOrLesserCompareOperator.LesserOrEqualThan,
          },
          nextRemainQuery: ` 1234`,
        });
      });

      it("should extract greater or lesser compare operator represent to '>'", () => {
        const query = `> 1234`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.GreaterOrLesserCompareOperator,
            value: GreaterOrLesserCompareOperator.GreaterThan,
          },
          nextRemainQuery: ` 1234`,
        });
      });

      it("should extract greater or lesser compare operator represent to '>='", () => {
        const query = `>= 1234`;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.GreaterOrLesserCompareOperator,
            value: GreaterOrLesserCompareOperator.GreaterOrEqualThan,
          },
          nextRemainQuery: ` 1234`,
        });
      });
    });

    describe("EndOfQuery", () => {
      it("should extract end of query", () => {
        const query = ``;
        const result = extractor.extractToken(query);
        expect(result).toEqual<TokenExtractResult>({
          token: {
            type: TokenType.EndOfQuery,
            value: null,
          },
          nextRemainQuery: ``,
        });
      });
    });
  });
});
