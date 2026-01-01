(async () => {
	async function cancel() {
		console.log("Cancelling...");
		const btnCancel = document.querySelector(".btnCancel");
		if (!btnCancel)
			throw new Error("Cancel button not found", { cause: btnCancel });
		btnCancel.click();
		await new Promise(r => setTimeout(r, 2000));
	}

	async function save() {
		console.log("Saving...");
		const btnSave = document.querySelector(".btnSave");
		if (!btnSave) throw new Error("Save button not found", { cause: btnSave });
		btnSave.click();
		await new Promise(r => setTimeout(r, 4000));
	}

	const movies = Array.from(
		document.querySelectorAll(
			".card.portraitCard.card-hoverable.card-withuserdata",
		),
	);

	for (let index = 0; index < movies.length; index++) {
		console.log(`Renaming movie ${index}/${movies.length}...`);

		const movie = document.querySelector(
			`.card.portraitCard.card-hoverable.card-withuserdata[data-index="${index}"]`,
		);
		if (!movie) throw new Error("Movie not found", { cause: { movie, index } });

		console.log("Opening the context menu of a movie", movie);
		movie.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
		await new Promise(r => setTimeout(r, 1000));

		const buttons = document.querySelectorAll(
			".listItemBodyText.actionSheetItemText",
		);

		const editMetadata = Array.from(buttons).find(
			b => b.innerText === "Edit metadata",
		);

		if (!editMetadata)
			throw new Error("Edit metadata button not found", {
				cause: editMetadata,
			});

		editMetadata.click();
		await new Promise(r => setTimeout(r, 1000));

		/** @type {HTMLInputElement | null} */
		const txtPath = document.getElementById("txtPath");
		if (!txtPath) throw new Error("Path input not found", { cause: txtPath });

		/** @type {HTMLInputElement | null} */
		const txtName = document.getElementById("txtName");
		if (!txtName) throw new Error("Title input not found", { cause: txtName });

		// Extract languages from txtPath. The value looks like
		// "/syncthing/Inoxydable Films/10 Things I Hate About You - VOA_VFQ_VFF.mkv"
		// and I need "VOA_VFQ_VFF".
		const splitDash = txtPath.value.split(" - ");
		const afterDash = splitDash[splitDash.length - 1];
		const [beforeDot] = afterDash.split(".");
		const languages = beforeDot.replaceAll("_", ", ");

		if (txtName.value.endsWith(languages)) {
			console.warn(`Skipping "${txtName.value}"`);
			cancel();
			continue;
		}

		txtName.value = `${txtName.value} - ${languages}`;

		/** @type {HTMLInputElement | null} */
		const enabledName = document.querySelector('input[data-value="Name"]');

		if (enabledName.value === "on") {
			console.log("Disabling Enabled Name");
			enabledName.click();
			await new Promise(r => setTimeout(r, 1000));
		} else {
			console.warn("Enabled Name is already disabled", enabledName);
		}

		save();
	}

	console.log("All movies renamed.");
})();
