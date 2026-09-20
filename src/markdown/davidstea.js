(() => {
	"use strict";

	function getTitle() {
		return document
			.querySelector("h1")
			.textContent.trim()
			.replace(/\sTea$/i, "");
	}

	function getBadges() {
		const badges = document.getElementsByClassName("product-badges");
		return Array.from(badges).map(badge => badge.textContent.trim());
	}

	/**
	 * Gets the first paragraph of a tab.
	 *
	 * @param {string} id
	 */
	function getTabText(id) {
		const tab = document.getElementById(id);
		if (!tab) return "";

		return tab
			.querySelectorAll("p")
			.values()
			.map(p =>
				p.textContent
					.replaceAll("’", "'")
					.replaceAll("“", '"')
					.replaceAll("”", '"'),
			)
			.find(Boolean);
	}

	function getHighlights() {
		const panel = document.getElementById("tab4");
		if (!panel) return [];

		return panel
			.querySelectorAll(".text-center")
			.values()
			.map(element => element.textContent.trim())
			.filter(Boolean)
			.toArray();
	}

	function getAttributes() {
		return document
			.querySelectorAll(".product-info-container-top .border-b > div > span")
			.values()
			.map(element => element.textContent)
			.filter(Boolean)
			.toArray();
	}

	function getPreparation() {
		const section = document.querySelector('[id*="_preparation_"]');
		if (!section) return [];

		return section
			.querySelectorAll("img")
			.values()
			.map(image => {
				const filename = image.src.split("/").pop();
				const label = filename
					.split("?")[0]
					.replace(/-eng?(-\d+)?\.svg$/i, "")
					.replaceAll("_", "-");

				if (/^(\d+-\d+)-perfect-spoons$/i.test(label)) {
					return label.replace(/^(.+)-perfect-spoons$/i, "$1 perfect spoons");
				}

				if (/^\d+c-in-\d+ml$/i.test(label)) {
					const [, c, ml] = label.match(/^(\d+)c-in-(\d+)ml$/i);
					const f = Math.round((c * 9) / 5 + 32);
					const oz = Math.round(ml * (16_000_000 / 473_176_473));

					return label.replace(
						/^(\d+)c-in-(\d+)ml$/i,
						`$1°C (${f}°F) in $2 ml (${oz} oz)`,
					);
				}

				if (/^(\d+)-plus-min$/i.test(label)) {
					return label.replace(/^(\d+)-plus-min$/i, "$1+ minutes");
				}

				if (/^(\d+)-(\d+)-min$/i.test(label)) {
					return label.replace(/^(\d+)-(\d+)-min$/i, "$1-$2 minutes");
				}

				return label.replaceAll("-", " ");
			})
			.filter(Boolean)
			.toArray();
	}

	/**
	 * @param {string[]} items
	 */
	function formatList(items) {
		return items.map(item => `- ${item}`).join("\n");
	}

	const title = getTitle();
	const badges = getBadges();
	const description = getTabText("tab1");
	const taste = getTabText("tab2");
	const ingredients = getTabText("tab3");
	const highlights = getHighlights();
	const attributes = getAttributes();
	const preparation = getPreparation();
	const markdown = [
		`# ${title}`,
		"",
		formatList(badges),
		"",
		description,
		"",
		"## Taste",
		"",
		taste,
		"",
		"## Ingredients",
		"",
		ingredients,
		"",
		"## Highlights",
		"",
		formatList(highlights),
		"",
		"## Attributes",
		"",
		formatList(attributes),
		"",
		"## Preparation",
		"",
		formatList(preparation),
	].join("\n");

	navigator.clipboard
		.writeText(markdown)
		.then(() => console.log(`Copied ${title} to clipboard.`))
		.catch(error =>
			console.error(`Failed to copy ${title} to clipboard.`, { error }),
		);
})();
