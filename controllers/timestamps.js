import User from "../models/User.js"
// To update `updatedAt`, do a `findOneAndUpdate()` with `timestamps: false` and
// `updatedAt` set to the value you want
export const upAt = User.findOneAndUpdate({ _id: doc._id }, { updatedAt: new Date(0) }, {
  new: true,
  timestamps: false
});
// console.log(doc.updatedAt); // 1970-01-01T00:00:00.000Z

// To update `createdAt`, you also need to set `strict: false` because `createdAt`
// is immutable
export const creAt =  User.findOneAndUpdate({ _id: doc._id }, { createdAt: new Date(0) }, {
  new: true,
  timestamps: false,
  strict: false
});
// console.log(doc.createdAt);