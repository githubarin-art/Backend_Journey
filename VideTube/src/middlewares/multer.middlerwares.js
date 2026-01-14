import multer from "multer";
import { mkdir } from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/temp";
    mkdir(uploadPath, { recursive: true }, (err) => {
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    console.log("Learning this:");
    console.log("Log:", file.originalname);
    console.log("Type:", file.mimetype);
    console.log("Log:", file.fieldname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
    console.log("Log:", uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export { upload };
