const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(function (req, res, next) {
  let timeStart = new Date()
  res.on('finish', () => {
    let timeEnd = new Date()
    let costTime = timeEnd.getTime() - timeStart.getTime()
    timeStart = timeStart.toLocaleString('zh-TW', { hour12: false }) + '.' + timeStart.getUTCMilliseconds().toString()
    timeEnd = timeEnd.toLocaleString('zh-TW', { hour12: false }) + '.' + timeEnd.getUTCMilliseconds().toString()
    console.log('Request Time:', timeStart)
    console.log('Respond Time:', timeEnd)
    console.log(timeStart, '|', req.method, 'from', req.originalUrl, '| total time:', costTime, 'ms')
  })
  next()
});

app.get('/', (req, res) => {
  const id = Math.floor(Math.random() * 999)
  const text = '列出全部 Todo'
  res.render('index', { text, id })
})

app.get('/new', (req, res) => {
  const id = Math.floor(Math.random() * 999)
  const text = '新增 Todo 頁面'
  res.render('index', { text, id })
})

app.get('/:id', (req, res) => {
  const id = Math.floor(Math.random() * 999)
  const text = '顯示一筆 Todo'
  res.render('index', { text, id })
})

app.post('/', (req, res) => {
  const id = Math.floor(Math.random() * 999)
  const text = '新增一筆  Todo'
  res.render('index', { text, id })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})