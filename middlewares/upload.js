import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

createFolder('./uploads/users');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/users');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });
export default upload;
