import { getUsers } from '@/lib/api/users'
import React from 'react'

const AdminUserPage = async () => {
  const users = await getUsers()
  console.log(users)
  return <div>all users</div>
}

export default AdminUserPage
