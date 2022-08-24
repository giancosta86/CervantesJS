import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import open, { Database } from "better-sqlite3";
import { getTableNameForTerm, SPANISH_SQLITE_SCHEMA } from "./schema";
import { createSpanishWritableBuilder } from "./writable";
import {
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
} from "../terms";

function createTestDb(): Database {
  const db = open(":memory:");

  db.exec(SPANISH_SQLITE_SCHEMA);

  return db;
}

async function expectTermToBeStoredOnDb<T extends SpanishTerm>(
  termToSave: T
): Promise<void> {
  const db = createTestDb();

  try {
    const spanishWritableBuilder = createSpanishWritableBuilder();

    const spanishWritable = spanishWritableBuilder.build(db);

    await pipeline(Readable.from([termToSave]), spanishWritable);

    const tableName = getTableNameForTerm(termToSave);

    const retrievedTerm = db.prepare(`SELECT * FROM ${tableName}`).get();

    const retrievedTermWithCamelCaseKeys = Object.fromEntries(
      Object.entries(retrievedTerm).map(([key, value]) => [
        toCamelCase(key),
        value
      ])
    );

    const actualTerm = {
      type: termToSave.type,
      ...retrievedTermWithCamelCaseKeys
    };

    expect(actualTerm).toEqual(termToSave);
  } finally {
    db.close();
  }
}

function toCamelCase(identifier: string): string {
  return identifier.replaceAll(
    /(\w)_(\w)/g,
    (_match, beforeUnderscore, afterUnderscore) =>
      `${beforeUnderscore}${afterUnderscore.toUpperCase()}`
  );
}

describe("The SQLite-based Spanish writable", () => {
  it("should store a conjunction", () =>
    expectTermToBeStoredOnDb<Conjunction>({
      type: "conjunction",
      entry: "test_conjunction",
      pronunciation: "c"
    }));

  it("should store a preposition", () =>
    expectTermToBeStoredOnDb<Preposition>({
      type: "preposition",
      entry: "test_preposition",
      pronunciation: "a"
    }));

  it("should store an interjection", () =>
    expectTermToBeStoredOnDb<Interjection>({
      type: "interjection",
      entry: "test_interjection",
      pronunciation: "b"
    }));

  it("should store an article", () =>
    expectTermToBeStoredOnDb<Article>({
      type: "article",
      entry: "test_article",
      pronunciation: "g",
      kind: "k4"
    }));

  it("should store an adjective", () =>
    expectTermToBeStoredOnDb<Adjective>({
      type: "adjective",
      entry: "test_adjective",
      pronunciation: "h",
      referenceEntry: "r1"
    }));

  it("should store a verb", () =>
    expectTermToBeStoredOnDb<Verb>({
      type: "verb",
      entry: "test_verb",
      pronunciation: "e",
      kind: "k2"
    }));

  it("should store a pronoun", () =>
    expectTermToBeStoredOnDb<Pronoun>({
      type: "pronoun",
      entry: "test_pronoun",
      pronunciation: "f",
      kind: "k3"
    }));

  it("should store an adverb", () =>
    expectTermToBeStoredOnDb<Adverb>({
      type: "adverb",
      entry: "test_adverb",
      pronunciation: "d",
      kind: "k1"
    }));

  it("should store a noun", () =>
    expectTermToBeStoredOnDb<Noun>({
      type: "noun",
      entry: "test_noun",
      pronunciation: "i",
      gender: "m",
      numberTrait: "p",
      referenceEntry: "r2"
    }));

  it("should store a verb form", () =>
    expectTermToBeStoredOnDb<VerbForm>({
      type: "verb_form",
      entry: "test_verb:form",
      pronunciation: "j",
      infinitive: "inf",
      mode: "mx",
      tense: "tx",
      person: "1s"
    }));
});
