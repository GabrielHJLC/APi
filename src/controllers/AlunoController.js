import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
    async index(req, res) {
        try {
            const list = await Aluno.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade'],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
                    attributes: ['url', 'filename'],
                },
            });
            return res.json(list);
        } catch (error) {
            console.error('Erro ao tentar buscar alunos:', error);
            return res.status(500).json({ error: 'Erro ao tentar buscar alunos' });
        }
    }

    async store(req, res) {
        try {
            const aluno = await Aluno.create(req.body);

            return res.json(aluno);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando Id'],
                });
            }

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['O aluno não existe'],
                });
            }

            const alunoEdit = await aluno.update(req.body);

            return res.json(alunoEdit);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['faltando Id'],
                });
            }

            const aluno = await Aluno.findByPk(id, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade'],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
                    attributes: ['url','filename'],
                },
            });

            if (!aluno) {
                return res.status(400).json({
                    errors: ['O aluno não existe'],
                });
            }

            return res.json(aluno);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando Id'],
                });
            }

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['O aluno não existe'],
                });
            }

            await aluno.destroy();

            return res.json({
                apagado: true,
            });
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message),
            });
        }
    }
}

export default new AlunoController();
