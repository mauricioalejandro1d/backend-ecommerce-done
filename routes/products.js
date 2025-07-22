const productStorage = multer.diskStorage({
  destination: "./uploads/products",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProduct = multer({ storage: productStorage });

router.post("/", uploadProduct.single("image"), productController.createProduct);