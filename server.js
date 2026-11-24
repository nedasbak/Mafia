import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, game: 'mafia', status: 'placeholder' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')))
}

app.listen(port, () => {
  console.log(`Mafia server listening on http://localhost:${port}`)
})
