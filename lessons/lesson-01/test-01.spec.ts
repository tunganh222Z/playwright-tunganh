import { test, expect } from '@playwright/test';

let urlMaterial = "https://material.playwrightvn.com/";
let userName = "tunganh";
let email = "tunganh@gmail.com";
let HOBBIES_CHECK_BOX = "//input[@type='checkbox' and @name ='hobbies']";
let COUNTRY_DROPDOWN_LIST = "select#country";
let USER_NAME_TEXT_BOX = "input#username";
let EMAIL_TEXT_BOX = "input#email";

const registerData = {
      userName: "tunganh",
      email : "tunganh@gmail.com",
      hobbies: ['Reading', 'Traveling', 'Cooking'],
      interests : [
            { value: 'technology' },
            { value: 'art' },
            {value : 'music'},
      ],
      country: "canada",
      dob: "1997-08-09",
      rating: "6",
      newsLetter: true,
      enableFeature : true
};

test("Test 01 - Register Page",
      async ({ page }) => { 
            await test.step('Step 01 : Truy cập trang https://material.playwrightvn.com/, click vào “Bài học 3: Todo page”',
                  async () => {
                        await page.goto(urlMaterial);
                  }
            )

            await test.step('Step 02 : Click vào “Bài học 1: Register Page”. Verify hiển thị title “User Registration”',
                  async () => {
                        await page.getByRole("link", { name: "Bài học 1: Register Page" }).click();
                        const registerPageHeading = page.getByRole("heading", { name: "User Registration" });
                        await expect(registerPageHeading).toBeVisible({visible : true});
                  }
            )

            await test.step('Step 03 : Nhập đầy đủ các thông tin',
                  async () => {
                        await page.locator(USER_NAME_TEXT_BOX).fill(registerData.userName);
                        await page.locator(EMAIL_TEXT_BOX).fill(registerData.email);
                        await page.getByRole("radio", { name: "Male", exact: true }).click();
                        
                        for (const hobby of registerData.hobbies) {
                              await page.getByRole("checkbox", { name: hobby }).check();
                        }

                        await page.getByRole("listbox", { name: "Interests" }).selectOption(registerData.interests);
                        await page.getByRole("combobox", { name: "Country" }).selectOption(
                              { value: `${registerData.country}` }
                        );
                        await page.getByLabel("Date of Birth").fill(registerData.dob);
                        await page.locator("#rating").fill(registerData.rating);
                        await page.getByText("Hover over me").hover({ timeout: 1_000 });
                        expect(page.locator(".tooltiptext", { hasText: "Subscribe to our newsletter for updates" })).toBeVisible();
                        if (registerData.newsLetter) {
                              await page.locator("input#newsletter").check();
                        }

                        const ratingStars = await page.locator("#starRating").boundingBox();
                        if (ratingStars != null) {
                              const x = ratingStars.x + (4.5 / 5) * ratingStars.width;
                              const y = ratingStars.y + ratingStars.height / 2;
                              await page.mouse.click(x, y);
                        }

                        await page.getByRole("button", { name: "Register" }).click();
                  }
            )

      }
);

let ADD_TO_CART_PRODUCT1_BUTTON = `//div[text()='Product 1']/following-sibling::button`;
let ADD_TO_CART_PRODUCT2_BUTTON = `//div[text()='Product 2']/following-sibling::button`;
let ADD_TO_CART_PRODUCT3_BUTTON = `//div[text()='Product 3']/following-sibling::button`;

const productObjects = {
      product1: {
            id: 1,
            name: 'Product 1',
            price: '10.00',
            quantity : 2
      },
      product2: {
            id: 2,
            name: 'Product 2',
            price: '10.00',
            quantity : 3
      },
      product3: {
            id: 3,
            name: 'Product 3',
            price: '10.00',
            quantity : 1
      }
}

test("Test 02 - Product page",
      async ({ page }) => {
            await test.step('Step 1: Truy cập trang https://material.playwrightvn.com/, click vào “Bài học 2: Product page”',
                  async () => {
                        await page.goto(urlMaterial);
                        await page.getByRole("link", { name: "Bài học 2: Product page" }).click();
                  }
            )

            await test.step('Step 02 : thêm sản phẩm để giỏ hàng có số lượng sản phẩm như sau:', 
                  async () => {
                        await test.step('Sản phẩm 1: 2 sản phẩm', 
                              async () => {
                                    const product1 = productObjects.product1;
                                    await page.locator(`//div[text()='${product1.name}']/following-sibling::button`).click({ clickCount: product1.quantity });
                              }
                        )

                        await test.step('Sản phẩm 2: 3 sản phẩm', 
                              async () => {
                                    const product2 = productObjects.product2;
                                    await page.locator(`//div[text()='${product2.name}']/following-sibling::button`).click({clickCount : product2.quantity})
                              }
                        )

                        await test.step('Sản phẩm 3: 1 sản phẩm', 
                              async () => {
                                    const product3 = productObjects.product3;
                                    await page.locator(`//div[text()='${product3.name}']/following-sibling::button`).click({clickCount : product3.quantity})
                              }
                        )
                  }
            )
      }
);

test("Test 03 : Todo page",
      async ({ page }) => {
            page.on('dialog', dialog => dialog.accept());
            const maxTodoCount = 100;
            const maxOddCount = 50;
            const todoLocator = page.locator("//ul[@id='task-list']/li");
            await test.step("Step 1: Truy cập trang https://material.playwrightvn.com/, click vào “Bài học 3: Todo page",
                  async () => {
                        await page.goto(urlMaterial);
                        await page.getByRole('link', { name: "Bài học 3: Todo page" }).click();       
                  }     
            )

            await test.step('Thêm mới 100 todo items có nội dung "Todo <i>"',
                  async () => {
                        for (let index = 1; index <= 100; index++) {
                              await page.getByPlaceholder('Enter a new Task').fill(`Todo ${index}`);
                              await page.getByRole("button", { name: "Add Task" }).click();
                        }

                        await expect(todoLocator).toHaveCount(maxTodoCount);
                  }
            )

            await test.step('Step 03 : Xóa các todo có số lẻ', 
                  async () => {
                        for (let index = 0; index < maxOddCount; index++) {
                              const locator = page.locator("//ul[@id='task-list']/li/span").nth(index)
                              const text = await locator.innerText();
                              console.log(text);
                              if (isOddContent(text)) {
                                    await page.locator("//ul[@id='task-list']/li/div/button", { hasText: "Delete" }).nth(index).click();
                              }
                              await expect(locator).toHaveCount(maxOddCount);
                        }
                  }
            )

            function isOddContent(content : string): boolean {
                  const stringArray = content.split(/\s+/);
                  const number = Number(stringArray[1]);
                  return number % 2 != 0;
            }
            
      }
)

test("Test 04: Personal notes",
      async ({ page }) => {
            await page.goto(urlMaterial);
            await page.getByRole("link", { name: "Bài học 3: Todo page" }).click();
            for (let index = 0; index < 100; index++) {
                  await page.getByPlaceholder("Enter a new task").fill(`To Do ${index}`);
                  await page.getByRole("button", { name: "Add Task" }).click({delay : 0});
            }
      }
)

