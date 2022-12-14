import express from 'express'
import { connect as dbConnect } from '@chut/storage'
import { routes as userRoutes } from '@chut/con-user'
import { routes as mesRoutes } from '@chut/con-message'
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', mesRoutes);

app.get('/echo', (req, res) => {
    res.send('hello').end();
})

async function main() {
    await dbConnect();
    app.listen(process.env.PORT || 3000);
}

main();