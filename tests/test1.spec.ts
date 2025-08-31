import { test, expect } from '@playwright/test';

let materialURL = 'https://material.playwrightvn.com/';
let eCommerceURL = 'https://e-commerce.betterbytesvn.com/';

test('demo', async ({page}) => {
      await page.goto(eCommerceURL);
      await expect(page).toHaveTitle("Automation test site – Automation test site");
})

test('PW selector', async ({ page }) => {
      await page.goto(materialURL);
      await page.getByRole("link", { name: "	Bài học 1: Register Page (có đủ các element)" }).click();
      await page.getByRole("heading", { name: "Registration" }).isVisible();
      
      await page.getByText("Registration").isVisible();
      await page.getByLabel("Username").fill("demo");
      await page.getByPlaceholder("");
      await page.getByAltText("");

      // nếu trong dự án có đặt testId còn nếu không đặt testId mà chỉ là id thì có thể setIdAttribute
      await page.getByTestId("");

      // ví dụ getByLable có 2 thằng userName thì dung filter
      await page.getByLabel("userName").nth(1);

      //Trường hợp thẻ không có id, class thì tìm như nào
})

test('PW input', async ({ page }) => {
      await page.goto(materialURL);
      await page.locator("//input").fill('testFill',);
      //gõ tuần tự từng chữ vào
      await page.getByLabel('userName').pressSequentially('demo', { delay: 1_000 });
      await page.getByLabel('userName').clear();

      // cho nó vào một biến
      const userNameLocator = await page.getByLabel('userName');
      await userNameLocator.fill('demo');

      const genderRadioButton1 = await page.getByRole('radio', { name: "Male" }); // => việc tìm như này là relative, Female vẫn bắt ra được
      const genderRadioButton = await page.getByRole('radio', { name: "Male", exact: true }); // => tìm giá trị tuyệt đối của text
      await genderRadioButton.check();
      const isChecked = await genderRadioButton.isChecked();
})

test('PW button', async ({ page }) => {
      await page.locator('//locator').click();
      await page.locator('//locator').dblclick();

      // right click
      await page.locator('//locator').click({ button: 'right' });

      // Click with other button
      await page.locator('//locator').click({ modifiers: ['Shift'] });
})

test('PW Hover', async ({ page }) => {
      const endPointDragAndDropGame = '05-xpath-drag-and-drop.html';
      await page.goto(materialURL + endPointDragAndDropGame);
      
      const dropElements = await page.locator('//div[@data-piece]').all();
      
      for (let i = 1; i < dropElements.length; i++) {
      
            const dragElement = await page.locator(`//div[@id='piece-${i}']`);
            

            const dropElement = await page.locator(`//div[@data-piece=${i}]`);
            
            await dragElement.dragTo(dropElement);
            await page.waitForTimeout(2_000);
            
      }
})

test('PW uploadFile', async ({ page }) => {
      await page.locator("//locator").setInputFiles("//file//path");
      // nhieuef file
      await page.locator("//locator").setInputFiles([
            "//file//path",
            "//file/path2"
      ]);
})

test('PW iFrame', async ({ page }) => {
      const iFrameElement = await page.frameLocator("iFrameLocator");
      // get value in Iframe
      const elementOfIframe = iFrameElement.locator('//locator');
      const stringText = await elementOfIframe.textContent();
      console.log(stringText);
})

test('expect',
      async ({ page }) => {
            const testElement = await page.locator("//xpath");
            await expect(testElement).not.toBeVisible();
            await expect(testElement).not.toBeVisible({timeout: 2_000});
      }
)