import { LoginPage } from "./login-page";
import { Page } from '@playwright/test';

export class DashboardPage extends LoginPage {
      constructor(page: Page) {
            super(page);
      }

      async goToDashBoardPage() {
            super.login("userName", "password");
      }
}