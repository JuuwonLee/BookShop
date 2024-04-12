const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const { all } = require('../routes/books');

const allCategory = (req, res) => {
    // 카테고리 전체 목록 리스트
    let sql = "SELECT * FROM category";
    conn.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).json(results);

    })
};

module.exports = {
    allCategory
};