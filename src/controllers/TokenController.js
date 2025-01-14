import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
    // eslint-disable-next-line consistent-return
    async store(req, res) {
        const { email = '', password = '' } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                errors: ['Invalid user'],
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                errors: ['User does not exist'],
            });
        }

        if (!(await user.passwordIsValid(password))) {
            return res.status(401).json({
                errors: ['Password invalid'],
            });
        }

        const { id } = user;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRANTION,
        });

        res.json({
            token, user: { nome: user.nome, id, email },
        });
    }
}

export default new TokenController();
