import { test, expect } from '@playwright/test';
/**imprt the instruments json the response will be validated against this data
 */
import expectedInstruments from "../test-data/instruments.json";

test('Get a list of all available trade instruments', async ({ request }) => {
    const instruments = await request.get(`/public/v1/instruments`);
    /**verify status code is 200 */
    expect(instruments.status()).toBe(200);
    /**verify status text is OK */
    expect(instruments.statusText()).toBe('OK');
    /**verify Total instruments are 56 */
    expect(await instruments.json()).toHaveLength(56);
    expect(await instruments.json()).toEqual(expectedInstruments)

});

test('Validation error -  Instruments end-point', async ({ request }) => {
    let error = {
        "error": "NOT_FOUND"
    }
    const instruments = await request.get(`/public/v2/instruments`);
    expect(instruments.ok()).toBeFalsy();
    const response = await instruments.json();
    /**verify status code is 404 */
    expect(instruments.status()).toBe(404);
    /**verify status text is Not Found */
    expect(instruments.statusText()).toBe('Not Found');
    /** verify validation error is NOT_FOUND when path is invalid
     * changed v2 from v1 in the path
     */
    expect(response).toEqual(error)
});

