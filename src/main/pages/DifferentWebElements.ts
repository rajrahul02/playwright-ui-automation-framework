import { expect } from "@playwright/test";
import { count } from "node:console";
import { Locator, Page } from "playwright";



export class DifferentWebElements {

    readonly suggestionDropDown: Locator;
    readonly suggestedList: Locator;
    readonly dropDown: Locator;
    readonly checkBox: Locator;
    readonly newWindow: Locator;
    readonly newTab: Locator;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly staticWebTable: Locator;
    readonly fixedHeaderWebTable: Locator;

    constructor(private readonly page: Page) {
        this.suggestionDropDown = this.page.locator('.inputs.ui-autocomplete-input');
        this.suggestedList = this.page.locator('.ui-menu-item');
        this.dropDown = this.page.locator('#dropdown-class-example');
        this.checkBox = this.page.locator('input[type="checkbox"]');
        this.newWindow = this.page.locator('#openwindow');
        this.newTab = this.page.locator('#opentab');
        this.alertButton = this.page.locator('#alertbtn');
        this.confirmButton = this.page.locator('#confirmbtn');
        this.staticWebTable = this.page.locator('table[name="courses"]');
        this.fixedHeaderWebTable = this.page.locator('.tableFixHead').locator('table[id="product"]');
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    }

    async clickRadioButton(text: string) {
        const radioButton = this.page.locator('input[value=' + text + ']');
        await radioButton.click();
    }

    async selectCountryFromSuggestion(keyword: string, country: string) {
        await this.suggestionDropDown.fill(keyword);
        await expect(this.suggestedList.getByText(country, { exact: true })).toBeVisible();
        await this.suggestedList.getByText(country, { exact: true }).click();
    }

    async selectDropDown(value: string) {
        this.dropDown.selectOption(value);
    }

    async selectCheckBox(text: string) {
        const checboxOPtions = await this.checkBox.all();
        for (const option of checboxOPtions!) {
            if (await option.getAttribute('value') === text) {
                await option.click();
            }
        }
    }

    async openWindow() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.newWindow.click()
        ])
        await newPage.waitForLoadState();
        // await expect(newPage.getByTestId('parkwebLayout').filter({hasText: 'qaclickacademy.com'})).toBeVisible();
        await expect(newPage.getByText('Access Denied')).toBeVisible();
        await newPage.close();
    }

    async openNewTab() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.newTab.click()
        ])
        await expect(newPage.getByText('Access Denied')).toBeVisible();
        await newPage.close();
    }

    async handleAlert() {
        this.page.on('dialog', async alert => {
            alert.accept();
        })
        this.alertButton.click();
        await this.page.waitForTimeout(2000)
    }

    async confirmAlert(text: string) {
        this.page.on('dialog', async alert => {
            alert.accept(text);
        })
        this.confirmButton.click();
    }

    async verifyStaticWebTable(course: string, fee: string) {
        const courseRow = this.staticWebTable.locator('tbody tr td', { hasText: course });
        await expect(courseRow.locator('..').locator('td').nth(2)).toHaveText(fee);

    }

    async verifyFixedHeaderWebTable(name: string, position: string, city: string, amount: string) {
        const prodcutRow = this.fixedHeaderWebTable.locator('tbody tr td', { hasText: name });
        await prodcutRow.scrollIntoViewIfNeeded();
        const columns = prodcutRow.locator('..').locator('td');
        await expect(columns.nth(1)).toHaveText(position);
        await expect(columns.nth(2)).toHaveText(city);
        await expect(columns.nth(3)).toHaveText(amount);
    }
}