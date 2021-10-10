const fs = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/views/overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/views/product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/views/card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// Khởi tạo một máy chủ: là kết quả của phương thức createServer()
const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });

        const cardsHTML = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.end(output);

        // Product page
    } else if (pathName === "/product") {
        res.end(tempProduct);

        // API
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);

        // NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type': "text/html",
            "my-own-header": "hello-world"
        });
        res.end("<h1>Page not found!</h1>");
    }
});



// param 1 : port , param 2 : địa chỉ IP tiêu chuẩn cho localhost 
// localhost: máy chủ cục bộ, chính là máy tính hiện tại đang chạy chương trình này
// listen: tiếp nhận các req đến
server.listen(8000, '127.0.0.1', () => {
    console.log("Server starting: http://localhost:8000"); // Hoặc ta có thể truy cập: 
})