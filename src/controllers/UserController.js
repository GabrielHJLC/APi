import User from '../models/User';

class HomeController {
    async store(req, res) {
        try {
            const novoUser = await User.create(req.body);
            return res.json(novoUser);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async Index(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async show(req, res) {
        try {
            const id = req.userId;
            const user = await User.findByPk(id);
            return res.json(user);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.userId;
            if (!id) {
                return res.status(400).json({
                    errors: ['Missing Id'],
                });
            }
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({
                    errors: ['User does not exist'],
                });
            }

            const edit = await user.update(req.body);

            return res.json(edit);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.userId;
            if (!id) {
                return res.status(400).json({
                    errors: ['ID não enviado'],
                });
            }
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({
                    errors: ['Usuário não existe'],
                });
            }

            await user.destroy();

            return res.json(user);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new HomeController();
