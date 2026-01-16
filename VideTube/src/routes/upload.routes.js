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
    const { title } = req.body;
    if (!title)
      res.status(400).json({
        message: "Title is not being fetched!!",
      });

    const videos = req.files?.video;
    const thumbnails = req.files?.thumbnail;
    if (!videos || !thumbnails) {
      res.status(400).json({
        message: "Fail to Fetch the videos and thumnails",
      });
    } else {
      res.status(200).json({
        title: title,
        video: videos,
        thumbnail: thumbnails,
      });
    }
  }
);
export default router;
