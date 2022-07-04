import express from 'express'
import {sendcode,verifyCode} from '../controllers/code.controller'
import { checkSendCodetData,checkVerifyCodetData} from '../middlewares/code.middleware'


const router = express.Router()

router.post('/sendcode',sendcode)
router.post('/verifycode',verifyCode)
export default router