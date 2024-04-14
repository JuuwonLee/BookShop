const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// (카페고리 별, 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;

    // limit : page당 도서 수
    // currentPage : 현재 몇 페이지 ex. 1, 2, 3 ...
    // offset :                      0, 3, 6, 9, 12 ...
    //                               limit * (currentPage-1)

    let offset = limit * (currentPage-1);
    
    let sql = "SELECT * FROM books";
    let values = [];
    if (category_id && news) {
        sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
        values = [category_id];
    }
    else if (category_id) {
        sql += " WHERE category_id=?";
        values = [category_id];
    } else if (news) {
        sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    }
    sql += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit), offset);

    conn.query(sql, values,
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if (results.length)
                return res.status(StatusCodes.OK).json(results);
            else
                res.status(StatusCodes.NOT_FOUND).end();
        })



};

const bookDetail = (req, res) => {
    let { id } = req.params;

    let sql = `SELECT * FROM books LEFT JOIN category
                ON books.category_id = category.id WHERE books.id = ?`;
    conn.query(sql, id,
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            if (results.length)
                return res.status(StatusCodes.OK).json(results[0]);
            else
                res.status(StatusCodes.NOT_FOUND).end();

        })

};


module.exports = {
    allBooks,
    bookDetail
};