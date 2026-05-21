import { useState, useEffect } from "react"
import { type Customer } from "./types"
import { getClientes, createCliente, updateCliente, deleteCliente, getClienteByUsername } from "./api"
import CustomerTable from "./CustomerTable"
import CustomerForm from "./CustomerForm"
import CustomerSearch from "./CustomerSearch"

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [editing, setEditing] = useState<Customer | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchResult, setSearchResult] = useState<Customer | null>(null)

  useEffect(() => {
    loadClientes()
  }, [])

  async function loadClientes() {
    const data = await getClientes()
    setCustomers(data)
  }

  async function handleCreate(customer: Customer) {
    await createCliente(customer)
    setShowForm(false)
    loadClientes()
  }

  async function handleEdit(customer: Customer) {
    await updateCliente(customer)
    setEditing(null)
    loadClientes()
  }

  async function handleDelete(id: number) {
    await deleteCliente(id)
    loadClientes()
  }

  async function handleSearch(username: string) {
    const result = await getClienteByUsername(username)
    setSearchResult(result)
  }

  function handleSubmit(customer: Customer) {
    if (editing) {
      handleEdit(customer)
    } else {
      handleCreate(customer)
    }
  }

  return (
    <div>
      <h1>Gestión de Clientes</h1>

      <CustomerSearch
        onSearch={handleSearch}
        result={searchResult}
        onClear={() => setSearchResult(null)}
      />

      <h2>Clientes</h2>
      <button onClick={() => { setEditing(null); setShowForm(true) }}>Nuevo cliente</button>

      {showForm || editing ? (
        <CustomerForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditing(null) }}
        />
      ) : null}

      <CustomerTable
        customers={customers}
        onEdit={c => { setEditing(c); setShowForm(false) }}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App