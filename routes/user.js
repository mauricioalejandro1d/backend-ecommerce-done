const multer = require("multer");
const path = require("path");

const userStorage = multer.diskStorage({
  destination: "./uploads/users",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadUser = multer({ storage: userStorage });

router.post("/", uploadUser.single("image"), userController.createUser);