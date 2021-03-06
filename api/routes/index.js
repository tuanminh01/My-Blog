const authRouter = require('./auth');
const userRouter = require('./users');
const postRouter = require('./posts');
const categoriesRouter = require('./categories');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/categories', categoriesRouter);
}

module.exports = route;