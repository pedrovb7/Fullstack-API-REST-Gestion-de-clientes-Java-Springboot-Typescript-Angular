import { useState, useEffect } from "react"
import type { Customer } from "./types"

interface Props {
  onSubmit: (customer: Customer) => void
  onCancel: () => void
  initial?: Customer
}

function CustomerForm({ onSubmit, onCancel, initial }: Props) {
  const [form, setForm] = useState<Customer>({
    ID: 0,
    name: "",
    username: "",
    password: ""
  })

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>{initial ? "Editar cliente" : "Nuevo cliente"}</h2>
      <input name="ID" type="number" placeholder="ID" value={form.ID} onChange={handleChange} />
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button onClick={() => onSubmit(form)}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  )
}

export default CustomerForm