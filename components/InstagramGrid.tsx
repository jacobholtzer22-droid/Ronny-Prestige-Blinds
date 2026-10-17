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
  const cols = columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'
  return (
    <>
      <div className={`grid gap-5 ${cols}`}>
        {posts.map((p, i) => (
          <Reveal key={p.url} stagger={i}>
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
