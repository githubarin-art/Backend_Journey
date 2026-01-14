import { upload } from "../middlewares/multer.middlerwares.js";
import { Router } from "express";

const router = Router();

router.post(
  "/upload",
  (req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Content-type:", req.get("Content-type"));
    next();
  },
  upload.any(),
  (req, res) => {
    res.status(200).json({
      message: "Successfully uploaded",
      file: req.file?.originalname,
      fieldname: req.file?.fieldname,
      fileSize: req.file?.size,
    });
  }
);
router.post(
  "/upload/videos",
  upload.fields([
    { name: "video", maxCount: 2 },
    { name: "thumbnail", maxCount: 2 },
  ]),
  (req, res) => {
    const title = req.body;
    res.json({ title: title });
  }
);
export default router;
