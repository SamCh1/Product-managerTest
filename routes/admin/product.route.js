const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

//local
// const storageMulter = require('../../helpers/storage-multer.helper');
// const upload = multer({ storage: storageMulter() });

//Cloudinary
cloudinary.config({
    cloud_name: 'dt7opubpk',
    api_key: '427913698997955',
    api_secret: 'w9aER4EejmoV-4146JVtyDwJlb4',
});
//end Cloudinary

const upload = multer();
//const upload = multer({ dest: './public/uploads' })
const controller = require("../../controllers/admin/product.controllers");
const validate = require("../../validates/admin/product.validate")


router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'), function (req, res, next) {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            req.body[req.file.fieldname] = result.url;
            next();
        }
        upload(req);
    } else {
        next();
    }
},
    validate.createPost, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('thumbnail'),
    function (req, res, next) {
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );
                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
            async function upload(req) {
                let result = await streamUpload(req);
                console.log(result);
                req.body[req.file.fieldname] = result.url;
                next();
            }
            upload(req);
        } else {
            next();
        }
    },
    validate.createPost, controller.editPatch)

router.get("/detail/:id", controller.detail);
module.exports = router;