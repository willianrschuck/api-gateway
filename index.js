const express = require('express')
const proxy = require('express-http-proxy')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const { verifyToken } = require('./middleware/jwt.middleware')

const app = express();

const alunosProxy = proxy(process.env.URI_ALUNOS_SERVICE);
const loginProxy = proxy(process.env.URI_LOGIN_SERVICE);

app.use(logger('dev'));

app.all('/alunos(/*)?', [ verifyToken ] , alunosProxy);
app.all('/login(/*)?', loginProxy);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(process.env.PORT || 3000);