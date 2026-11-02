import { config } from '@/lib/config'

/**
 * The Google tag, rendered by the root layout only when
 * config.tracking.googleAdsId is set (the layout checks first, so a site
 * without it gains not even an empty slot in its page payload).
 *
 * Plain script tags from a server component on purpose: next/script and client
 * components are bundled into every page's JavaScript even when they render
 * nothing, so a site without tracking would ship different chunks. This file
 * imports nothing client-side, and without the block it renders nothing.
 *
 * The inline script also fires the two conversions:
 *   call  a click on any tel: link (header, footer, hero, CTA band, mobile
 *         call bar, contact page, the form's thank-you), one listener on the
 *         document, so no link component changes.
 *   form  the contact form swapping itself for its thank-you. ContactForm is
 *         sealed and checksum-verified (verify check 4), so it is watched from
 *         outside rather than edited, and it renders that thank-you only after
 *         a 2xx from the platform. A failed POST shows an error instead, so a
 *         lost lead cannot be counted as a conversion.
 *
 * The thank-you is matched as the one `main [role="status"]` element, with no
 * restriction on which page it appeared on. AA-Template additionally requires
 * the path to be /contact; this site renders ContactForm twice, on /contact
 * and in components/IntroWithForm.tsx on the homepage, and the homepage form
 * is the one most visitors meet first. role="status" appears in exactly one
 * component in this repo, so dropping the path test cannot match anything
 * else. If another component ever takes a live region, scope this selector
 * instead of narrowing it back to one route.
 */
export default function GoogleTag() {
  const t = config.tracking
  if (!t?.googleAdsId) return null
  const ids = [t.googleAdsId, ...(t.ga4 ? [t.ga4] : [])]
  const js = [
    'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}',
    "gtag('js',new Date());",
    ...ids.map((id) => `gtag('config',${JSON.stringify(id)});`),
    `(function(){var call=${JSON.stringify(t.conversions.call ?? '')},form=${JSON.stringify(t.conversions.form ?? '')};`,
    "if(call)document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href^=\"tel:\"]');if(a)gtag('event','conversion',{send_to:call});},true);",
    "if(form){var o=new MutationObserver(function(){if(document.querySelector('main [role=\"status\"]')){o.disconnect();gtag('event','conversion',{send_to:form});}});o.observe(document.documentElement,{childList:true,subtree:true});}",
    '})();',
  ].join('')
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${t.googleAdsId}`} />
      <script id="google-tag" dangerouslySetInnerHTML={{ __html: js }} />
    </>
  )
}
