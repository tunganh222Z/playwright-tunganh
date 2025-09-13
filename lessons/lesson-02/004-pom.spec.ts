import { test } from '@playwright/test';
import { LoginPage } from '../../pom/login-page';
import { DashboardPage } from '../../pom/dashboard-page';
import { getPage } from '../../pom/pom-manager';

test.describe('POM',
      async () => {
      
            test('Login test with pom LoginPage',
                  async ({ page }) => {
                        const loginPage = new LoginPage(page);
                        await loginPage.fillUserName("userName");
                        await loginPage.clickLoginButton();
                  }
            )

            test('DashBoard extends LoginPage',
                  async ({ page }) => {
                        const dashBoardPage = new DashboardPage(page);
                        await dashBoardPage.goToDashBoardPage();
                  }
            )

            test('pom manager', 
                  async ({ page }) => {
                        const loginPage = getPage(page, "loginPage");
                  }
            )
      }
)