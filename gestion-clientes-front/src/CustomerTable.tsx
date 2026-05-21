import type { Customer } from "./types"

interface Props {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
}

function CustomerTable({ customers, onEdit, onDelete }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Username</th>
          <th>Password</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c.ID}>
            <td>{c.ID}</td>
            <td>{c.name}</td>
            <td>{c.username}</td>
            <td>{c.password}</td>
            <td>
              <button onClick={() => onEdit(c)}>Editar</button>
              <button onClick={() => onDelete(c.ID)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CustomerTable