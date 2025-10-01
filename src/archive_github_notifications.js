(async () => {
	"use strict";

	async function archiveNotifications() {
		/** @type NodeListOf<HTMLLIElement> */
		const notifications = document.querySelectorAll(
			"li.notifications-list-item",
		);

		/**
		 * Closed, merged and CI notifications
		 * @type IteratorObject<HTMLLIElement, undefined, unknown>
		 */
		const filtered = notifications.values().filter(notification => {
			const check = notification.querySelector(
				".octicon-check.color-fg-success",
			);
			const issueClosed = notification.querySelector(".octicon-issue-closed");
			const merged = notification.querySelector(".octicon-git-merge");
			const prClosed = notification.querySelector(
				".octicon-git-pull-request-closed",
			);
			const skip = notification.querySelector(".octicon-skip");
			const stop = notification.querySelector(".octicon-stop");
			const tag = notification.querySelector(".octicon-tag");
			const x = notification.querySelector(".octicon-x");

			return (
				check || issueClosed || merged || prClosed || skip || stop || tag || x
			);
		});

		/** @type (HTMLInputElement | null)[] */
		const checkboxes = filtered
			.map(notification => notification.querySelector('input[type="checkbox"]'))
			.toArray();

		/* Click them */
		for (const checkbox of checkboxes) checkbox?.click();

		console.log(`Clicked on ${checkboxes.length} checkboxes.`);

		await new Promise(resolve => setTimeout(resolve, 1000));

		if (checkboxes.length) {
			/** @type HTMLFormElement[] */
			const done = document
				.querySelectorAll('form[action="/notifications/beta/archive"]')
				.values()
				.filter(form => form.checkVisibility())
				.toArray();

			for (const form of done) form.requestSubmit();
			console.log("Archived notifications.");
		}

		return checkboxes.length;
	}

	for (
		let archived = await archiveNotifications();
		archived >= 10;
		archived = await archiveNotifications()
	) {
		await new Promise(resolve => setTimeout(resolve, 3000));
	}

	console.info("Under 10 notifications left in this page.");
})();
