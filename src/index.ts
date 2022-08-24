import { SpanishPlugin } from "./plugin";

export {
  Adjective,
  Adverb,
  Article,
  Conjunction,
  Interjection,
  Noun,
  Preposition,
  Pronoun,
  SpanishTerm,
  Verb,
  VerbForm
} from "./terms";

export { extractTerms, SpanishTransform } from "./extraction";

export {
  SPANISH_SQLITE_SCHEMA,
  getTableNameForTerm,
  createSpanishWritableBuilder
} from "./sqlite";

export default SpanishPlugin;
