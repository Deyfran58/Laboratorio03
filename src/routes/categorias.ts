import { Router } from "express";
import CategoriasController from "../controller/CategoriasController";

const routes= Router();

routes.get("", CategoriasController.getAll)
routes.get("/getOne/:id", CategoriasController.getOne)

export default routes;