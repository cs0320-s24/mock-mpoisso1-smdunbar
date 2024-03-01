import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
})

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()

  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test('after I click the button, my command gets pushed', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByLabel('Command input')).toHaveValue("");

});
test('brief output after I load a file', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file filepath1.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('loaded file filepath1.csv')).toBeVisible();

});
test('verbose output after I load a file', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_file filepath1.csv');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('loaded file filepath1.csv')).toBeVisible();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('command:load_file filepath1.')).toBeVisible();
});
test('verbose output after I load a file', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  test('brief: view', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file filepath1.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'Hi' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'i\'m' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'simone' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Hi' }).nth(1).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'i\'m' }).nth(1).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Maddie' }).first()).toBeVisible();
  });
  test('verbose: view', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file filepath1.csv');;
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('command:view output: Hii\'')).toBeVisible(); // whole html table block
  });

  test('no file to view', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file file');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('No file to view')).toBeVisible();
  });
  test('test empty', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file filepath2.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();
    // test that there is nothing there??
  });


  test('brief test one col serach', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file filepath1.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('search 0 hello');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'hello' })).toBeVisible();
  });

  test('verbose test one col search', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file filepath1.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('search 0 hello');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'hello' })).toBeVisible();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('command:mode output: mode')).toBeVisible();
    await expect(page.getByText('command:search 0 hello output')).toBeVisible();
  });

