import { test, expect } from '@playwright/test'


test.describe('Run test with visual testing',
      async () => {
            test('verify capture screen',
                  async ({ page }) => {
                        await page.goto("https://material.playwrightvn.com/");

                        await test.step('verify homePage displayed',
                              async () => {
                                    await expect(page).toHaveScreenshot("home.png");
                                    await expect(await page.screenshot({fullPage : true})).toMatchSnapshot("homepageFUll.png")
                        }
                  )
                  }

                  
            )
      }
)