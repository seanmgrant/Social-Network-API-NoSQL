const router = require("express").Router();
const userRouter = require("./userRoutes");
const thoughtRouter = require("./thoughtRoutes");
router.use("/users", userRouter);
router.use("/thoughts", thoughtRouter);
module.exports = router;