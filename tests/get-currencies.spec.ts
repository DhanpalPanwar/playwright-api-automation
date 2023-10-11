import { test, expect } from '@playwright/test';
/**imprt the currency json the response will be validated against this data
 */
import expectedCurrency from "../test-data/currencies.json";

test('Get a list of all available currencies', async ({ request }) => {
  const currencies = await request.get(`/public/v1/currencies`);
  /**verify status code is 200 */
  expect(currencies.status()).toBe(200);
  /**verify status text is OK */
  expect(currencies.statusText()).toBe('OK');
  const response = await currencies.json()
  /**verify response body length is 105 */
  expect(response).toHaveLength(105);
  expect(response).toEqual(expectedCurrency)

});

test('Validation error -  GET currencies end-point', async ({ request }) => {
  let error = {
    "error": "NOT_FOUND"
  }
  const currenciesResponse = await request.get(`/public/v2/currencies`);
  expect(currenciesResponse.ok()).toBeFalsy();
  const response = await currenciesResponse.json();
  /**verify status code is 404 */
  expect(currenciesResponse.status()).toBe(404);
  /**verify status text is Not Found */
  expect(currenciesResponse.statusText()).toBe('Not Found');
  /** verify validation error is NOT_FOUND when path is invalid
   * changed v2 from v1 in the path
   */
  expect(response).toEqual(error)
});

