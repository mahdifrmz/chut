import * as Auth from '@chut/auth'
import * as UserService from '@chut/user'
import { JWT_COOKIE, Status } from '@chut/types';
import { Router } from 'express'
import { vaildatePassword, vaildateUsername } from '@chut/mid-validate';

const route = Router();

route.post('/register',
    vaildateUsername,
    vaildatePassword,
    async (req, res) => {
        const { username, password } = req.body;
        const user = { username, password };
        if (!await UserService.userCreate(user)) {
            res.status(400).send({ status: Status.UnavailableUsername })
        }
        else {
            const token = await Auth.generateToken(user);
            res.cookie(JWT_COOKIE, token)
            res.status(200).send({ status: Status.Success })
        }
    })

export default route;