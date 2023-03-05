import multer from "multer"
import path from "path";



// export const upload = multer({
//     storage: multer.diskStorage({}), 
//     fileFilter: (req, file, cb) =>{
//         let ext = path.extname(file.originalname)
//         if(ext !== ".jpg" || ext!== ".mp4" && ext){
//             cb(new Error("File type is not supported"), false);
//             return;
//         }
//         cb(null, true)
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)

//         cb(null, true)
//     }
    
   

// })

// export const upload = multer({dest: "public/videos"})
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `videos/admin-${file.fieldname}-${Date.now()}.${ext}`);
      },
    
})

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
    return cb(new Error('Please upload a video'))
  }else {
      // cb(new Error("Not a PDF File!!"), false);
      cb(undefined, true)

    }
  };
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// });
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
//         || file.mimetype === 'image/jpeg'){
//             cb(null, true);
//         }else {
//             cb(null, false);
//         }
// }

// export const upload = multer({storage: storage, fileFilter: filefilter});

  export const upload = multer({
    storage: multerStorage, 
    fileFilter: multerFilter
  })