import { test, expect } from '@playwright/test';

test('Get market ticker', async ({ request }) => {
    const ticker = await request.get(`public/v1/market-ticker`);
    /**verify status code is 200 */
    expect(ticker.status()).toBe(200);
    /**verify status text is OK */
    expect(ticker.statusText()).toBe('OK');
    /**verify Total instruments are 56 */
    expect(await ticker.json()).toHaveLength(56);

});

test('Validation error -  Market ticker end-point', async ({ request }) => {
    let error = {
        "error": "NOT_FOUND"
    }
    const ticker = await request.get(`public/v2/market-ticker`);
    expect(ticker.ok()).toBeFalsy();
    const response = await ticker.json();
    /**verify status code is 404 */
    expect(ticker.status()).toBe(404);
    /**verify status text is Not Found */
    expect(ticker.statusText()).toBe('Not Found');
    /** verify validation error is NOT_FOUND when path is invalid
     * changed v2 from v1 in the path
     */
    expect(response).toEqual(error)
});

