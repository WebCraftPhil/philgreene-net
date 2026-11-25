import { ArrowRight } from 'lucide-react'
import { Link } from 'wouter'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className="eyebrow-mono mb-2">{eyebrow}</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link href={actionHref} className="text-action-link shrink-0">
          {actionLabel} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
