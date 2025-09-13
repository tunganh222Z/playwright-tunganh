import { Page } from '@playwright/test';
import { LoginPage } from './login-page';


export function getPage (page :Page, pageName: string) {
      switch (pageName) {
            case "login":
                  return new LoginPage(page);
                  break;
      
            default:
                  break;
      }
}