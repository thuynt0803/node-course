/* ======================== FILES ======================== */
const fs = require('fs');

// 1. Ghi file theo cách đồng bộ: Blocking, synchronous 
/* const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `Here are some words I wrote: ${textIn}.\nCreated on:  ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log("File written!"); */


// 2. Đọc - Ghi file theo cách không đồng bộ: Non-blocking, asynchronous
/* fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log("ERROR!");
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log("Your file has been written :D ");
            });
        });
    });
});
console.log("Will read file!"); */


// 3. Đọc - ghi file .json : theo cách không đồng bộ
const post = {
    title: "Dung lua chon an nhan khi con tre",
    time: "10/10/2021",
    content: "Ha Noi vao dong voi con mua hiu quanh ... Mua mai chang ngung.",
    tag: "Life"
};

/* Ghi file .JSON */
const postJSON = JSON.stringify(post);

fs.writeFile(`${__dirname}/txt/post.json`, postJSON, err => {
    console.log("Your file has been written :D ");
}); // Lưu object vào file .json

/* Đọc file .JSON */
fs.readFile(`${__dirname}/txt/post.json`, "utf-8", (err, data) => {
    if (err) {
        console.log("ERROR!");
    } else {
        const postData = JSON.parse(data); // chuyển từ dạng string về dạng object (kiểu dữ liệu ban đầu)
        console.log(postData.tag); // Có thể truy cập vào thuộc tính của object rùi nè!!!
    }
});

console.log("Will read file!\n");