import { TokenType } from "../constant";
import { Token } from "./Token";
import { TokenExtractor } from "./TokenExtractor";

export class Tokenizer {
  tokenize(query: string): Token[] {
    const tokenExtractor = new TokenExtractor();
    const tokens: Token[] = [];

    let remainQuery = query;
    while (true) {
      const extractResult = tokenExtractor.extractToken(remainQuery);
      const token = extractResult.token;
      tokens.push(token);
      remainQuery = extractResult.nextRemainQuery;
      if (token.type === TokenType.EndOfQuery) {
        break;
      }
    }
    return tokens;
  }
}
