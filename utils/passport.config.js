import passport from 'passport';
import local from 'passport-local';
import { createHash, isValid } from './utils.js';
import { usersDao } from '../daos/users.dao.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let user = await usersDao.coleccion.findOne({ email: username });
                    if (user) return done(null, false, { message: 'Ya existe un usuario con el correo provisto' });
                    if (req.body.password !== req.body.password2) return done(null, false, { message: 'Las contraseñas no coinciden' }); 
                    const newUser = {
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        telefono: req.body.telefono,
                        email: username,
                        password: createHash(password),
                    }
                    try {
                        let result = await usersDao.coleccion.create(newUser);
                        return done(null, result);
                    } catch (err) {
                        done(err)
                    }
                } catch(err) {
                    done(err);
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            { passReqToCallback: true },
            async(req, username, password, done) => {
                try {
                    let user = await usersDao.coleccion.findOne({ email : username });
                    if (!user) return done(null, false, { message : 'No existe usuario con el email provisto' });
                    if (!isValid(user, password)) return done(null, false, { message : 'Contraseña incorrecta' });
                    return done(null, user);
                } catch(err) {
                    done(err);
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        return usersDao.coleccion.findById(id, done);
    })
}