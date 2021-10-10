# NODE.JS and NPM

## What is Node.js and Why use it?

> Node.JS là một JavaScript Runtime được xây dựng trên công cụ JavaScript V8, open source của Google.

### JavaScript Runtime:

Tool demo JS Runtime: http://latentflip.com/loupe

Link video tham khảo: https://www.youtube.com/watch?v=IGkz8Zu9rRk

    - JS chạy trong 1 container (phầm mềm đọc và thực thi code JS):
        * JS engine: Đọc code và chuyển thành các đoạn mã để container có thể hiểu.
        * JS Runtime Enviroment: Thực thi mã; cung cấp các đối tượng và môi trường để JS giao tiếp với máy tính.
    - Chrome Browser và Node.js đều sử dụng chung JavaScript Engine là V8. Tuy nhiên JavaScript Runtime Enviroment trong 2 TH này khác nhau:
        * Chrome Browser sử dụng các đối tượng như window, DOM object hay các method như AJAX… để giao tiếp với network và hiển thị.
        * Node.js cung cấp các thư viện cho phép truy cập trực tiếp các file trên máy tính, truy cập database, tiến trình (Chrome Browser không làm được các việc này)

> JS, HTML, CSS có thể thực thi ngay trong browser (phía sau nó là Javascript run time)
> Node.js bản chất cũng là một Javascript runtime (giống browser, tuy nhiên JS có thể được thực thi mà không gặp phải tất cả các hạn chế mà nó gặp phải trong browser). Nó giống như một container, hoặc enviroment trong đó một chương trình được viết bằng JS có thể được thực thi

### V8 - Javascript engine đằng sau Chrome và Node.js:

> V8 (hay Chrome V8) - là một Javascript engine được phát triển bởi google (viết bằng C++), mục đích ban đầu là dành cho GG Chrome, ra mắt 12/2008. Năm 2009, Node.js ra mắt và sử dụng V8 làm Javascript engine.

> V8 là nơi mã JS được phân tích cú pháp và chạy trong NodeJS

> Javascript engine: là một chương trình hoặc trình thông dịch thực thi mã Javascript (JS là ngôn ngữ thông dịch). Nó có thể được thực hiện như một trình thông dịch tiêu chuẩn, hoặc compiler (trình biên dịch) phù hợp để biên dịch JavaScript thành bytecode trong một số hình thức.

Ngoài V8 còn có 1 vài Javascript engine khác:

        * SpiderMonkey  - Javascript engine đầu tiên, được dùng trên trình duyệt web đầu tiên trên thế giới - Netscape Navigator, hiện tại đang được sử dụng trên Firefox, viết bằng C và C++.
        * KJS — engine của KDE được phát triển bởi Harri Porten cho trình duyệt web KDEproject’s Konqueror.
        * Chakra (JScript9) — Internet Explorer.
        * Chakra (JavaScript) — Microsoft Edge.
        * Nashorn, mã nguồn mở như là một phần của OpenJDK, được viết bởi Oracle Java Languages và Tool Group
        * JerryScript —Là một công cụ nhẹ cho Internet of Things.
        * Rhino - Một Engine viết hoàn toàn bằng Java, cũng có lịch sử phát triển lâu đời từ Netscape Navigator, hiện tại được phát triển bởi Mozilla Foundation.
        * JavaScriptCore — được biết đến là Nitro và do Apple phát triển cho Safari

Có thể đọc thêm về V8 tại đây: https://topdev.vn/blog/cach-thuc-hoat-dong-cua-javascript-v8-engine-va-5-meo-toi-uu-hoa/

### Javascript on the server:

> Javascript có thể thực thi trong môi trường độc lập - NodeJS. Tại đây, ta có thể làm nhiều thứ hơn (những cái không bị hạn chế trên browser), ví dụ như: truy cập file system; khả năng kết nối internet tốt hơn ... => Đây là điều kiện để sử dụng NodeJS làm web server.

