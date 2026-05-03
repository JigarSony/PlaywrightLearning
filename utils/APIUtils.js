class APIUtils {

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                // 'Authorization': this.getToken(),
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        const orderId = await orderResponseJson.orders[0]; // currently getting an error here --fixed
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils};