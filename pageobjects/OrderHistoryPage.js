class OrderHistorypage {
    constructor(page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.row = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }
    async searchorderAndSelect(orderId) {
        await this.orderTable.waitFor();

        for (let i = 0; i < await this.row.count(); ++i) {
            const rowOrderId = await this.row.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.row.nth(i).locator("button").first().click();
                break;
            }
        }
    }
    async getOrderId() {
        return await this.orderIdDetails.textContent();
    }
}
module.exports = { OrderHistorypage }