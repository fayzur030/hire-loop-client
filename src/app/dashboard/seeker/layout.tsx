import { requiredRole } from '@/lib/core/sessionFromServer'
import React from 'react'

const RecruiterDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requiredRole('seeker')
  return children
}

export default RecruiterDashboardLayout
