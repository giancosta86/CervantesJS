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
    .withType<Preposition>(
      "preposition",
      `
        INSERT OR IGNORE INTO prepositions
        (entry, pronunciation)
        VALUES
        (?, ?)
      `,
      preposition => [preposition.entry, preposition.pronunciation]
    )
    .withType<Interjection>(
      "interjection",
      `
      INSERT OR IGNORE INTO interjections
      (entry, pronunciation)
      VALUES
      (?, ?)
      `,
      interjection => [interjection.entry, interjection.pronunciation]
    )
    .withType<Conjunction>(
      "conjunction",
      `
      INSERT OR IGNORE INTO conjunctions
      (entry, pronunciation)
      VALUES
      (?, ?)
      `,
      conjunction => [conjunction.entry, conjunction.pronunciation]
    )
    .withType<Adverb>(
      "adverb",
      `
      INSERT OR IGNORE INTO adverbs
      (entry, pronunciation, kind)
      VALUES
      (?, ?, ?)
      `,
      adverb => [adverb.entry, adverb.pronunciation, adverb.kind]
    )
    .withType<Verb>(
      "verb",
      `
      INSERT OR IGNORE INTO verbs
      (entry, pronunciation, kind)
      VALUES
      (?, ?, ?)
      `,
      verb => [verb.entry, verb.pronunciation, verb.kind]
    )
    .withType<Pronoun>(
      "pronoun",
      `
      INSERT OR IGNORE INTO pronouns
      (entry, pronunciation, kind)
      VALUES
      (?, ?, ?)
      `,
      pronoun => [pronoun.entry, pronoun.pronunciation, pronoun.kind]
    )
    .withType<Article>(
      "article",
      `
      INSERT OR IGNORE INTO articles
        (entry, pronunciation, kind)
        VALUES
        (?, ?, ?)
      `,
      article => [article.entry, article.pronunciation, article.kind]
    )
    .withType<Adjective>(
      "adjective",
      `
      INSERT OR IGNORE INTO adjectives
      (entry, pronunciation, reference_entry)
      VALUES
      (?, ?, ?)
      `,
      adjective => [
        adjective.entry,
        adjective.pronunciation,
        adjective.referenceEntry
      ]
    )
    .withType<Noun>(
      "noun",
      `
      INSERT OR IGNORE INTO nouns
      (entry, pronunciation, gender, number_trait, reference_entry)
      VALUES
      (?, ?, ?, ?, ?)
      `,
      noun => [
        noun.entry,
        noun.pronunciation,
        noun.gender,
        noun.numberTrait,
        noun.referenceEntry
      ]
    )
    .withType<VerbForm>(
      "verb_form",
      `
      INSERT OR IGNORE INTO verb_forms
      (entry, pronunciation, infinitive, mode, tense, person)
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
      verbForm => [
        verbForm.entry,
        verbForm.pronunciation,
        verbForm.infinitive,
        verbForm.mode,
        verbForm.tense,
        verbForm.person
      ]
    );
}
