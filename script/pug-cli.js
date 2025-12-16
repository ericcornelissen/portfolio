import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";

import * as pug from "pug";

/* --- ARGUMENTS ------------------------------------------------------------ */

const file = process.argv[2];
if (!file) {
	console.error("An argument must be provided");
	process.exit(1);
}

/* --- HELPERS -------------------------------------------------------------- */

async function readAndParseDataFile(file) {
	const rawData = await fs.readFile(file);
	const data = JSON.parse(rawData);
	return data;
}

/* --- MAIN ----------------------------------------------------------------- */

async function main() {
	// collect locals
	const dataPath = path.resolve(".", "data");
	const dataFiles = await fs.readdir(dataPath);

	const ps = dataFiles
		.filter((file) => file.endsWith(".json"))
		.map((file) => path.resolve(dataPath, file))
		.map(readAndParseDataFile);
	const datas = await Promise.all(ps);
	const locals = datas.reduce((acc, data) => ({ ...acc, ...data }), {});

	const cspFile = path.resolve(dataPath, "csp.txt");
	const csp = (await fs.readFile(cspFile)).toString().replace(/\n/g, "");

	// compile
	const filePath = path.resolve(".", file);
	const html = pug.renderFile(filePath, {
		...locals,
		csp,
		filename: file,
		pretty: false,
		debug: false,
		fragmentify: (s) => s.replaceAll(/\s+/g, "-").toLowerCase(),
	});

	console.log(html);
}

main();
