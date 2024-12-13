import React from 'react'

interface ItemCountProps {
  from: number
  to: number
  total: number
  itemName: string
}

export const GenericCount: React.FC<ItemCountProps> = ({ from, to, total, itemName }) => (
  <div className="mt-2 text-sm text-gray-500">
    Menampilkan {from} sampai {to} dari {total} {itemName}.
  </div>
)
