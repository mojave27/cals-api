import 'dotenv/config';
import restify from 'restify'

const server = restify.createServer()

server.get('/', (req, res, next) => {
    console.log('get /')
    res.send('hello restify!')
    next()
})

server.listen(8080, () => {
    // console.log('restify server listening on 8080')
    console.log('%s listening at %s', server.name, server.url);
})