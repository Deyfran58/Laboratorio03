import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";

class CategoriasController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Categoria);
            // Consulta a la base de datos usando el método find
            const lista = await repo.find({ where: { estado: true }, relations: { productos: true } });

            if (lista.length === 0) {
                return res.status(404).json({ message: "No se encontraron categorías registradas." });
            }
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({ message: "Ocurrió un error al acceder a la base de datos." });
        }
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);

            if (!id) {
                return res.status(400).json({ message: "El ID de la categoría es necesario." });
            }

            const repo = AppDataSource.getRepository(Categoria);

            try {
                const categoria = await repo.findOneOrFail({ where: { id, estado: true }, relations: { productos: true } });
                return res.status(200).json(categoria);
            } catch (error) {
                return res.status(404).json({ message: "No se encontró ninguna categoría con el ID proporcionado." });
            }
        } catch (error) {
            return res.status(400).json({ message: "Error al intentar obtener la categoría." });
        }
    }
}

export default CategoriasController;
