const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

router.get("/:slug", controller.detail);

// router.get("/edit", controller.edit);

// router.get("/create", controller.create);

module.exports = router;

//get: lấy ra
//post: thêm mới
//patch: chỉnh sửa
//delete: xóa
//use: dùng - phương thức chung