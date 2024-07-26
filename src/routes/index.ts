import {Router} from "express"
import productos from "./productos";
import categoria from "./categorias";
import facturas from "./facturas";


const routes= Router();

routes.use("/Productos", productos );
routes.use("/Categorias", categoria );
routes.use("/Facturas", facturas)


export default routes;

