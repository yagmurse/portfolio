import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const uploadsPath =
        process.env.UPLOADS_PATH || path.join(__dirname, "../public/uploads");
      cb(null, uploadsPath);
    } catch (error) {
      cb(error, null); //error isback to multer
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;
