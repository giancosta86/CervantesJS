export type PartialTerm = Readonly<{
  entry: string;
  pronunciation?: string;
}>;

const pronunciationRegex = /\|\s*fon(?:e|o)\s*=\s*([^-|}\r?\n]+)/;

export function extractPartialTerm(
  entry: string,
  content: string
): PartialTerm {
  const pronunciationMatch = pronunciationRegex.exec(content);

  return {
    entry,
    pronunciation: pronunciationMatch?.[1]?.replaceAll("\u02c8", "'")
  };
}
