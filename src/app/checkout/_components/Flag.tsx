interface FlagProps {
  code: string
  className?: string
}

/**
 * Tiny inline SVG flags.
 *
 * Emoji flags (🇧🇩) fall back to "BD" letterboxes on Windows, so the icons are
 * drawn manually to stay identical on every platform.
 */
const FLAGS: Record<string, React.ReactNode> = {
  BD: (
    <>
      <rect width='24' height='18' fill='#006A4E' />
      <circle cx='10.5' cy='9' r='4.2' fill='#F42A41' />
    </>
  ),
  US: (
    <>
      <rect width='24' height='18' fill='#B22234' />
      {[1, 3, 5, 7, 9, 11].map((stripe) => (
        <rect
          key={stripe}
          y={(stripe * 18) / 13}
          width='24'
          height={18 / 13}
          fill='#FFFFFF'
        />
      ))}
      <rect width='10' height={(18 * 7) / 13} fill='#3C3B6E' />
      {[
        [1.6, 1.8],
        [4.2, 1.8],
        [6.8, 1.8],
        [2.9, 4.2],
        [5.5, 4.2],
        [8.1, 4.2],
        [1.6, 6.6],
        [4.2, 6.6],
        [6.8, 6.6],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r='0.7' fill='#FFFFFF' />
      ))}
    </>
  ),
  GB: (
    <>
      <rect width='24' height='18' fill='#012169' />
      <path
        d='M0 0 24 18M24 0 0 18'
        stroke='#FFFFFF'
        strokeWidth='4'
        fill='none'
      />
      <path
        d='M0 0 24 18M24 0 0 18'
        stroke='#C8102E'
        strokeWidth='1.8'
        fill='none'
      />
      <path d='M12 0v18M0 9h24' stroke='#FFFFFF' strokeWidth='6' fill='none' />
      <path d='M12 0v18M0 9h24' stroke='#C8102E' strokeWidth='3.4' fill='none' />
    </>
  ),
  CA: (
    <>
      <rect width='24' height='18' fill='#FFFFFF' />
      <rect width='6' height='18' fill='#D80621' />
      <rect x='18' width='6' height='18' fill='#D80621' />
      <path
        d='M12 3.6l1.2 2.6 2.9.4-2.1 2 .5 2.9-2.5-1.4-2.5 1.4.5-2.9-2.1-2 2.9-.4z'
        fill='#D80621'
      />
    </>
  ),
}

export function Flag({ code, className }: FlagProps) {
  return (
    <svg
      viewBox='0 0 24 18'
      aria-hidden='true'
      className={`h-3.5 w-auto shrink-0 rounded-[2px] ring-1 ring-black/40 ${className ?? ''}`}
    >
      {FLAGS[code] ?? (
        <rect width='24' height='18' fill='#3F3F46' />
      )}
    </svg>
  )
}
