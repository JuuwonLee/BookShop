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
      
   
    const { items, delivery, totalQuantity, totalPrice, userId, fisrtBookTitle} = req.body;

    let delivery_id;
    let order_id;

    let sql = "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.query(sql, values);

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
    values = [fisrtBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    conn.query(sql, values, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        order_id = results.insertId;
    })
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    })
    conn.query(sql, [values], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        res.status(StatusCodes.OK).json(results);
    })

};
// 주문 목록 조회
const getOrders = (req, res) => {

};
// 주문 상세 상품 조회
const getOrderDetail = (req, res) => {

};

module.exports = {
    order,
    getOrders,
    getOrderDetail
}