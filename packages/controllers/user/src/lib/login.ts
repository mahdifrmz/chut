import * as Auth from '@chut/auth'
import { Status, JWT_COOKIE } from '@chut/types';
import { Router } from 'express'
import { vaildatePassword, vaildateUsername } from '@chut/mid-validate'

const route = Router();

route.post('/login',
    vaildateUsername,
    vaildatePassword,
    async (req, res) => {
        const { username, password } = req.body;
        const user = await Auth.userAuth(username, password);
        if (!user) {
            res.status(401).send({ status: Status.InvalidCredentials })
        }
        else {
            const token = await Auth.generateToken(user);
            res.cookie(JWT_COOKIE, token)
            res.status(200).send({ status: Status.Success })
        }
    })

export default route;