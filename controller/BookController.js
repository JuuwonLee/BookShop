const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
    let { category_id } = req.query;

    if (category_id) {
        let sql = "SELECT * FROM books WHERE category_id=?";
        conn.query(sql, category_id,
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                if (results[0])
                    return res.status(StatusCodes.OK).json(results);
                else
                    res.status(StatusCodes.NOT_FOUND).end();
            })
    } else {
        // (요약된) 전체 도서 리스트
        let sql = "SELECT * FROM books";
        conn.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            res.status(StatusCodes.OK).json(results);

        })

    }

};

const bookDetail = (req, res) => {
    let { id } = req.params;

    let sql = "SELECT * FROM books WHERE id=?";
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