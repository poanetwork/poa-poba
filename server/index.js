const express = require('express')

const app = express()

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
