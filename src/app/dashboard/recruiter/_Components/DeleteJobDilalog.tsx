'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { deleteJob } from '@/lib/actions/jobs'
import { JobFormData } from '@/types/jobForm.type'

interface JobProps {
  job: JobFormData
}

export function DeleteJobDialog({ job }: JobProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleDeleteJob = async () => {
    try {
      setLoading(true)

      const res = await deleteJob(job._id)

      if (res) {
        toast.success('Job deleted successfully!')
        setOpen(false)
        router.refresh()
      } else {
        toast.error('Failed to delete job. Please try again.')
      }
    } catch (error) {
      console.error('Delete job error:', error)

      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) setOpen(value)
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant='destructive'
            size='icon'
            aria-label='Delete job'
            disabled={loading}
          >
            <Trash2 className='size-4' />
          </Button>
        }
      />

      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20'>
            <Trash2Icon className='size-6' />
          </AlertDialogMedia>

          <AlertDialogTitle className='text-lg font-semibold'>
            Delete job?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this job posting? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant='outline' disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant='destructive'
            onClick={handleDeleteJob}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
