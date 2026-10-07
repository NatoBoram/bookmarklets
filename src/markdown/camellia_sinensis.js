(() => {
	"use strict";

	/**
	 * @param {HTMLElement | undefined} element
	 */
	function getText(element) {
		return element?.textContent.replace(/\s+/g, " ").trim();
	}

	function getName() {
		return getText(document.querySelector(".product-details__name")).replace(
			/\s+\(.*\)$/,
			"",
		);
	}

	function getSummary() {
		return getText(document.querySelector(".product-details__secondary-name"));
	}

	function getOrigin() {
		return document
			.querySelectorAll(".product-details__header__label")
			.values()
			.map(getText)
			.filter(Boolean)
			.toArray();
	}

	function getDescription() {
		return document
			.querySelectorAll(".product-details__description-wrapper p")
			.values()
			.map(getText)
			.filter(Boolean)
			.toArray()
			.join("\n\n");
	}

	function getIngredients() {
		const p = document.querySelector(".product-details__ingredients p");
		const label = p?.querySelector(".product-details__ingredients__label");
		if (!p || !label) return;

		const ptext = getText(p);
		const ltext = getText(label);

		return ptext.replace(ltext, `**${ltext}**`);
	}

	/**
	 * @param {string} text
	 */
	function formatHarvestDate(text) {
		const match = /^(Date of harvest: )(.+)$/.exec(text);
		if (!match) return text;

		const date = new Date(match[2]);
		if (Number.isNaN(date.valueOf())) return text;

		const formattedDate = new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}).format(date);

		return `${match[1]}${formattedDate}`;
	}

	function getProductInfo() {
		const productInfo = document
			.querySelectorAll(".product-details__info .text")
			.values()
			.map(getText)
			.filter(Boolean)
			.map(formatHarvestDate)
			.toArray();

		const certified = getText(
			document.querySelector(".product-details__infos-eco__footer"),
		);

		return [...productInfo, certified].filter(Boolean);
	}

	/**
	 * @param {Element} row
	 */
	function getPreparationValue(row) {
		const value = getText(
			row.querySelector(".product-prep__content-row-value"),
		);
		const select = row.querySelector("select");
		if (!value || !(select instanceof HTMLSelectElement)) return value;

		return Array.from(select.options)
			.map(option => {
				const optionValue = option.dataset.shownHtml?.trim();
				const unit = getText(option);
				if (!optionValue || !unit) return "";

				const suffix = unit === "gram" && optionValue !== "1" ? "s" : "";
				const separator = unit.startsWith("°") ? "" : " ";
				return `${optionValue}${separator}${unit}${suffix}`;
			})
			.filter(Boolean)
			.join(", ");
	}

	/**
	 * @param {Element} panel
	 */
	function getInstructionSections(panel) {
		return panel
			.querySelectorAll(".product-prep__content-row__instructions")
			.values()
			.map(section => {
				const titleElement = section.querySelector(
					".product-prep__content-row__instructions__title",
				);
				const heading = getText(titleElement);
				const note = getText(titleElement?.querySelector("em"));
				const title = heading.replace(note, "").trim();
				const items = section
					.querySelectorAll("li")
					.values()
					.map(getText)
					.filter(Boolean)
					.toArray();
				const content = formatList(items);

				return title && content ? `### ${title}\n\n${content}` : "";
			})
			.filter(Boolean)
			.toArray();
	}

	function getPreparation() {
		return document
			.querySelectorAll(".product-prep__content")
			.values()
			.map(panel => {
				const title = getText(
					panel.querySelector(".product-prep__content-row.is-title"),
				);
				const items = panel
					.querySelectorAll(".product-prep__content-row:not(.is-title)")
					.values()
					.map(row => {
						const label = getText(
							row.querySelector(".product-prep__content-row-title"),
						);
						const value = getPreparationValue(row);
						return label && value ? `${label}: ${value}` : "";
					})
					.filter(Boolean)
					.toArray();
				const instructions = getInstructionSections(panel);
				const content = [formatList(items), ...instructions]
					.filter(Boolean)
					.join("\n\n");

				return title && content ? { title, content } : undefined;
			})
			.filter(Boolean)
			.toArray();
	}

	function getAttributes() {
		const caffeine = getText(
			document.querySelector(
				".product-attributes__meter-wrapper.is-caffeine .product-attributes__meter-value",
			),
		);
		const antioxidants = getText(
			document.querySelector(
				".product-attributes__meter-wrapper.is-antioxydant .product-attributes__meter-value",
			),
		);

		return [
			caffeine && `Caffeine: ${caffeine}`,
			antioxidants && `Antioxidants: ${antioxidants}`,
		].filter(Boolean);
	}

	function getFlavourWheel() {
		const labels = {
			floweriness: "Floral",
			fruitiness: "Fruity",
			woodiness: "Woody",
			earthiness: "Earthy",
			spiciness: "Spice",
			vegetativeness: "Vegetal",
		};

		return document
			.querySelectorAll(".product-attributes__aroma-section")
			.values()
			.map(section => {
				const category = section.classList
					.values()
					.find(className => className.startsWith("section-"))
					?.replace("section-", "");

				const level = section.classList
					.values()
					.find(className => /^is-\d+$/.test(className))
					?.replace("is-", "");

				const label = labels[category];
				return label && level ? `${label}: ${level}/3` : "";
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

	/**
	 * @param {string} title
	 * @param {string} content
	 */
	function formatSection(title, content) {
		return content ? `## ${title}\n\n${content}` : "";
	}

	const name = getName();
	const summary = getSummary();
	const origin = getOrigin();
	const description = getDescription();
	const ingredients = getIngredients();
	const productInfo = getProductInfo();
	const preparation = getPreparation();
	const attributes = getAttributes();
	const flavourWheel = getFlavourWheel();
	const markdown = [
		`# ${name}`,
		summary && `> ${summary}`,
		formatList(origin),
		description,
		ingredients,
		formatList(productInfo),
		...preparation.map(({ title: preparationTitle, content }) =>
			formatSection(preparationTitle, content),
		),
		formatSection("Attributes", formatList(attributes)),
		formatSection("Flavour wheel", formatList(flavourWheel)),
	]
		.filter(Boolean)
		.join("\n\n");

	navigator.clipboard
		.writeText(markdown)
		.then(() => {
			console.log(`Copied ${name} to clipboard.`);
		})
		.catch(error => {
			console.error(`Failed to copy ${name} to clipboard.`, { error });
		});
})();
