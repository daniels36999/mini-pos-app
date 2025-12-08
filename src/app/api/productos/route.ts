// src/app/api/productos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/productos
export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: { nombre: 'asc' }
    })
    
    return NextResponse.json({
      success: true,
      data: productos
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

// POST /api/productos
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, precio, stock } = body
    
    const producto = await prisma.producto.create({
      data: { nombre, precio, stock }
    })
    
    return NextResponse.json({
      success: true,
      data: producto
    }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}