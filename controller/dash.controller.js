import path from 'path';
import passport from 'passport';
import { __dirname } from '../utils/utils.js';
import { transporter, getEmailDeRegistro } from '../utils/nodemailer.js';
import * as config from '../config.js'

class DashController {
    
    renderLogin = (req, res) => {
        let loginPath = path.join(__dirname, '../public/login.html');
        res.status(200).sendFile(loginPath);
    }

    postLogin = (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { 
                return res.render('failure', { mensaje : info.message, ruta: 'login' })
            }
            req.logIn(user, err => {
                if (err) console.log(err);
                return res.redirect('/productos');
            });
        })(req, res, next);
    }

    getLogout = (req, res) => {
        req.logout(err=> {
            if (err) console.log(err);
            res.redirect('/login');
        });
    }

    renderRegister = (req, res) => {
        let registerPath = path.join(__dirname, '../public/register.html');
        res.status(200).sendFile(registerPath);
    }

    postRegister = (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { 
                return res.render('failure', { mensaje : info.message, ruta: 'register' })
            }
            let email = getEmailDeRegistro(req.body);
            transporter.sendMail(email);
            return res.redirect('/login');
        })(req, res, next);
    }

    config = (req, res) => { 
        res.render('info', { config })
    }

}

export let dashController = new DashController();