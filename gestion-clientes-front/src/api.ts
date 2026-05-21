import type { Customer } from "./types"

const BASE_URL = "http://localhost:8080/sistema/api/v1/clientes"

export async function getClientes(): Promise<Customer[]> {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function getClienteByUsername(username: string): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/${username}`)
  return res.json()
}

export async function createCliente(customer: Customer): Promise<Customer> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  })
  return res.json()
}

export async function updateCliente(customer: Customer): Promise<void> {
  await fetch(BASE_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  })
}

export async function deleteCliente(id: number): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  return res.json()
}