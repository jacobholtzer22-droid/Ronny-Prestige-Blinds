import type { ReactNode } from 'react'

/**
 * One italic accent word inside a heading. The current site leans on a single
 * emphasised word per headline; this is the whole of that device, so it cannot
 * drift into three different treatments across the site.
 */
export default function Em({ children }: { children: ReactNode }) {
  return <em className="font-normal italic text-accent">{children}</em>
}
