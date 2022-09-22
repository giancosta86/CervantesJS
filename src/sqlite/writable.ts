import { SqliteWritableBuilder } from "@giancosta86/sqlite-writable";
import {
  Adjective,
  Adverb,
  Article,
  Conjunction,
  Interjection,
  Noun,
  Preposition,
  Pronoun,
  Verb,
  VerbForm
} from "../terms";

export function createSpanishWritableBuilder(): SqliteWritableBuilder {
  return new SqliteWritableBuilder()
    .withMaxObjectsInTransaction(45000)
    .withSafeType<Preposition>(
      "preposition",
      "prepositions",
      ["entry", "pronunciation"],
      preposition => [preposition.entry, preposition.pronunciation]
    )
    .withSafeType<Interjection>(
      "interjection",
      "interjections",
      ["entry", "pronunciation"],
      interjection => [interjection.entry, interjection.pronunciation]
    )
    .withSafeType<Conjunction>(
      "conjunction",
      "conjunctions",
      ["entry", "pronunciation"],
      conjunction => [conjunction.entry, conjunction.pronunciation]
    )
    .withSafeType<Adverb>(
      "adverb",
      "adverbs",
      ["entry", "pronunciation", "kind"],
      adverb => [adverb.entry, adverb.pronunciation, adverb.kind]
    )
    .withSafeType<Verb>(
      "verb",
      "verbs",
      ["entry", "pronunciation", "kind"],
      verb => [verb.entry, verb.pronunciation, verb.kind]
    )
    .withSafeType<Pronoun>(
      "pronoun",
      "pronouns",
      ["entry", "pronunciation", "kind"],
      pronoun => [pronoun.entry, pronoun.pronunciation, pronoun.kind]
    )
    .withSafeType<Article>(
      "article",
      "articles",
      ["entry", "pronunciation", "kind"],
      article => [article.entry, article.pronunciation, article.kind]
    )
    .withSafeType<Adjective>(
      "adjective",
      "adjectives",
      ["entry", "pronunciation", "reference_entry"],
      adjective => [
        adjective.entry,
        adjective.pronunciation,
        adjective.referenceEntry
      ]
    )
    .withSafeType<Noun>(
      "noun",
      "nouns",
      ["entry", "pronunciation", "gender", "number_trait", "reference_entry"],
      noun => [
        noun.entry,
        noun.pronunciation,
        noun.gender,
        noun.numberTrait,
        noun.referenceEntry
      ]
    )
    .withSafeType<VerbForm>(
      "verb_form",
      "verb_forms",
      ["entry", "pronunciation", "infinitive", "mood", "tense", "person"],
      verbForm => [
        verbForm.entry,
        verbForm.pronunciation,
        verbForm.infinitive,
        verbForm.mood,
        verbForm.tense,
        verbForm.person
      ]
    );
}
