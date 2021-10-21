const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify'); // slugify là phần cuối của URL chứa 1 chuỗi duy nhất xác định tài nguyên mà trang web đang hiển thị.

const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview = fs.readFileSync(`${__dirname}/views/overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/views/product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/views/card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const slugs = dataObject.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

// Khởi tạo một máy chủ: là kết quả của phương thức createServer()
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true) // ý nghĩa của true: để thực sự phân tích cú pháp truy vấn (query) thành một đối tượng

    if (pathname === "/" || pathname === "/overview") { // OVERVIEW PAGE
        res.writeHead(200, { "Content-type": "text/html" });

        // replaceTemplate lấy html của card (tempCard), 
        // el: chứa dữ liệu;  
        // join('') : nối phần tử trả về dưới dạng string
        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    } else if (pathname === "/product") { // PRODUCT PAGE
        res.writeHead(200, { "Content-type": "text/html" });
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    } else if (pathname === "/api") { // API
        res.writeHead(200, { "Content-type": "application/json" }); // hiển thị 
        res.end(data);

    } else { // NOT FOUND
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