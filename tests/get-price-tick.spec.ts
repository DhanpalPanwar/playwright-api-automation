import { test, expect } from '@playwright/test';
const instrument_code: string = "BTC_EUR";

const queryparams = {
    unit: "HOURS",
    period: 1,
    from: "2019-10-03T03:59:59.000Z",
    to: "2019-10-03T07:59:59.000Z"
};

test(`GET price ticks for a specific market`, async ({ request }) => {
    const price = await request.get(`/public/v1/price-ticks/${instrument_code}`);
    const response = await price.json();
    expect(price.status()).toBe(200);
    expect(price.statusText()).toBe('OK');
    expect(response.length).toBeGreaterThanOrEqual(1);
});

test('Validation error -  price ticks end-point', async ({ request }) => {
    let error = {
        "error": "INVALID_TIME_RANGE"
    }
    const price = await request.get(`/public/v1/price-ticks/${instrument_code}`, {
        params: queryparams
    });
    const response = await price.json();
    expect(price.status()).toBe(400);
    expect(price.statusText()).toBe('Bad Request');
    /**Verify validation error with in-correct insturment code */
    expect(response).toEqual(error);
});

