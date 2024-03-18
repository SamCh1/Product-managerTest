const Product = require("../../models/product.model");

// [GET] /product/
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({
        position: "asc"
    });

    for (const item of products){
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
    }

    console.log(products);

    res.render("client/pages/product/index",{
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });
}

//[GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(slug);
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        })
        res.render("client/pages/product/detail",{
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect("/");
    }
}