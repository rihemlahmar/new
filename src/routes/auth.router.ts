import express from 'express'
import {Register,login, forgotPassword ,verifyCode,resetPassword, changePassword, VerifyToken, iExpired} from '../controllers/auth.controller'
import { auth } from '../middlewares/auth'
import { checkRegisterData,checkLoginData, checkForgotPassData, checkverifyCodetData, checkResetPassData, checkChangePassword} from '../middlewares/auth.middelwares'



const router = express.Router()

router.post('/register',checkRegisterData,Register)
router.post('/login' ,checkLoginData,login)
router.get('/verifyToken',VerifyToken)
router.get('/expiredToken',iExpired)
router.post('/forgotPassword',forgotPassword)
router.post('/verifyCode',checkverifyCodetData,verifyCode)
router.post('/resetPassword',checkResetPassData ,resetPassword)
router.post("/changePassword", auth, checkChangePassword, changePassword);

export default router