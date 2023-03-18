import { productosService } from "../controller/productos.controller.js";


export const autentificacion = async(req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
} 

export const idValidator = async (req, res, next) => {
    if (isNaN(req.params.id)) return res.render('failure', {mensaje: "El ID debe ser numerico", ruta: 'productos'});
    let prod = await productosService.findById(req.params.id);
    if(prod == undefined) return res.render('failure', {mensaje: 'No existe producto con ese id', ruta: 'productos' });
    next();
}

export const thunderIDValidator = async (req, res, next) => {
    if (isNaN(req.params.id)) return res.status(400).send({error: "El ID debe ser numerico"});
    let prod = await productosService.findById(req.params.id);
    if(prod == undefined) return res.status(400).send({ error: 'No existe producto con ese id' });
    next();
}

export const productValidator = (req, res, next) => {
    if (!req.body.nombre || !req.body.precio || !req.body.thumbnail || !req.body.descripcion || !req.body.categoria) return res.status(400).send({error: "Falta informacion"});
    next();
}