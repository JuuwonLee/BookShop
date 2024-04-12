const express = require('express');
const {allCategory} = require('../controller/CategoryController');
const router = express.Router();

router.use(express.json());

router.get('/', allCategory); // (카테고리 별) 전체 도서 조회


module.exports = router;