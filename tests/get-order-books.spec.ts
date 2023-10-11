import { test, expect } from '@playwright/test';

const instrument_code: string = "BTC_EUR";
const queryparams = {
    level: 2,
    depth: 2,
};

test(`Get given instrument's order book.`, async ({ request }) => {
    const candlesticks = await request.get(`/public/v1/order-book/${instrument_code}`, {
        params: queryparams
    });
    const response = await candlesticks.json();
    console.log(response)
    expect(candlesticks.status()).toBe(200);
    expect(candlesticks.statusText()).toBe('OK');
    expect(response.instrument_code).toBe("BTC_EUR");
    /**since depth is 2, hence there will be 2 bids/ask */
    expect(response.bids).toHaveLength(2);
    expect(response.bids).toHaveLength(2);

});

test('Validation error -  Invalid Order book depth', async ({ request }) => {
    let error = {
        "error": "INVALID_ORDER_BOOK_DEPTH"
    }
    const candlesticks = await request.get(`/public/v1/order-book/${instrument_code}`, {
        params: {
            level: 1,
            depth: 2,
        }
    });
    const response = await candlesticks.json();
    expect(candlesticks.status()).toBe(400);
    expect(candlesticks.statusText()).toBe('Bad Request');
    /**Verify validation error with in-correct insturment code */
    expect(response).toEqual(error);
});

