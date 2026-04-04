import { test } from "../../../main/fixtures/fixtures";
import testData from "../../testdata/verify_different_webelements.json"



test("Validate Different WebElements", async ({ differentWebElements }) => {
    await differentWebElements.goto();
    await differentWebElements.clickRadioButton(testData.radioBUtton);
    await differentWebElements.selectCountryFromSuggestion(testData.keywords, testData.country);
    await differentWebElements.selectDropDown(testData.dropDOwnValue);
    for (const checkBoxOPtion of testData.checkBox) {
        await differentWebElements.selectCheckBox(checkBoxOPtion);
    }
    await differentWebElements.openWindow();
    await differentWebElements.openNewTab();
    await differentWebElements.confirmAlert(testData.alertText);
    await differentWebElements.verifyStaticWebTable(testData.course, testData.fee);
    for(const product of testData.product){
        await differentWebElements.verifyFixedHeaderWebTable(product.name, product.position, product.city, product.amount)
    }
    await differentWebElements.mouseHOver(testData.hoverPosition);
    await differentWebElements.verifyFrame();
})