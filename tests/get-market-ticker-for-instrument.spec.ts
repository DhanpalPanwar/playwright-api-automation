import { test, expect } from '@playwright/test';
/**imprt the instruments json the response will be validated against this data
 */

const instrument_code = "BTC_EUR";

test('Get statistics on a single market.', async ({ request }) => {
    const ticker = await request.get(`public/v1/market-ticker/${instrument_code}`);
    /**verify status code is 200 */
    expect(ticker.status()).toBe(200);
    /**verify status text is OK */
    expect(ticker.statusText()).toBe('OK');
    const response: any = await ticker.json();
    expect(response.instrument_code).toBe("BTC_EUR");
    expect(response.state).toBe("ACTIVE");

});

test('Validation error -  Single market end-point', async ({ request }) => {
    let error = {
        "error": "INVALID_INSTRUMENT_CODE"
    }
    const ticker = await request.get(`public/v1/market-ticker/BTC`);
    expect(ticker.ok()).toBeFalsy();
    const response = await ticker.json();
    /**verify status code is 404 */
    expect(ticker.status()).toBe(400);
    /**verify status text is Not Found */
    expect(ticker.statusText()).toBe('Bad Request');
    /** verify validation error is NOT_FOUND when path is invalid
     * changed v2 from v1 in the path
     */
    expect(response).toEqual(error)
});

