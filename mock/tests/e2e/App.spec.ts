import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  page.goto("http://localhost:8000/");
});

test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Command input")).toHaveValue("");
});

/**
 * Tests brief output after loading a file
 */
test("brief output file_load", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("loaded file filepath1.csv")).toBeVisible();
});

/**
 * Tests verbose output after loading a file
 */
test("verbose output after load_file", async ({ page }) => {
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
 * Tests brief output after view
 */
test("brief output after view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "Hi" }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "i'm" }).first()).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "simone" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Hi" }).nth(1).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "i'm" }).nth(1).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Maddie" }).first()
  ).toBeVisible();
});

/**
 * Tests verbose output after view
 */
test("verbose output after view", async ({ page }) => {
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
 * Tests the message printed after view with no file previously loaded
 */
test("no file to view", async ({ page }) => {
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
 * Tests that nothing is printed when input to view in empty
 */
test("test empty view bried", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath2.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await expect(page.locator("div").nth(3)).toBeVisible();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").click();
  await expect(page.locator("div").nth(3)).toBeVisible();
});

/**
 * Tests that search still prints accurately when returned search val is a single column
 * and program is in brief mode
 */
test("brief test one col serach", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "hello" })).toBeVisible();
});

/**
 * Tests that search still prints accurately when returned search val is a single column
 * and program is in verbose mode
 */
test("verbose test one col search", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 hello");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "hello" })).toBeVisible();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:mode output: mode")).toBeVisible();
  await expect(page.getByText("command:search 0 hello output")).toBeVisible();
});

/**
 * Tests that search functions properly when the program is in brief mode and the
 * data returned is a 2D array
 */
test("2d array brief search ", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search State RI");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "RI" }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "Providence" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "USA" }).first()).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "RI" }).nth(1).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Newport" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "USA" }).nth(1).first()
  ).toBeVisible();
});

/**
 * Tests that search functions properly when the program is in verbose mode and the
 * data returned is a 2D array
 */
test("2d array verbose search ", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search State RI");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "command:search State RI output: RIProvidenceUSARINewportUSA"
    )
  ).toBeVisible();
});

/**
 * Tests the result of a search command when the designated value is not present
 */
test("query not found in brief", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath2.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 2 seven");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Query not found")).toBeVisible();
});

/**
 * Tests the returned result of search wehn no file has been loaded yet
 */
test("no file search in brief", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 1 Maddie");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No file is loaded, please try again")
  ).toBeVisible();
});

/**
 * Tests the value returned by search when data is malformed
 */
test("search malformed response", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file file");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 1 roxy");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("html-table")).toBeVisible();
});

/**
 * Tests the result of search in brief mode when data is one clolumn
 */
test("brief one col view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath4.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("p").filter({ hasText: "HiHowdyg'day" })
  ).toBeVisible();
});

/**
 * Tests the result of search in verbose mode when data is one clolumn
 */
test("verbose one col view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath4.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:view output: HiHowdyg")).toBeVisible();
});

/**
 * Tests the result of view in brief mode when data is one row
 */
test("brief view one row", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath5.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("p").filter({ hasText: "Hi" })).toBeVisible();
});

/**
 * Tests the result of view in verbose mode when data is one row
 */
test("verbose view one row", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath5.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("p").filter({ hasText: "Hi" })).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:view output: Hi")).toBeVisible();
});

/**
 * Tests the result of view in brief mode when data is malformed
 */
test("brief malformed view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath6.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("p").filter({ hasText: "Hiyohowdy" })
  ).toBeVisible();
});

/**
 * Tests the result of view in verbose mode when data is malformed
 */
test("verbose malformed view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file filepath6.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("p").filter({ hasText: "Hiyohowdy" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("command:view output: Hiyohowdy")).toBeVisible();
});
