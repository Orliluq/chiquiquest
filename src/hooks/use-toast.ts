import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

type Toast = ToastProps & {
  id: string
}

let count = 0

function toast({ title, description, variant = 'default' }: ToastProps) {
  const id = (++count).toString()
  // Simple console-based toast for now - in production this would show a UI notification
  console.log(`[Toast ${variant.toUpperCase()}]`, title, description)
  return { id, title, description, variant }
}

export { toast }
