export type SpanishTerm =
  | Conjunction
  | Preposition
  | Interjection
  | Article
  | Adjective
  | Verb
  | Pronoun
  | Adverb
  | Noun
  | VerbForm;

type SpanishTermBase = Readonly<{
  entry: string;
  pronunciation?: string;
}>;

export type Conjunction = Readonly<
  SpanishTermBase & {
    type: "conjunction";
  }
>;

export type Preposition = Readonly<
  SpanishTermBase & {
    type: "preposition";
  }
>;

export type Interjection = Readonly<
  SpanishTermBase & {
    type: "interjection";
  }
>;

export type Article = Readonly<
  SpanishTermBase & {
    type: "article";
    kind?: string;
  }
>;

export type Adjective = Readonly<
  SpanishTermBase & {
    type: "adjective";
    referenceEntry?: string;
  }
>;

export type Verb = Readonly<
  SpanishTermBase & {
    type: "verb";
    kind?: string;
  }
>;

export type Pronoun = Readonly<
  SpanishTermBase & {
    type: "pronoun";
    kind?: string;
  }
>;

export type Adverb = Readonly<
  SpanishTermBase & {
    type: "adverb";
    kind?: string;
  }
>;

export type Noun = Readonly<
  SpanishTermBase & {
    type: "noun";
    gender: string;
    referenceEntry?: string;
    numberTrait?: string;
  }
>;

export type VerbForm = Readonly<
  SpanishTermBase & {
    type: "verb_form";
    infinitive: string;
    mode: string;
    tense?: string;
    person?: string;
  }
>;
