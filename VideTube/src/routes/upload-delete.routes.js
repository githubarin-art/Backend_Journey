import { Router } from "express";
import fs from "fs";
const router = Router();

router.delete("/delete/:ID", (req, res) => {
  const fileId = req.params.ID;
  if (fileId) {
    fs.unlink("./public/temp/" + fileId, (err) => {
      if (err) {
        res.status(500).json({
          message: "Deletion failed!!",
        });
      } else {
        res.status(200).json({
          message: "Deleted successfully",
        });
      }
    });
  } else {
    res.status(404).json({
      message: "File not Found!!",
    });
  }
});

export default router;
