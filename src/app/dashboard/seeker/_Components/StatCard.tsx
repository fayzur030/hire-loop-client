interface StatCardProps {
  label: string
  value: string | number
  /** Tailwind text classes for the value, e.g. "text-orange-400". */
  valueClassName?: string
}

/** Small stat tile used in the "My Applications" summary row. */
const StatCard = ({ label, value, valueClassName }: StatCardProps) => {
  return (
    <div className='rounded-2xl border border-[#27272A] bg-[#111113] p-5'>
      <p className='text-sm text-zinc-400'>{label}</p>
      <p
        className={`mt-2 text-2xl font-bold text-white sm:text-3xl ${valueClassName ?? ''}`}
      >
        {value}
      </p>
    </div>
  )
}

export default StatCard
