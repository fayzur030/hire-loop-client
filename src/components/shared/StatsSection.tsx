import {
  BuildingIcon,
  Building2Icon,
  SparklesIcon,
  UserSearchIcon,
} from 'lucide-react'

import { Card } from '@/components/ui/card'

const STATS = [
  { icon: Building2Icon, value: '50K', label: 'Active Jobs' },
  { icon: BuildingIcon, value: '12K', label: 'Companies' },
  { icon: UserSearchIcon, value: '2M', label: 'Job Seekers' },
  { icon: SparklesIcon, value: '97%', label: 'Satisfaction Rate' },
]

const StatsSection = () => {
  return (
    <section aria-label=' HireLoop statistics' className='bg-zinc-950'>
      <div className='-mt-12 relative z-10 grid w-full grid-cols-1 gap-3 px-4 sm:-mt-16 sm:grid-cols-2 sm:gap-4 sm:px-8 lg:grid-cols-4'>
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className=' gap-6 rounded-xl bg-zinc-900/40 px-5 py-6 ring-zinc-800/80 backdrop-blur-xs sm:px-6 sm:py-8'
          >
            <stat.icon className='size-5 text-zinc-400' />
            <div>
              <p className='font-heading text-3xl font-semibold text-white sm:text-4xl'>
                {stat.value}
              </p>
              <p className='mt-2 text-sm text-zinc-500'>{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
