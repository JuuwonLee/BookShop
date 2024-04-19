// const conn = require('../mariadb');
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

// 주문하기
const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        // timezone : 'Asia/Seoul',
        database: 'BookShop',
        dateStrings: true
    });


    const { items, delivery, totalQuantity, totalPrice, userId, fisrtBookTitle } = req.body;
    // delivery 테이블 삽입
    let sql = "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.execute(sql, values);
    let delivery_id = results.insertId;


    // orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
    values = [fisrtBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await conn.query(sql, values);
    
    let order_id = results.insertId;

    // items를 가지고, 장바구니에서 book_id, quantity 조회
    sql = 'SELECT book_id, quantity FROM cartItems WHERE id IN (?)';
    let [orderItems, fields] = await conn.query(sql, [items]);

    // orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    values = [];
    orderItems.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    })

    results = await conn.query(sql, [values]);

    let result = deleteCartItems(conn, items);

    res.status(StatusCodes.OK).json(result);
};


const deleteCartItems = async (conn, items) => {
    let sql = `DELETE FROM cartItems WHERE id IN (?)`;

    let result = await conn.query(sql, [items]);

    return result;
}


// 주문 목록 조회
const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        // timezone : 'Asia/Seoul',
        database: 'BookShop',
        dateStrings: true
    });

    let sql = `SELECT orders.id, created_at, address, receiver, contact, book_title,
                total_quantity, total_price
                FROM orders LEFT JOIN delivery
                ON orders.delivery_id = delivery.id`

    let [rows, fields] = await conn.query(sql);
    res.status(StatusCodes.OK).json(rows);

};
// 주문 상세 상품 조회
const getOrderDetail = async (req, res) => {
    const {id} = req.params;
    
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        // timezone : 'Asia/Seoul',
        database: 'BookShop',
        dateStrings: true
    });

    let sql = `SELECT book_id, title, author, price, quantity
                FROM orderedBook LEFT JOIN books
                ON orderedBook.book_id = books.id
                WHERE order_id = ?`

    let [rows, fields] = await conn.query(sql, [id]);
    res.status(StatusCodes.OK).json(rows);
};

module.exports = {
    order,
    getOrders,
    getOrderDetail
}