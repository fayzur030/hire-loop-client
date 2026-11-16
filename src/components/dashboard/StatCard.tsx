interface StatCardProps {
  label: string
  value: string | number
  /** Tailwind text classes for the value, e.g. "text-orange-400". */
  valueClassName?: string
  /** Small note under the value, e.g. "+12% vs last month". */
  hint?: string
  /** Tailwind text classes for the hint, e.g. "text-emerald-400". */
  hintClassName?: string
}

/** Small stat tile used by the dashboard summary rows. */
export function StatCard({
  label,
  value,
  valueClassName,
  hint,
  hintClassName,
}: StatCardProps) {
  return (
    <div className='rounded-2xl border border-[#27272A] bg-[#111113] p-5'>
      <p className='text-sm text-zinc-400'>{label}</p>
      <p
        className={`mt-2 text-2xl font-bold text-white sm:text-3xl ${valueClassName ?? ''}`}
      >
        {value}
      </p>
      {hint ? (
        <p className={`mt-2 text-xs ${hintClassName ?? 'text-zinc-500'}`}>{hint}</p>
      ) : null}
    </div>
  )
}
