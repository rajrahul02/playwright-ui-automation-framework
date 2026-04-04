import { test } from "../../../main/fixtures/fixtures";
import testData from "../../testdata/verify_order_placed.json"



test('verify order placed', async ({ page, dashboardPage, cartPage }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await dashboardPage.verifyLogoHeader(testData.logoHeader);
    for (const item of testData.items) {
        await dashboardPage.addItemToCart(item);
    }
    await dashboardPage.clickAddToCart();
    for (const item of testData.items) {
        await cartPage.verifyItemAddedinCart(item);
    }


});