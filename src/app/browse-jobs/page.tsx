import { getAllJobs } from '@/lib/api/jobs'

const BrowseJob = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()
  const jobs = await getAllJobs(query)

  return (
    <div>
      <h1>{jobs.length}</h1>
    </div>
  )
}

export default BrowseJob
