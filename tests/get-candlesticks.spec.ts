import { test, expect } from '@playwright/test';
const instrument_code: string = "BTC_EUR";

const queryparams = {
    unit: "HOURS",
    period: 1,
    from: "2019-10-03T03:59:59.000Z",
    to: "2019-10-03T07:59:59.000Z"
}

test(`Get instrument's candlesticks`, async ({ request }) => {
    const candlesticks = await request.get(`/public/v1/candlesticks/${instrument_code}`, {
        params: queryparams
    });
    const response = await candlesticks.json();
    expect(candlesticks.status()).toBe(200);
    expect(candlesticks.statusText()).toBe('OK');
    expect(response).toHaveLength(3);
    /**verify that one of the object exist in the response body
     * can remove the below object in a variable to make the test cleaner
     */
    expect(response).toContainEqual({
        instrument_code: 'BTC_EUR',
        granularity: { unit: 'HOURS', period: 1 },
        high: '7658.87',
        low: '7633.86',
        open: '7634.26',
        close: '7633.86',
        total_amount: '0.27459',
        volume: '2097.5213865',
        time: '2019-10-03T04:59:59.999999Z',
        last_sequence: 49838
    })

});

test('Validation error -  Invalid instrument code', async ({ request }) => {
    let error = {
        "error": "INVALID_INSTRUMENT_CODE"
    }
    const candlesticks = await request.get(`/public/v1/candlesticks/${instrument_code}R`, {
        params: queryparams
    });
    const response = await candlesticks.json();
    expect(candlesticks.status()).toBe(400);
    expect(candlesticks.statusText()).toBe('Bad Request');
    /**Verify validation error with in-correct insturment code */
    expect(response).toEqual(error)
});

