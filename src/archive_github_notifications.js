(async () => {
	"use strict";

	const uiTimeout = 1000;
	const pageTimeout = 3000;

	/**
	 * Gets the checkboxes for the notifications to archive.
	 * @returns {HTMLInputElement[]}
	 */
	function queryNotificationCheckboxes() {
		/** @type NodeListOf<HTMLLIElement> */
		const all = document.querySelectorAll("li.notifications-list-item");

		const notifications = all.values().filter(notification => {
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

		return notifications
			.map(notification => notification.querySelector('input[type="checkbox"]'))
			.filter(Boolean)
			.toArray();
	}

	async function archiveNotifications() {
		const checkboxes = queryNotificationCheckboxes();
		for (const checkbox of checkboxes) checkbox?.click();
		console.log(`Clicked on ${checkboxes.length} checkboxes.`);
		await new Promise(resolve => setTimeout(resolve, uiTimeout));

		if (checkboxes.length) {
			/** @type HTMLFormElement[] */
			const done = document
				.querySelectorAll('form[action="/notifications/beta/archive"]')
				.values()
				.filter(form => form.checkVisibility())
				.toArray();

			for (const form of done) form.requestSubmit();
			console.log(`Archived ${checkboxes.length} notifications.`);
		}

		return checkboxes.length;
	}

	console.log("Archiving all notifications...");
	for (
		let prev = document.querySelector('a.btn[aria-label="Previous"]');
		(prev = document.querySelector('a.btn[aria-label="Previous"]')), prev;
		prev.click()
	) {
		await new Promise(resolve => setTimeout(resolve, pageTimeout));
		await archiveNotifications();
		await new Promise(resolve => setTimeout(resolve, pageTimeout));
		console.log("Navigating to the previous page...");
	}

	console.info("Done!");
})();
