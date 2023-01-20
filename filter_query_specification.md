# Specification

## Token

- UnaryLogicalOperator : `NOT` | `Not` | `not`
- BinaryLogicalOperator : `AND` | `And` | `and` | `OR` | `Or` | `or`
- BooleanLiteral = `TRUE` | `true` | `FALSE` | `false`
- StringLiteral = `/"[^"]?+"/`
- NumericLiteral = `/[+-]?([0-9]*[.])?[0-9]+/`
- Identifier = `/[a-zA-Z]+/`
- Comma = `,`
- OpenParenthesis = `(`
- CloseParenthesis = `)`
- EqualityCompareOperator : `==` | `!=`
- GreaterOrLesserCompareOperator : `<=` | `<` | `>=` | `>`
- EndOfQuery : end of query

---

## Context-Free Grammar

- **query** ->

  - | ( **query** )
  - | **expression** _EndOfQuery_
  - | **expression** _BinaryLogicalOperator_ **query**

- **expression** ->

  - | ( **expression** )
  - | _UnaryLogicalOperator_ **expression**
  - | **term**
  - | **term** _BinaryLogicalOperator_ **expression**

- **term** ->

  - | ( **term** )
  - | _Identifier_ _EqualityCompareOperator_ _StringLiteral_
  - | _Identifier_ _EqualityCompareOperator_ _NumericLiteral_
  - | _Identifier_ _EqualityCompareOperator_ _BooleanLiteral_
  - | _Identifier_ _GreaterOrLesserCompareOperator_ _StringLiteral_
  - | _Identifier_ _GreaterOrLesserCompareOperator_ _NumericLiteral_
  - | _Identifier_ _GreaterOrLesserCompareOperator_ _BooleanLiteral_
  - | _Identifier_ ( **parameter** )

- **parameter** ->
  - | _StringLiteral_
  - | _NumericLiteral_
  - | _BooleanLiteral_
  - | _StringLiteral_ , **parameter**
  - | _NumericLiteral_ , **parameter**
  - | _BooleanLiteral_ , **parameter**
