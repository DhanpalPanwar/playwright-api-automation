import { test, expect } from '@playwright/test';

test(`Get details of all general Fee Groups`, async ({ request }) => {
    const feeGroups = await request.get(`/public/v1/fees`);
    const response = await feeGroups.json();
    //console.log(await response.json());
    expect(feeGroups.status()).toBe(200);
    expect(feeGroups.statusText()).toBe('OK');
    expect(response).toHaveLength(1);
    expect(response[0].fee_group_id).toBe('default')
    expect(response[0].display_text).toBe('The standard fee plan.')
    expect(response[0].volume_currency).toBe('EUR')
    expect(response[0].fee_tiers).toContainEqual({
        "volume": "1000.0",
        "fee_group_id": "default",
        "maker_fee": "0.0",
        "taker_fee": "0.0"
    })

});

test('Validation error -  GET Fee group end-point', async ({ request }) => {
    let error = {
        "error": "NOT_FOUND"
    }
    const feeGroups = await request.get(`/public/v2/fees`);
    expect(feeGroups.ok()).toBeFalsy();
    const response = await feeGroups.json();
    expect(feeGroups.status()).toBe(404);
    expect(feeGroups.statusText()).toBe('Not Found');
    /** verify validation error is NOT_FOUND when path is invalid
     * changed v2 from v1 in the path
     */
    expect(response).toEqual(error)
});

