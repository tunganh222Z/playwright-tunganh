import { test } from '@playwright/test';

test.describe('test hook demo',
      async () => {
            test.beforeAll(() => {
                  console.log("before all run");
            });

            test.afterAll(() => {
                  console.log("after all run");
            }); 

            test.beforeEach(() => {
                  
            });
            
            test.afterEach(() => {
                  
            });

            test('test1',
                  async () => {
                        console.log("running test 1");
                  }
            );

            test('test2',
                  async () => {
                        console.log("running test 2");
                  }
            );
      }
);