const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, res, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage });
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

module.exports = router;
