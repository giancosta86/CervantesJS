import { join } from "node:path";
import { readFileSync } from "node:fs";

const SPANISH_REGEX_BASELINE_FLAGS = ["i", "g", "u"];

export function loadSpanishRegex(regexName: string, flags: string): RegExp {
  const regexFilePath = join(__dirname, "data", `${regexName}.txt`);

  const singleLinePattern = readFileSync(regexFilePath, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .join("");

  const actualFlags = SPANISH_REGEX_BASELINE_FLAGS.reduce(
    (cumulatedFlags, baselineFlag) =>
      cumulatedFlags.includes(baselineFlag)
        ? cumulatedFlags
        : cumulatedFlags + baselineFlag,
    flags
  );

  return RegExp(singleLinePattern, actualFlags);
}
