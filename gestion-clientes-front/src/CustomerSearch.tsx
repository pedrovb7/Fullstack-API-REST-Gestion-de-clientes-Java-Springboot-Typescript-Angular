import { useState } from "react"
import type { Customer } from "./types"

interface Props {
  onSearch: (username: string) => void
  result: Customer | null
  onClear: () => void
}

function CustomerSearch({ onSearch, result, onClear }: Props) {
  const [username, setUsername] = useState("")

  return (
    <div>
      <h2>Buscar por username</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={() => onSearch(username)}>Buscar</button>
      <button onClick={() => { setUsername(""); onClear() }}>Limpiar</button>

      {result && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.ID}</td>
              <td>{result.name}</td>
              <td>{result.username}</td>
              <td>{result.password}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CustomerSearch