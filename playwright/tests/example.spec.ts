import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4321");
    });

    test("correct tab name", async ({ page }) => {
        await expect(page).toHaveTitle("Home");
    });

    test("correct page content", async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
        await expect(page.getByLabel("current page")).toBeVisible();
        await expect(page.getByRole("link", { name: "Form" })).toBeVisible();
    });

    test("correct link direction", async ({ page }) => {
        await page.getByRole("link", { name: "Form" }).click();
        await expect(page).toHaveTitle("Form");
    });
});

test.describe("Form page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:4321/form");
    });

    test("correct tab name", async ({ page }) => {
        await expect(page).toHaveTitle("Form");
    });

    test("correct page content", async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Form" })).toBeVisible();
        await expect(page.getByLabel("current page")).toBeVisible();
        await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(page.getByPlaceholder("Enter item")).toBeVisible();
        await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
    });

    test("correct link direction", async ({ page }) => {
        await page.getByRole("link", { name: "Home" }).click();
        await expect(page).toHaveTitle("Home");
    });

    test("todo list is empty at the start", async ({ page }) => {
        await expect(page.getByTestId("ul")).toBeEmpty();
    });

    test("adds new todos", async ({ page }) => {
        const input = page.getByPlaceholder("Enter item");
        await input.fill("New Todo");
        await page.getByRole("button", { name: "Add" }).click();
        await expect(input).toBeEmpty();

        const item = page.getByTestId("ul").nth(0);
        expect(item).toHaveText("New Todo");
    });
});
