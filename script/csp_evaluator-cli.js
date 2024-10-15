import * as fs from "node:fs/promises";
import * as path from "node:path";

import { CspEvaluator } from "csp_evaluator/dist/evaluator.js";
import { CspParser } from "csp_evaluator/dist/parser.js";

/* --- HELPERS -------------------------------------------------------------- */

function allowedFinding(finding) {
	if (finding.directive === "script-src" && finding.value === "'self'") {
		return false;
	}

	return true;
}

/* --- MAIN ----------------------------------------------------------------- */

async function main() {
	// read and parse
	const dataPath = path.resolve(".", "data");
	const cspFile = path.resolve(dataPath, "csp.txt");
	const rawCsp = await fs.readFile(cspFile, { encoding: "utf-8" });
	const parsed = new CspParser(rawCsp);

	// evaluate
	const evaluator = new CspEvaluator(parsed.csp);
	const result = evaluator.evaluate().filter(allowedFinding);
	if (result.length > 0) {
		console.log(result);
		process.exit(2);
	}
}

main();
