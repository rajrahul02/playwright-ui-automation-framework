import { Locator, Page } from "playwright";


export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        this.username = this.page.locator('#user-name');
        this.password = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

    async goto() {
    await this.page.goto('/'); 
  }

    async login(userName: string, password: string) {
        await this.username.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();

    }


}