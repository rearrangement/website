import { expect, test } from "@playwright/test";

/**
 * The gallery uses shallow routing: a click opens a popout at the project's
 * real URL, but loading that URL directly renders a standalone page. These
 * tests pin down both halves of that contract.
 */

test("gallery lists every project", async ({ page }) => {
	await page.goto("/projects");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(
		"Projects & experiments",
	);
	await expect(page.locator('a[href^="/projects/"]')).not.toHaveCount(0);
});

test("clicking a card opens a popout and moves the URL", async ({ page }) => {
	await page.goto("/projects");
	await page.locator('a[href="/projects/wisest-cc"]').first().click();

	const dialog = page.locator("dialog[open]");
	await expect(dialog).toBeVisible();
	await expect(page).toHaveURL(/\/projects\/wisest-cc$/);
	await expect(dialog.getByRole("heading", { level: 1 })).toHaveText(
		"wisest.cc",
	);
});

test("escape closes the popout and restores the gallery URL", async ({
	page,
}) => {
	await page.goto("/projects");
	await page.locator('a[href="/projects/wisest-cc"]').first().click();
	await expect(page.locator("dialog[open]")).toBeVisible();

	await page.keyboard.press("Escape");

	await expect(page.locator("dialog[open]")).toHaveCount(0);
	await expect(page).toHaveURL(/\/projects$/);
});

test("loading a project URL directly renders a full page, not a popout", async ({
	page,
}) => {
	await page.goto("/projects/wisest-cc");

	await expect(page.locator("dialog")).toHaveCount(0);
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("wisest.cc");
	await expect(page.getByRole("link", { name: "all projects" })).toBeVisible();
});

test("an unknown project 404s", async ({ page }) => {
	const response = await page.goto("/projects/does-not-exist");
	expect(response?.status()).toBe(404);
});

test("the blog link points at the external blog", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.locator('header a[href="https://blog.wisest.cc"]'),
	).toBeVisible();
});
