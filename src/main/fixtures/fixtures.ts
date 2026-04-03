import {test as base, Page} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CartPage } from "../pages/CartPage";

export const test = base.extend<{
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
}>({
    loginPage: async({ page }, use) =>{
        const loginPage = new LoginPage(page);
        await use(loginPage);

    },

    dashboardPage: async({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage)
    },

    cartPage: async({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }
})

export {expect} from "@playwright/test"