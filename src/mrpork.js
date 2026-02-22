(() => {
	"use strict";

	/**
	 * @see https://jvm-gaming.org/t/super-simple-name-generator/53855
	 * @see https://github.com/TwelveIterations/Waystones/blob/def55edac86912e053d3ff3d089d852865980c4d/common/src/main/java/net/blay09/mods/waystones/worldgen/namegen/MrPorkNameGenerator.java
	 * @module
	 */

	const beginnings = [
		"Kr",
		"Ca",
		"Ra",
		"Rei",
		"Mar",
		"Luk",
		"Cro",
		"Cru",
		"Ray",
		"Bre",
		"Zed",
		"Mor",
		"Jag",
		"Mer",
		"Jar",
		"Mad",
		"Cry",
		"Zur",
		"Mjol",
		"Zork",
		"Creo",
		"Azak",
		"Azur",
		"Mrok",
		"Drak",
	];

	const middles = [
		"ir",
		"mi",
		"air",
		"sor",
		"mee",
		"clo",
		"red",
		"cra",
		"ark",
		"arc",
		"mur",
		"zer",
		"miri",
		"lori",
		"cres",
		"zoir",
		"urak",
		"marac",
		"slamar",
		"salmar",
	];

	const ends = [
		"d",
		"ed",
		"es",
		"er",
		"ark",
		"arc",
		"der",
		"med",
		"ure",
		"zur",
		"mur",
		"tron",
		"cred",
	];

	/**
	 * Generates a random name using the MrPork algorithm.
	 * @returns {string}
	 */
	function generateName() {
		const beginning = beginnings[Math.floor(Math.random() * beginnings.length)];
		const middle = middles[Math.floor(Math.random() * middles.length)];
		const end = ends[Math.floor(Math.random() * ends.length)];
		return beginning + middle + end;
	}

	const name = generateName();
	console.log(`Generated name: ${name}`);

	navigator.clipboard.writeText(name).then(
		() => alert(`Generated name: ${name}\n\nCopied to clipboard.`),
		() => alert(`Generated name: ${name}\n\nFailed to copy to clipboard.`),
	);
})();
