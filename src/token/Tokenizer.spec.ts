import {
  TokenType,
  BinaryLogicalOperator,
  EqualityCompareOperator,
  GreaterOrLesserCompareOperator,
  UnaryLogicalOperator,
} from "../constant";
import { Token } from "./Token";
import { Tokenizer } from "./Tokenizer";

describe("Tokenizer", () => {
  const tokenizer = new Tokenizer();

  describe("tokenize", () => {
    it(`should tokenize empty query`, () => {
      const query = ``;
      const tokens = tokenizer.tokenize(query);

      expect(tokens).toEqual<Token[]>([
        {
          type: TokenType.EndOfQuery,
          value: null,
        },
      ]);
    });

    it(`should tokenize simple compare query`, () => {
      const query = `fieldA == "A" AND fieldB != TRUE OR NOT (fieldC < "2023-01-23")`;
      const tokens = tokenizer.tokenize(query);

      expect(tokens).toEqual<Token[]>([
        {
          type: TokenType.Identifier,
          value: "fieldA",
        },
        {
          type: TokenType.EqualityCompareOperator,
          value: EqualityCompareOperator.Equal,
        },
        {
          type: TokenType.StringLiteral,
          value: "A",
        },
        {
          type: TokenType.BinaryLogicalOperator,
          value: BinaryLogicalOperator.And,
        },
        {
          type: TokenType.Identifier,
          value: "fieldB",
        },
        {
          type: TokenType.EqualityCompareOperator,
          value: EqualityCompareOperator.NotEqual,
        },
        {
          type: TokenType.BooleanLiteral,
          value: true,
        },
        {
          type: TokenType.BinaryLogicalOperator,
          value: BinaryLogicalOperator.Or,
        },
        {
          type: TokenType.UnaryLogicalOperator,
          value: UnaryLogicalOperator.Not,
        },
        {
          type: TokenType.OpenParenthesis,
          value: null,
        },
        {
          type: TokenType.Identifier,
          value: "fieldC",
        },
        {
          type: TokenType.GreaterOrLesserCompareOperator,
          value: GreaterOrLesserCompareOperator.LesserThan,
        },
        {
          type: TokenType.StringLiteral,
          value: "2023-01-23",
        },
        {
          type: TokenType.CloseParenthesis,
          value: null,
        },
        {
          type: TokenType.EndOfQuery,
          value: null,
        },
      ]);
    });

    it(`should tokenize function call query`, () => {
      const query = `IsEmpty(deletedAt) AND Contains(title, "Hello, World!") OR Collapse(alias, description, "defaultAlias")`;
      const tokens = tokenizer.tokenize(query);

      expect(tokens).toEqual<Token[]>([
        {
          type: TokenType.Identifier,
          value: "IsEmpty",
        },
        {
          type: TokenType.OpenParenthesis,
          value: null,
        },
        {
          type: TokenType.Identifier,
          value: "deletedAt",
        },
        {
          type: TokenType.CloseParenthesis,
          value: null,
        },
        {
          type: TokenType.BinaryLogicalOperator,
          value: BinaryLogicalOperator.And,
        },
        {
          type: TokenType.Identifier,
          value: "Contains",
        },
        {
          type: TokenType.OpenParenthesis,
          value: null,
        },
        {
          type: TokenType.Identifier,
          value: "title",
        },
        {
          type: TokenType.Comma,
          value: null,
        },
        {
          type: TokenType.StringLiteral,
          value: "Hello, World!",
        },
        {
          type: TokenType.CloseParenthesis,
          value: null,
        },
        {
          type: TokenType.BinaryLogicalOperator,
          value: BinaryLogicalOperator.Or,
        },
        {
          type: TokenType.Identifier,
          value: "Collapse",
        },
        {
          type: TokenType.OpenParenthesis,
          value: null,
        },
        {
          type: TokenType.Identifier,
          value: "alias",
        },
        {
          type: TokenType.Comma,
          value: null,
        },
        {
          type: TokenType.Identifier,
          value: "description",
        },
        {
          type: TokenType.Comma,
          value: null,
        },
        {
          type: TokenType.StringLiteral,
          value: "defaultAlias",
        },
        {
          type: TokenType.CloseParenthesis,
          value: null,
        },
        {
          type: TokenType.EndOfQuery,
          value: null,
        },
      ]);
    });
  });
});
