import 'dotenv/config';
import restify from 'restify'
import { addFoodItem, getFoodItems } from './persistence/calsDao'

const server = restify.createServer()

server.use(restify.plugins.bodyParser({ mapParams: false }))

server.get('/', (req, res, next) => {
    console.log('get /')
    res.send('hello restify!')
    next()
})

server.get('/fooditems', async (req, res, next) => {
    console.log('get /fooditems')
    let foodItems = await getFoodItems()
    console.log(`foodItems: ${foodItems}`)
    res.json(foodItems)
    next()
})

server.post('/fooditems', (req, res, next) => {
    console.log('post /fooditems')
    console.log(req.body)
    addFoodItem(req.body)
    res.send('done')
})

server.listen(8080, () => {
    console.log('restify server listening on 8080')
    // console.log('%s listening at %s', server.name, server.url);
})