Một số trường hợp sử dụng Node và lý do nó phù hợp để phát triển backend:

    - Các UD NodeJS rất nhanh và có thể mở rộng (các UD web chuyên sâu về dữ liệu): vì NodeJS là máy chủ đơn luồng hoạt động dựa trên kiến trúc hướng sự kiện (Event-driven) và cơ chế non-blocking I/O (cơ chế xử lý bất đồng bộ - không đồng bộ) => NodeJS nhẹ, hiệu quả.
    - Sử dụng NodeJS phát triển các UD:
        * RESTful API (tốt nhất là CSDL NoSQL : MongoDB)
        * Data streaming (giố ng YouTuBe hoặc Netflix)
        * Real-time chat application
        * Server-side web application
    - Một vài UD không nên xây dựng bằng Node (vì phải xử lý phía server siêu nặng):
        * UD thao tác hình ảnh, chuyển đổi video, nén tập tin, ... => suggest sử dụng: Ruby on Raild, PHP hoặc Python.

### Special:

> Các UD xây dựng bằng NodeJS có thể sử dụng cùng một ngôn ngữ JS cho cả frontend và backend :))
> NodeSJ có một thư viện khổng lồ gồm open source packages and modules - NPM

### NPM:

> NPM (Node Package Manager): là một công cụ tạo và quản lý các thư viện javascript cho Nodejs.

Cài đặt NPM:

    - NPM có sẵn khi bạn tải NodeJS về. Sử dụng lệnh: "npm -v" để kiểm tra version hiện tại đang được install

Cài đặt global và local:

    - Local: sẽ tạo ra thư mục node_modules nếu chưa có trong project hoặc nếu có rồi nó sẽ lấy code của gói cần cài đặt đưa vào đây, tức chỉ hiện diện trong thư mục của project hiện tại. Khi cần sử dụng bạn có thể sử dụng lệnh require().
    - Global: sẽ lưu trữ code của gói trong các file hệ thống cố định trong máy, chỉ có thể dùng các package này thông qua các hàm CLI (Command Line Interface) ví dụ như gulp. Không thể dùng package thông qua require().

Kiểm tra các package đang được instal:

    - npm ls (check packages local)
    - npm ls g (check packages global)

### Synchronous & Asynchronous (Blocking & Non-blocking)

Synchronous (đồng bộ):

> Mỗi câu lệnh sẽ được xử lý lần lượt từng dòng một, từ trên xuống dưới, dòng sau được thực thi sau khi có kết quả của dòng trước. Một hoạt động nhất định chỉ có thể được thực hiện sau khi cái trước đã kết thúc.
> Mỗi dòng đều chặn việc thực thi của các phần còn lại của code => Vì vậy mới nói: synchronous code là blocking code

Asynchronous (không đồng bộ):

    - Kiến trúc xử lý bất đồng bộ trong Node.js: https://dev.to/mnhattt/kin-trc-x-l-bt-ng-b-trong-nodejs-nnf
    - I/O: viết tắt của input - output: là những thứ như truy cập file system và xử lý các request internet.
    => Đây là lý do Node.js được thiết kế xung quanh các hàm callback()
    - Callbacks khác với asynchronous  (không đồng bộ):

> Chú ý: Khi sử dụng lệnh callback trong code, điều đó không tự động làm cho nó không đồng bộ
> Node.js triển khai các hoạt động không đồng bộ bằng cách gọi các cuộc gọi lại (callback) sau khi hoạt động mà nó đang làm đã được hoàn thành.

## Routing:

> Routing có ý nghĩa thực hiện các hành động khác nhau cho các URL khác nhau.
> Routing được xây dựng trong code và routing được truy cập từ browser không liên quan gì đến các file, folder trong hệ thống file của project.

## API:

    - Hiểu cơ bản: API là một dịch vụ mà từ đó chúng ta có thể yêu cầu một số dữ liệu
