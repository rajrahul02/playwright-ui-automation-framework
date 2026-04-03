import { Locator, Page } from "playwright";
import { expect } from "playwright/test";


export class CartPage{

    readonly itemDetailsPanel: Locator;

    constructor(private readonly page: Page){
        this.itemDetailsPanel = this.page.locator('.cart_item')
    }

    async verifyItemAddedinCart(itemName: string){
        const itemSection = this.itemDetailsPanel.filter({hasText: itemName});
        await expect(itemSection).toBeVisible();
    }
}