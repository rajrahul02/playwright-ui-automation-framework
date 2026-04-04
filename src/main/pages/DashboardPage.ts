import { Locator, Page } from "playwright";
import { expect } from '@playwright/test';


export class DashboardPage {

    readonly logoHeader: Locator;
    readonly itemPanel: Locator;
    readonly addToCartIcon: Locator;

    constructor(private readonly page: Page) {
        this.logoHeader = this.page.locator('.header_label');
        this.itemPanel = this.page.locator('.inventory_item_description');
        this.addToCartIcon = this.page.locator('.shopping_cart_link')
    }

    async verifyLogoHeader(headerText: string) {
        await expect(this.logoHeader).toContainText(headerText);
    }

    async addItemToCart(itemName: string) {
        const itemSection = this.itemPanel.filter({ hasText: itemName })
        await itemSection.locator('button').getByText('Add to cart').click();
    }

    async clickAddToCart() {
        await this.addToCartIcon.click();
    }
}