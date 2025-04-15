import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/me', authenticate, (req, res) => {
    res.json(req.user)
})

export default router
