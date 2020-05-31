const current = require('./local/current.json')
const deys = require('./local/5day.json')
const search = require('./local/search.json')

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 4000

app.get('/currentconditions/v1/:code/', (req, res) => res.send(current))
app.get('/forecasts/v1/daily/5day/:code/', (req, res) => res.send(deys))
app.get('/locations/v1/cities/autocomplete', (req, res) => res.send(search.filter(x => x.LocalizedName.toLowerCase().includes(req.query.q))))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))