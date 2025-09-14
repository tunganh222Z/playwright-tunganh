


// giải thích và cách hiểu về file playwright.config.ts

/**
 * export default defineConfig({
 * // testDir: './tests', sẽ trỏ thư mục chứa các file spec.ts để run test
 * fullyParallel true/false để chạy song song test
 * -- thông thường khi run test sẽ có 1 worker chạy, nếu là true cứ khác test sẽ chạy các worker riêng biệt
 * forbidOnly :    forbidOnly: !!process.env.CI
 *  -- là chỉ chạy test.Only chỉ chạy trên local
 *  retries: process.env.CI ? 2 : 0,
 * -- cơ chế re-try test khi test fail 
 * workers 
 * -- cấu hình bao nhiêu workers chạy song song, nếu là undeined thì chạy tối đa theo cấu hình máy số nhân cpu
 * 
 * user - baseUrl
 *  -- dùng để set baseUrl. await page.goto('/') -> goto baseUrl
 */