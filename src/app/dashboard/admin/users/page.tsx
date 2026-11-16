import { UsersManager } from '@/components/admin/users/UsersManager'
import { getManagedUsers } from '@/lib/api/users'

const AdminUserPage = async () => {
  const users = await getManagedUsers()

  return <UsersManager initialUsers={users} />
}

export default AdminUserPage
