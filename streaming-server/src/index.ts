import express from 'express'
import videos from './videos'
const app = express()

const PORT = 8080

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.use('/api',videos)

app.listen(PORT,() => {
    console.log(`Server running on port :${PORT} `)
})