import { getAllJobs } from '@/lib/api/jobs'
import SearchBar from '@/components/browse-jobs/SearchBar'
import FilterSidebar from '@/components/browse-jobs/FilterSidebar'
import SortSelect from '@/components/browse-jobs/SortSelect'
import JobCard from '@/components/browse-jobs/JobCard'
import {
  JOB_TYPE_OPTIONS,
  WORK_TYPE_OPTIONS,
  buildCategoryOptions,
} from '@/components/browse-jobs/filters'

const BrowseJob = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()
  const jobs = await getAllJobs(query)

  const filterGroups = [
    { title: 'Job Type', options: JOB_TYPE_OPTIONS },
    { title: 'Work Type', options: WORK_TYPE_OPTIONS },
    { title: 'Category', options: buildCategoryOptions(jobs) },
  ]

  return (
    <main className='mx-auto w-full max-w-330 px-3 py-6 sm:px-6 mt-22'>
      <SearchBar
        defaultValue={typeof search.search === 'string' ? search.search : ''}
      />

      <div className='mt-6 flex flex-col gap-6 lg:flex-row'>
        <FilterSidebar groups={filterGroups}  />

        <section className='min-w-0 flex-1'>
          <header className='flex flex-wrap items-center justify-between gap-3 px-1'>
            <h1 className='font-heading text-lg font-semibold'>
              Found {jobs.length} Jobs
            </h1>
            <SortSelect />
          </header>

          {jobs.length > 0 ? (
            <ul className='mt-4 space-y-4'>
              {jobs.map((job) => (
                <li key={job._id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          ) : (
            <p className='mt-4 rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground'>
              No jobs found. Try adjusting your search or filters.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}

export default BrowseJob
