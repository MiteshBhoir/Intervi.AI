// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // ✅ Ensure upload folder exists
// const uploadPath = "public";

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// // ✅ Storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },

//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const safeName = file.originalname
//       .replace(ext, "")
//       .replace(/\s+/g, "-")
//       .toLowerCase();

//     const filename = `${Date.now()}-${safeName}${ext}`;
//     cb(null, filename);
//   },
// });

// // ✅ File filter (only PDF allowed)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// // ✅ Multer instance
// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

import multer from "multer";

// ✅ File filter (only PDF allowed)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// ✅ Use memory storage (NO FILE SYSTEM)
export const upload = multer({
  storage: multer.memoryStorage(), // 🔥 CHANGE HERE
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});