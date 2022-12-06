const router = require('express').Router()
const renderPage = require('./lib/renderPage')
const { read } = require('./lib/file-async')
const title = 'OpenWeatherMap Cache API'
const API_KEY = process.env.API_KEY

router.get('/', async (req, res) => {
  const pageContent = await read('./views/index.html')
  const styleContent = await read('./views/main.css')

  res.status(200).send(renderPage(title, pageContent, styleContent))
})


router.get('/weather', async (req, res) => {
  const lon = req.query?.lng
  const lat = req.query?.lat
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&appid=${API_KEY}&units=imperial&exclude=minutely,daily`)
  const data = await response.json()
  res.status(200).send(data)
})

module.exports = router
