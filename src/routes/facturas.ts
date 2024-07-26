import { Router } from "express";
import FacturasController from "../controller/FacturasController";
import CategoriasController from "../controller/CategoriasController";

const routes = Router();

routes.get("", FacturasController.getAll)
routes.get("/getOne/:id", CategoriasController.getOne)
routes.post("", FacturasController.create)
routes.delete("/:id", FacturasController.delete)

export default routes;