import express from "express";
import { isAuthenticated, regenerateAccessToken } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/payment.controllers.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated, buySubscription);
router
  .route("/paymentverification")
  .post(regenerateAccessToken, isAuthenticated, paymentVerification);
router.route("/razorpaykey").get(getRazorPayKey);
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
