import InstagramEmbed from './InstagramEmbed'
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE, type InstagramPost } from '@/lib/instagram'
import Reveal from './Reveal'

/**
 * A grid of Instagram embeds. Renders nothing when the list is empty, which is
 * how a product with no matching post stays clean.
 */
export default function InstagramGrid({
  posts,
  columns = 3,
  follow = false,
}: {
  posts: InstagramPost[]
  columns?: 2 | 3
  follow?: boolean
}) {
  if (posts.length === 0) return null
  // Instagram's embed iframe will not go below 326px wide: a narrower cell clips
  // it rather than scaling it. These breakpoints are the widths at which a cell is
  // still at least that wide, so nothing is ever cut off.
  const cols = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
  return (
    <>
      <div className={`grid gap-5 ${cols}`}>
        {posts.map((p, i) => (
          // min-w-0 matters: a grid column is sized from its content's min-content
          // width, and Instagram's un-processed blockquote carries a 326px
          // min-width. Without this, a page where embed.js is blocked, throttled,
          // or simply slow gets a horizontal scrollbar.
          <Reveal key={p.url} stagger={i} className="min-w-0">
            <InstagramEmbed url={p.url} label={p.label} />
          </Reveal>
        ))}
      </div>
      {follow && (
        <p className="mt-8 text-sm text-muted">
          <a
            href={INSTAGRAM_PROFILE}
            rel="noopener nofollow"
            target="_blank"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Follow {INSTAGRAM_HANDLE}
          </a>
        </p>
      )}
    </>
  )
}
