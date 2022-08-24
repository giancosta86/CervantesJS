import { SpanishTerm } from "../terms";

export function getTableNameForTerm(term: SpanishTerm): string {
  return term.type + "s";
}

export const SPANISH_SQLITE_SCHEMA = `

CREATE TABLE conjunctions (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    PRIMARY KEY (entry)
);

CREATE TABLE prepositions (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    PRIMARY KEY (entry)
);

CREATE TABLE interjections (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    PRIMARY KEY (entry)
);

CREATE TABLE articles (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    kind TEXT,
    PRIMARY KEY (entry, kind)
);

CREATE TABLE adjectives (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    reference_entry TEXT,
    PRIMARY KEY (entry, reference_entry)
);

CREATE TABLE verbs (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    kind TEXT,
    PRIMARY KEY (entry, kind)
);

CREATE TABLE pronouns (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    kind TEXT,
    PRIMARY KEY (entry, kind)
);

CREATE TABLE adverbs (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    kind TEXT,
    PRIMARY KEY (entry, kind)
);

CREATE TABLE nouns (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    gender TEXT NOT NULL,
    number_trait TEXT,
    reference_entry TEXT,
    PRIMARY KEY (entry, gender, reference_entry)
);

CREATE TABLE verb_forms (
    entry TEXT NOT NULL,
    pronunciation TEXT,
    infinitive TEXT NOT NULL,
    mode TEXT NOT NULL,
    tense TEXT,
    person TEXT,
    PRIMARY KEY (entry, infinitive, mode, tense, person)
);
`;
