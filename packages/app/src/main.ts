import express from 'express'
import { connect as dbConnect } from '@chut/storage'
import { routes as UserRoute } from '@chut/con-user'

const app = express()
app.use(express.json())

app.use('/user', UserRoute)
app.get('/echo', (req, res) => {
    res.send('hello').end()
})

async function main() {
    await dbConnect()
    app.listen(process.env.PORT || 3000);
}

main()