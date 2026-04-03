import { chromium } from "playwright"
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from 'dotenv';

dotenv.config();

export default async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext({
    baseURL: process.env.AUTOMATION_BASE_URL,
  });
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const userName: string = process.env.AUTOMATION_USERNAME!;
    const password: string = process.env.AUTOMATION_PASSWORD!;

    await loginPage.goto();
    await loginPage.login(userName, password);

    await context.storageState({ path: './src/test/storageState/auth.json' });
    await browser.close();

}