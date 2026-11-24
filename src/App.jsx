import { useState } from 'react'

const players = [
  { name: 'You', status: 'ALIVE', tone: 'online', self: true },
  { name: 'Alex', status: 'ALIVE', tone: 'online' },
  { name: 'Mina', status: 'ALIVE', tone: 'online' },
  { name: 'Rook', status: 'SUSPECTED', tone: 'danger' },
  { name: 'Sasha', status: 'ALIVE', tone: 'online' },
  { name: 'Theo', status: 'ALIVE', tone: 'online' },
  { name: 'Violet', status: 'ALIVE', tone: 'online' },
  { name: 'Wren', status: 'ALIVE', tone: 'online' },
]

const messages = [
  ['Mina', 'I saw Rook near the alley last night.'],
  ['Theo', 'That is not enough to vote someone out.'],
  ['Alex', "We should compare everyone's stories."],
]

function Panel({ title, className = '', children }) {
  return (
    <section className={`panel ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  const [message, setMessage] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <main className="app-shell">
      <div className="accent" />
      <header className="topbar">
        <div>
          <div className="brand">Mafia</div>
          <div className="eyebrow">Game room</div>
        </div>
        <div className="room-pill">Room <span>·</span> Lobby-042</div>
      </header>

      <div className="dashboard">
        <Panel title="Current phase" className="phase-card">
          <div className="phase-content">
            <div>
              <strong>Day 01</strong>
              <p>Discussion phase</p>
            </div>
            <div className="timer">04:32</div>
          </div>
        </Panel>

        <Panel title="Your role" className="role-card">
          <div className="phase-content">
            <div>
              <strong className="role-question">{revealed ? 'Town' : '???'}</strong>
              <p>{revealed ? 'Protect the town.' : 'Your secret role is hidden'}</p>
            </div>
            <button className="secondary-button" onClick={() => setRevealed(!revealed)}>
              {revealed ? 'Hide role' : 'Show role'}
            </button>
          </div>
        </Panel>

        <Panel title="Players · 8 / 12" className="players-card">
          <div className="player-list">
            {players.map((player) => (
              <button
                className={`player-row ${player.self ? 'self' : ''} ${selectedPlayer === player.name ? 'selected' : ''}`}
                key={player.name}
                onClick={() => setSelectedPlayer(player.name)}
              >
                <span className={`status-dot ${player.tone}`} />
                <span className="player-name">{player.name}</span>
                <span className={`player-status ${player.tone}`}>{player.status}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Chat" className="chat-card">
          <div className="messages">
            {messages.map(([author, text], index) => (
              <div className="message" key={author}>
                <span className={index === 0 ? 'gold' : 'red'}>{author}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={(event) => event.preventDefault()}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </Panel>

        <Panel title="Vote" className="voting-card">
          <p className="muted">Who do you suspect?</p>
          <button className="vote-button" onClick={() => alert(selectedPlayer ? `Vote queued for ${selectedPlayer}` : 'Select a player first')}>
            {selectedPlayer ? `Vote for ${selectedPlayer}` : 'Select a player'}
          </button>
          <p className="hint">Voting unlocks during the day phase</p>
        </Panel>
      </div>

      <footer>Mafia · Lobby-042</footer>
    </main>
  )
}

export default App
