const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
require('./db/db')

const app = express()
app.set('etag', false);

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


module.exports = app;