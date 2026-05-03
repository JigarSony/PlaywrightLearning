const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderHistorypage } = require("./OrderHistoryPage");
const { CartPage } = require("./CartPage");
const { OrderReviewPage } = require("./OrderReviewPage");


class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
        this.orderHistoryPage = new OrderHistorypage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrderReviewPage(){
        return this.orderReviewPage;
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports = {POManager};