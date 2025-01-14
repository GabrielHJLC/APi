import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
    async store(req, res) {
        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    errors: [err.code],
                });
            }

            try {
                const { originalname } = req.file;
                const { aluno_id } = req.body;

                const result = await multerConfig.uploadToSupabase(req, req.file);

                const foto = await Foto.create({
                    originalname,
                    filename: result.fileName,
                    aluno_id,
                });

                return res.json({foto});
            } catch (e) {
                return res.status(400).json({
                    errors: ['O aluno não existe ou houve um erro ao salvar a foto'],
                });
            }
        });
    }
}

export default new FotoController();
