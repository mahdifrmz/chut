import { Status } from '@chut/types';
import { Router } from 'express'
import { jwtAuth, reqUser } from '@chut/mid-auth'
import { userUpdate } from '@chut/user';
import { vaildateNewPassword, vaildateOldPassword } from '@chut/mid-validate'

const route = Router();

route.post('/chpass',
    jwtAuth,
    vaildateOldPassword,
    vaildateNewPassword,
    async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const user = reqUser(req);
        if (user.password != oldPassword)
            res.status(401).send({ status: Status.InvalidCredentials });
        else {
            user.password = newPassword;
            await userUpdate(user);
            res.status(200).send({ status: Status.Success });
        }
    })

export default route;