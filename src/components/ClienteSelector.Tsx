'use client'

import { useEffect, useState } from 'react'

interface Cliente {
  id: number
  nombre: string
  email: string
  telefono: string | null
}

interface Props {
  onSelect: (cliente: Cliente) => void
  selectedCliente: Cliente | null
}

export default function ClienteSelector({ onSelect, selectedCliente }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => {
        setClientes(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Cargando clientes...</div>

  return (
    <div className="cliente-selector">
      <h3>Seleccionar Cliente</h3>
      <select 
        onChange={(e) => {
          const cliente = clientes.find(c => c.id === Number(e.target.value))
          if (cliente) onSelect(cliente)
        }}
        value={selectedCliente?.id || ''}
        className="select"
      >
        <option value="">-- Seleccione un cliente --</option>
        {clientes.map(cliente => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} - {cliente.email}
          </option>
        ))}
      </select>
      {selectedCliente && (
        <div className="cliente-info">
          <p><strong>Cliente:</strong> {selectedCliente.nombre}</p>
          <p><strong>Email:</strong> {selectedCliente.email}</p>
          {selectedCliente.telefono && <p><strong>Tel:</strong> {selectedCliente.telefono}</p>}
        </div>
      )}
    </div>
  )
}