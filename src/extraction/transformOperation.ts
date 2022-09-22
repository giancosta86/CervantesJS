import { join } from "node:path";
import { createTermExtractionOperation } from "@giancosta86/jardinero-sdk";

export = createTermExtractionOperation({
  termExtractorModuleId: join(__dirname, "core"),
  termExtractorExportName: "extractTerms"
});
