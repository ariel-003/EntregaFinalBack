import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
import passport from 'passport';
import handlebars from 'express-handlebars'
import path from 'path';
import { Server } from 'socket.io';
import { __dirname } from './utils/utils.js';
import { PORT, MONGO_URL, COOKIE_MAXAGE, TTL } from './config.js';
import * as routers from './router/index.js';
import { chatService } from './controller/chat.controller.js'
import { initializePassport } from './utils/passport.config.js';

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor listo`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const staticPath = path.join(__dirname, '..', 'public');
app.use(express.static(staticPath));
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => console.log('Conectado a Mongo'))

app.use(session({
    store: MongoStore.create({ 
        client: mongoose.connection.getClient(),
        collectionName: 'sessions'
    }),
    key: 'PVecommerce',
    secret: 'm3lon',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_MAXAGE },
    ttl: TTL
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

io.on('connection', socket => {
    chatService.getAll().then(result=> socket.emit('Historial', result))
    socket.on('chat', data => {
        chatService.getAll().then(result => io.emit('Historial', result));
    })
})

app.use('/', routers.dashRouter)
app.use('/productos', routers.productosRouter);
app.use('/carrito', routers.cartRouter);
app.use('/chat', routers.chatRouter);

app.use((req, res) => {
    res.redirect('/login');
});

