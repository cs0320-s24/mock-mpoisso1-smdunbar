import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {});

test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Command input")).toHaveValue("");
});

/**
 * Tests the brief output message generated after loading a file
 */
test("load file brief 2D array", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("loaded file filepath1.csv")).toBeVisible();
});

/**
 * Tests the verbose output message generated after loading a file
 */
test("load file verbose 2D array", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("loaded file filepath1.csv")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:load_file filepath1.")).toBeVisible();
});

/**
 * Tests the brief output message generated if there is an incorrect number of args provided
 */
test("load incorrect number of arguments brief ", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("incorrect number of arguments")).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the view command returns a result that is
 * of type String[][] and the program is in brief mode
 */
test("brief: view", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("p").filter({ hasText: "Hii'msimoneHii'mMaddie" })
  ).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the view command returns a result that is
 * of type String[][] and the program is in verbose mode
 */
test("verbose: view", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:view output: Hii'")).toBeVisible(); // whole html table block
});

/**
 * Tests the output shape of what is generated when the view command is entered and no file has been loaded
 * in the brief mode
 */
test("no file to view: brief ", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file file");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No file to view")).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the view command is entered and no file has been loaded
 * in the verbose mode
 */
test("no file to view: verbose ", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file file");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:view output: no file")).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the view command is entered and no file has been loaded
 * in the verbose mode
 */
test("view wrong number of args", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByRole("group", { name: "Enter a command:" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("incorrect number of arguments")).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the view command attempts to view a
 * file that has been loaded but is empty
 */
test("test empty", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath2.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  // test that there is nothing there??
});

/**
 * Tests the output shape of what is generated when the search command returns a result that is
 * of type String[][] and the program is in brief mode
 */
test("brief: search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByRole("group", { name: "Enter a command:" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 2 Maddie");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("p").filter({ hasText: "Hii'mMaddie" })
  ).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the search command returns a result that is
 * of type String[][] and the program is in brief mode
 */
test("verbose: search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByRole("group", { name: "Enter a command:" }).click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 2 Maddie");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:search 2 Maddie")).toBeVisible();
});

/**
 * Tests the output shape of what is generated when the search command returns a result that is
 * empty and the program is in brief mode
 */
test("empty search: brief", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 3 track");
  await page.getByRole("button", { name: "Submit" }).click();
  // test that there is nothing there??
});

/**
 * Tests the output shape of what is generated when the search command returns a result that is
 * empty and the program is in verbose mode
 */
test("empty search: verbose", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 3 track");
  await page.getByRole("button", { name: "Submit" }).click();
  // test that there is nothing there??
});
