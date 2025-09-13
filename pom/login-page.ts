import { Page, Locator } from '@playwright/test';
import { DashboardPage } from './dashboard-page';


export class LoginPage {
      page: Page;
      userNameLocator: Locator;
      passWordLocator: Locator;
      loginButtonLocator: Locator;

      constructor(page: Page) {
            this.page = page;
            this.userNameLocator = page.locator("selector");
            this.passWordLocator = page.locator("selector");
            this.loginButtonLocator = page.locator("selector");
      }

      async fillUserName(userName: string) {
            await this.userNameLocator.fill(userName);
      }

      async fillPassword(password: string) {
            await this.passWordLocator.fill(password);
      }

      async clickLoginButton() {
            await this.loginButtonLocator.click();
            return new DashboardPage(this.page);
      }

      async login(userName: string, password: string) {
            await this.fillUserName(userName);
            await this.fillPassword(password);
            await this.clickLoginButton();
      }

      async testLogin(userName: string, password: string): Promise<DashboardPage> {
            return new DashboardPage(this.page);;
      }

}