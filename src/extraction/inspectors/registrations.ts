import { registerPartialTermOnlyInspector, registerInspector } from "./core";

export function registerInspectors(): void {
  registerPartialTermOnlyInspector("conjunction");

  registerPartialTermOnlyInspector("preposition");

  registerPartialTermOnlyInspector("interjection");

  registerInspector("article", (partialTerm, potentialMatch) => ({
    type: "article",
    entry: partialTerm.entry,
    pronunciation: partialTerm.pronunciation,
    kind: potentialMatch.groups?.["kind"]
  }));

  registerInspector("adjective", (partialTerm, potentialMatch) => ({
    type: "adjective",
    entry: partialTerm.entry,
    pronunciation: partialTerm.pronunciation,
    referenceEntry: potentialMatch.groups?.["reference_entry"]
  }));

  registerInspector("verb", (partialTerm, potentialMatch) => ({
    type: "verb",
    entry: partialTerm.entry,
    pronunciation: partialTerm.pronunciation,
    kind: potentialMatch.groups?.["kind"]
  }));

  registerInspector("pronoun", (partialTerm, potentialMatch) => {
    const kind =
      potentialMatch.groups?.["kind_1"] ||
      potentialMatch.groups?.["kind_2"] ||
      potentialMatch.groups?.["kind_3"];

    return {
      type: "pronoun",
      entry: partialTerm.entry,
      pronunciation: partialTerm.pronunciation,
      kind
    };
  });

  const NON_ADVERB_KINDS = ["adjetivo", "sustantivo"];

  registerInspector("adverb", (partialTerm, potentialMatch) => {
    const kind = potentialMatch.groups?.["kind"];

    if (kind && NON_ADVERB_KINDS.includes(kind)) {
      return null;
    }

    return {
      type: "adverb",
      entry: partialTerm.entry,
      pronunciation: partialTerm.pronunciation,
      kind
    };
  });

  registerInspector(
    "noun",

    (partialTerm, potentialMatch) => {
      const gender =
        potentialMatch.groups?.["gender_1"] ||
        potentialMatch.groups?.["gender_2"];

      if (!gender) {
        return null;
      }

      return {
        type: "noun",
        entry: partialTerm.entry,
        pronunciation: partialTerm.pronunciation,
        gender,
        referenceEntry: potentialMatch.groups?.["singular_form"],
        numberTrait: potentialMatch.groups?.["number_trait"]
      };
    },

    "s"
  );

  registerInspector("impersonalVerbForm", (partialTerm, potentialMatch) => {
    const infinitive = potentialMatch.groups?.["infinitive"];
    const mood = potentialMatch.groups?.["mood"];

    if (!infinitive || !mood) {
      return null;
    }

    return {
      type: "verb_form",
      entry: partialTerm.entry,
      pronunciation: partialTerm.pronunciation,
      infinitive,
      mood
    };
  });

  registerInspector("personalVerbForm", (partialTerm, potentialMatch) => {
    const infinitive = potentialMatch.groups?.["infinitive"];
    const mood = potentialMatch.groups?.["mood"];
    const tense = potentialMatch.groups?.["tense"];

    if (!infinitive || !tense) {
      return null;
    }

    const [actualMood, actualTense] =
      tense?.startsWith("imperat") || tense?.startsWith("condi")
        ? [tense, undefined]
        : [mood, tense];

    if (!actualMood) {
      return null;
    }

    return {
      type: "verb_form",
      entry: partialTerm.entry,
      pronunciation: partialTerm.pronunciation,
      infinitive,
      mood: actualMood,
      tense: actualTense,
      person: potentialMatch.groups?.["person"]
    };
  });
}
