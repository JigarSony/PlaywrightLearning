class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator('#login');
        this.useName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');

    }

    async validLogin(username,password) {
        await this.useName.fill(username);
        await this.password.fill(password);;
        await this.signInbutton.click();
        // wait for ideal in network calls
        await this.page.waitForLoadState('networkidle');
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
module.exports = {LoginPage};