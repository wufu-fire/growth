const http = require('http');
const cors = require('kcors');
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const router = require('koa-router')()
const mockData = require('./frontEndMock.json')

app.use(require('koa-static')(__dirname + '/public'))
    // 允许跨域
app.use(cors());
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})
router.all('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
    console.log(typeof mockData)
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

// router["all"](mockData.routers[0].routerName, async(ctx, next) => {
//     ctx.body = mockData.routers[0].data.msg
//     console.log(typeof mockData)
// })

// routes
app.use(router.routes(), router.allowedMethods())

var server = http.createServer(app.callback());

server.listen(3004);