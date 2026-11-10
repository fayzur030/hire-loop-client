'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  /** Current search query so the input persists across navigation. */
  defaultValue?: string
}

/** Search input with a submit button, shown at the top of the browse-jobs page. */
const SearchBar = ({ defaultValue = '' }: SearchBarProps) => {
  const router = useRouter()
  const handelSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const search = data.search
    const params = new URLSearchParams()
    params.set('search', search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }
  return (
    <div className='rounded-2xl border border-border bg-card p-3'>
      <form
        className='flex flex-col gap-3 sm:flex-row sm:items-center'
        onSubmit={handelSearch}
      >
        <div className='relative flex-1'>
          <SearchIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            type='search'
            name='search'
            placeholder='Search by job title, keywords...'
            defaultValue={defaultValue}
            className='h-10 pl-9'
            aria-label='Search jobs'
          />
        </div>

        <Button type='submit' size='lg' className='sm:px-6 py-5 cursor-pointer'>
          Search Jobs
        </Button>
        {/* TODO: submit the search query to the URL/API here. */}
      </form>
    </div>
  )
}

export default SearchBar
