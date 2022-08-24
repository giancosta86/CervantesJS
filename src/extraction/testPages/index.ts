import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { WikiPage } from "@giancosta86/wiki-transform";
import { SpanishTerm } from "../../terms";

export async function loadTestPage(title: string): Promise<WikiPage> {
  const pagePath = join(__dirname, "data", `${title}.txt`);

  const text = await readFile(pagePath, "utf8");

  return {
    title,
    text
  };
}

export async function getAllPagesAndTerms(): Promise<
  [readonly WikiPage[], readonly SpanishTerm[]]
> {
  const pageTitles = [...expectedTermsByPageTitle.keys()];

  const pages = await Promise.all(pageTitles.map(loadTestPage));

  const expectedTerms = [...expectedTermsByPageTitle.values()].flat();

  return [pages, expectedTerms];
}

export const expectedTermsByPageTitle: ReadonlyMap<
  string,
  readonly SpanishTerm[]
> = new Map(
  Object.entries({
    body: [],

    también: [
      {
        type: "adverb",
        entry: "también",
        pronunciation: "tam'bjen",
        kind: "afirmación"
      }
    ],

    rápidamente: [
      {
        type: "adverb",
        entry: "rápidamente",
        pronunciation: "ˌra.pi.ða'men.te",
        kind: "modo"
      }
    ],

    abundadamente: [
      {
        type: "adverb",
        entry: "abundadamente",
        pronunciation: "a.βun̪'da.ða'men̪.te"
      }
    ],

    aunque: [
      {
        type: "conjunction",
        entry: "aunque",
        pronunciation: "'awŋ.ke"
      }
    ],

    ah: [
      {
        type: "interjection",
        entry: "ah",
        pronunciation: "a"
      }
    ],

    hacia: [
      {
        type: "preposition",
        entry: "hacia",
        pronunciation: "'a.sja"
      }
    ],

    vez: [
      {
        type: "noun",
        entry: "vez",
        pronunciation: "beθ",
        gender: "f"
      }
    ],

    veces: [
      {
        type: "noun",
        entry: "veces",
        pronunciation: "'be.ses",
        gender: "f",
        referenceEntry: "vez"
      },
      {
        type: "verb_form",
        entry: "veces",
        pronunciation: "'be.ses",
        infinitive: "vezar",
        mode: "subjuntivo",
        tense: "presente",
        person: "2s"
      }
    ],

    flor: [
      {
        type: "noun",
        entry: "flor",
        pronunciation: "floɾ",
        gender: "f"
      },
      {
        type: "interjection",
        entry: "flor",
        pronunciation: "floɾ"
      }
    ],

    flores: [
      {
        type: "noun",
        entry: "flores",
        pronunciation: "'flo.ɾes",
        gender: "f",
        referenceEntry: "flor"
      },
      {
        type: "verb_form",
        entry: "flores",
        pronunciation: "'flo.ɾes",
        infinitive: "florar",
        mode: "subj",
        tense: "pres",
        person: "2s"
      }
    ],

    modo: [
      {
        type: "noun",
        entry: "modo",
        pronunciation: "'mo.ðo",
        gender: "m"
      }
    ],

    modos: [
      {
        type: "noun",
        entry: "modos",
        pronunciation: "'mo.ðos",
        gender: "m",
        referenceEntry: "modo"
      }
    ],

    tijeras: [
      {
        type: "noun",
        entry: "tijeras",
        pronunciation: "ti'xe.ɾas",
        gender: "f",
        numberTrait: "p"
      }
    ],

    tórax: [
      {
        type: "noun",
        entry: "tórax",
        pronunciation: "'to.ɾaks",
        gender: "m",
        numberTrait: "i"
      }
    ],

    "pronombre personal": [
      {
        type: "noun",
        entry: "pronombre personal",
        pronunciation: "pɾo'nom.bɾe peɾ.so'nal",
        gender: "m"
      }
    ],

    totora: [
      {
        type: "noun",
        entry: "totora",
        pronunciation: "to.'to.ɾa",
        gender: "f"
      }
    ],

    naranja: [
      {
        type: "noun",
        entry: "naranja",
        pronunciation: "na'ɾaŋ.xa",
        gender: "m",

        numberTrait: "s"
      },
      {
        type: "noun",
        entry: "naranja",
        pronunciation: "na'ɾaŋ.xa",
        gender: "f"
      },
      {
        type: "adjective",
        entry: "naranja",
        pronunciation: "na'ɾaŋ.xa"
      },
      {
        type: "pronoun",
        entry: "naranja",
        pronunciation: "na'ɾaŋ.xa"
      }
    ],

    éste: [
      {
        type: "pronoun",
        entry: "éste",
        pronunciation: "'es.te",
        kind: "demostrativo"
      }
    ],

    ésta: [
      {
        type: "pronoun",
        entry: "ésta",
        pronunciation: "'es.ta",
        kind: "demostrativo"
      }
    ],

    yo: [
      {
        type: "pronoun",
        entry: "yo",
        pronunciation: "ʝo",
        kind: "personal"
      },
      {
        type: "noun",
        entry: "yo",
        pronunciation: "ʝo",
        gender: "m"
      }
    ],

    tuyo: [
      {
        type: "pronoun",
        entry: "tuyo",
        pronunciation: "'tu.ʝ̞o̞",
        kind: "posesivo"
      },
      {
        type: "noun",
        entry: "tuyo",
        pronunciation: "'tu.ʝ̞o̞",
        gender: "m"
      }
    ],

    tuya: [
      {
        type: "noun",
        entry: "tuya",
        pronunciation: "'tu.ʝ̞a̠",
        gender: "f"
      },
      {
        type: "pronoun",
        entry: "tuya",
        pronunciation: "'tu.ʝ̞a̠",
        kind: "posesivo"
      }
    ],

    tuyas: [
      {
        type: "pronoun",
        entry: "tuyas",
        pronunciation: "'tu.ʝas"
      }
    ],

    sobre: [
      {
        type: "preposition",
        entry: "sobre",
        pronunciation: "'so.βɾe"
      },
      {
        type: "noun",
        entry: "sobre",
        pronunciation: "'so.βɾe",
        gender: "m"
      }
    ],

    el: [
      {
        type: "article",
        entry: "el",
        pronunciation: "el",
        kind: "determinado"
      }
    ],

    la: [
      {
        type: "article",
        entry: "la",
        pronunciation: "la",
        kind: "determinado"
      },
      {
        type: "pronoun",
        entry: "la",
        pronunciation: "la",
        kind: "personal"
      },
      {
        type: "noun",
        entry: "la",
        pronunciation: "la",
        gender: "m"
      }
    ],

    maravilloso: [
      {
        type: "adjective",
        entry: "maravilloso",
        pronunciation: "ma.ɾa.βi'ʎo.so"
      }
    ],

    maravillosa: [
      {
        type: "adjective",
        entry: "maravillosa",
        referenceEntry: "maravilloso"
      }
    ],

    acompañadores: [
      {
        type: "adjective",
        entry: "acompañadores",
        referenceEntry: "acompañador"
      }
    ],

    caro: [
      {
        type: "adjective",
        entry: "caro",
        pronunciation: "'ka.ɾo"
      },
      {
        type: "adverb",
        entry: "caro",
        pronunciation: "'ka.ɾo"
      }
    ],

    cara: [
      {
        type: "noun",
        entry: "cara",
        gender: "f"
      },
      {
        type: "adjective",
        entry: "cara",
        referenceEntry: "caro"
      }
    ],

    o: [
      {
        type: "noun",
        entry: "o",
        pronunciation: "o",
        gender: "f"
      },
      {
        type: "conjunction",
        entry: "o",
        pronunciation: "o"
      }
    ],

    amar: [
      {
        type: "verb",
        entry: "amar",
        pronunciation: "a'maɾ",
        kind: "transitivo"
      }
    ],

    venir: [
      {
        type: "verb",
        entry: "venir",
        pronunciation: "be'niɾ",
        kind: "intransitivo"
      }
    ],

    reírse: [
      {
        type: "verb",
        entry: "reírse",
        kind: "pronominal"
      }
    ],

    sido: [
      {
        type: "verb_form",
        entry: "sido",
        pronunciation: "'si.ðo",
        infinitive: "ser",
        mode: "participio"
      }
    ],

    abitado: [
      {
        type: "verb_form",
        entry: "abitado",
        infinitive: "abitar",
        mode: "participio"
      }
    ],

    yendo: [
      {
        type: "verb_form",
        entry: "yendo",
        pronunciation: "'ʝen̪.do",
        infinitive: "ir",
        mode: "gerundio"
      }
    ],

    hecho: [
      {
        type: "noun",
        entry: "hecho",
        pronunciation: "'e.ʧo",
        gender: "m"
      },
      {
        type: "adjective",
        entry: "hecho",
        pronunciation: "'e.ʧo"
      },
      {
        type: "verb_form",
        entry: "hecho",
        pronunciation: "'e.ʧo",
        infinitive: "hacer",
        mode: "participio"
      }
    ],

    íbamos: [
      {
        type: "verb_form",
        entry: "íbamos",
        pronunciation: "'i.βa.mos",
        infinitive: "ir",
        mode: "indicativo",
        tense: "pret imp",
        person: "1p"
      }
    ],

    segará: [
      {
        type: "verb_form",
        entry: "segará",
        pronunciation: "se.ɣa'ɾa",
        infinitive: "segar",
        mode: "ind",
        tense: "fut",
        person: "3s"
      }
    ],

    lucid: [
      {
        type: "verb_form",
        entry: "lucid",
        infinitive: "lucir",
        mode: "imperativo",
        person: "2p"
      }
    ],

    acudiría: [
      {
        type: "verb_form",
        entry: "acudiría",
        infinitive: "acudir",
        mode: "condicional",
        person: "1s"
      },
      {
        type: "verb_form",
        entry: "acudiría",
        infinitive: "acudir",
        mode: "condicional",
        person: "3s"
      }
    ],

    cerca: [
      {
        type: "adverb",
        entry: "cerca",
        pronunciation: "'θeɾ.ka",
        kind: "lugar"
      },
      {
        type: "adverb",
        entry: "cerca",
        pronunciation: "'θeɾ.ka",
        kind: "tiempo"
      },
      {
        type: "noun",
        entry: "cerca",
        pronunciation: "'θeɾ.ka",
        gender: "f"
      },
      {
        type: "verb_form",
        entry: "cerca",
        pronunciation: "'θeɾ.ka",
        infinitive: "cercar",
        mode: "indicativo",
        tense: "presente",
        person: "3s"
      },
      {
        type: "verb_form",
        entry: "cerca",
        pronunciation: "'θeɾ.ka",
        infinitive: "cercar",
        mode: "imperativo",
        person: "2s"
      }
    ],

    vino: [
      {
        type: "noun",
        entry: "vino",
        pronunciation: "'bi.no",
        gender: "m"
      },
      {
        type: "adjective",
        entry: "vino",
        pronunciation: "'bi.no"
      },
      {
        type: "verb_form",
        entry: "vino",
        pronunciation: "'bi.no",
        infinitive: "venir",
        mode: "indicativo",
        tense: "pret ind",
        person: "3s"
      }
    ]
  })
);
