const express = require('express')
const { issueErc735Claim } = require('../controllers/issueErc735Claim')

const router = express.Router()
router.post('/', issueErc735Claim)

module.exports = router
