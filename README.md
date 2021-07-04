# Lavkus Shop
This is practice of my graduate work at university. "Lavkus" is a concept store, where people can pay for the products with their faces. The application has a client-server architecture. The clients are [Personal Account](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#personal-account) and [Payment Terminal](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#payment-terminal). The server is REST API. Technology stack is PERN (Postgres Express React Node.js).

## Extra libs
I used [face-api.js](https://github.com/justadudewhohacks/face-api.js) for face recognition and [qr-scanner](https://github.com/nimiq/qr-scanner) for getting info from QR-code of product.

## Personal account
Personal account is a web application for register of new users in our system. [Registration](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#sign-in-and-sign-up) includes the next steps: 
- collecting personal information; 
- taking a photo of user face;
- confirmation of correctness of collected data.

User can do the following actions in the app after registration:
- [edit personal info](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#edit-personal-info);
- [view and fefill wallet](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#wallet);
- [view history of buyings](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#history).

JWT (Json Web Token) is used for authentification.

### Home page
![Home_page_1](https://user-images.githubusercontent.com/41856433/124354249-cc006780-dc13-11eb-8339-d81f09c7b5c5.png)
![Home_page_2](https://user-images.githubusercontent.com/41856433/124354254-d3277580-dc13-11eb-95b6-305eac127960.png)

### Sign In and Sign Up
![Sign_In](https://user-images.githubusercontent.com/41856433/124354287-fd793300-dc13-11eb-8b65-1e7548a2f9e2.png)
![Sign_Up_1](https://user-images.githubusercontent.com/41856433/124365298-b6a92e80-dc4f-11eb-90ae-3c217c6536ad.png)
![Sign_Up_2](https://user-images.githubusercontent.com/41856433/124365133-b2c8dc80-dc4e-11eb-81db-a09a11ba6785.png)
![Sign_Up_3](https://user-images.githubusercontent.com/41856433/124365194-12bf8300-dc4f-11eb-83f5-f7f2e3f1dc42.png)

### Main page
![Main_page_1](https://user-images.githubusercontent.com/41856433/124354788-6a8dc800-dc16-11eb-9971-9aabe568282d.png)
![Main_page_2](https://user-images.githubusercontent.com/41856433/124364831-a0e63a00-dc4c-11eb-8eb1-aff90a020d20.png)

### Edit personal info
![Edit_personal_data_1](https://user-images.githubusercontent.com/41856433/124365527-587d4b00-dc51-11eb-8e9c-5799789fbbc1.png)
![Edit_personal_data_2](https://user-images.githubusercontent.com/41856433/124364952-a728e600-dc4d-11eb-972f-2b29dcdfd8db.png)

### Wallet
![Wallet](https://user-images.githubusercontent.com/41856433/124354423-9dcf5780-dc14-11eb-913a-a4d4c1ea80d6.png)

### History
![History](https://user-images.githubusercontent.com/41856433/124354433-a6279280-dc14-11eb-9ba6-5ac8c54eadef.png)


## Payment Terminal
[Payment Terminal](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#termianl-ui) is a web application for adding some products in the cart and pay it with your face. Buying includes only two simple steps:
1. [scannig product with QR-code](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#scanning-qr-code-of-product);
2. [tap on "Оплатить" button, when your face is in the camera's field of view](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#payment).

In the end user will receive a [notification](https://github.com/maxgeekcom/lavkus-shop/blob/main/README.md#notification-of-successful-payment) about the status payment.
### Terminal UI
![Payment_terminal_1](https://user-images.githubusercontent.com/41856433/124352194-ad946f00-dc07-11eb-9c12-6ca81221fa84.png)

### Scanning QR-code of product
![Payment_terminal_2](https://user-images.githubusercontent.com/41856433/124352205-bd13b800-dc07-11eb-815c-f9ab741d5cdf.png)

### Payment
![Payment_terminal_3](https://user-images.githubusercontent.com/41856433/124352207-c2710280-dc07-11eb-83d9-cb7d6fd2ae64.png)

### Notification of successful payment
![Payment_terminal_4](https://user-images.githubusercontent.com/41856433/124352209-c6048980-dc07-11eb-9f6e-73bcc62c3f7f.png)
 
