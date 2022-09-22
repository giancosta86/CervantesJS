import { getTableNameForTerm, SPANISH_SQLITE_SCHEMA } from "./schema";
import { createSpanishWritableBuilder } from "./writable";
import { SpanishTerm } from "../terms";
import { testSqliteWritable } from "@giancosta86/jardinero-sdk";

testSqliteWritable<SpanishTerm>({
  dbSchema: SPANISH_SQLITE_SCHEMA,
  getTableNameForTerm,
  createSqliteWritableBuilder: createSpanishWritableBuilder,
  terms: [
    {
      type: "conjunction",
      entry: "test_conjunction",
      pronunciation: "c"
    },

    {
      type: "preposition",
      entry: "test_preposition",
      pronunciation: "a"
    },

    {
      type: "interjection",
      entry: "test_interjection",
      pronunciation: "b"
    },

    {
      type: "article",
      entry: "test_article",
      pronunciation: "g",
      kind: "k4"
    },

    {
      type: "adjective",
      entry: "test_adjective",
      pronunciation: "h",
      referenceEntry: "r1"
    },

    {
      type: "verb",
      entry: "test_verb",
      pronunciation: "e",
      kind: "k2"
    },

    {
      type: "pronoun",
      entry: "test_pronoun",
      pronunciation: "f",
      kind: "k3"
    },

    {
      type: "adverb",
      entry: "test_adverb",
      pronunciation: "d",
      kind: "k1"
    },

    {
      type: "noun",
      entry: "test_noun",
      pronunciation: "i",
      gender: "m",
      numberTrait: "p",
      referenceEntry: "r2"
    },

    {
      type: "verb_form",
      entry: "test_verb:form",
      pronunciation: "j",
      infinitive: "inf",
      mood: "mx",
      tense: "tx",
      person: "1s"
    }
  ]
});
