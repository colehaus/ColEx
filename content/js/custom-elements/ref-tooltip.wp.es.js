// @flow
/* eslint no-undef: "off" */

import { create, env } from 'sanctuary'

import { documentReadyPromise, toMaybe } from 'libs/util'

const S = create({ checkTypes: false, env })

// Cite looks like:
// <span class="citation" data-cites="jehiel2001">(Jehiel and Moldovanu <a href="#ref-jehiel2001">2001</a>)</span>

// Ref looks like:
// <div id="ref-jehiel2001">
//   <p>Jehiel, Philippe, and Benny Moldovanu. 2001. “Efficient Design with Interdependent Valuations.” <em>Econometrica</em> 69 (5). Wiley Online Library: 1237–59. <a href="https://ub-madoc.bib.uni-mannheim.de/2838/1/dp99_74.pdf" class="uri">https://ub-madoc.bib.uni-mannheim.de/2838/1/dp99_74.pdf</a>.</p>
// </div>

const stripPrefixIfPresent = S.curry2(
  (prefix: string, str: string): string =>
    S.fromMaybe(str)(S.stripPrefix(prefix)(str))
)

const parseRefTitle: string => string = S.pipe([
  S.splitOnRegex(/\.|\?/g),
  S.drop(2),
  S.chain(S.head),
  S.fromMaybe_(() => {
    throw new Error('Expect ref title to be in third sentence.')
  }),
  S.trim,
  stripPrefixIfPresent('“')
])

const getRefId: HTMLElement => string = el =>
  S.pipe([
    cite => cite.getAttribute('href'),
    toMaybe,
    S.fromMaybe_(() => {
      throw new Error('Expected citation to have link: ' + el.outerHTML)
    }),
    S.stripPrefix('#'),
    S.fromMaybe_(() => {
      throw new Error('Expected citation link to be an anchor: ' + el.outerHTML)
    })
  ])(el)

const findRefById = (refs: Array<HTMLElement>): (string => HTMLElement) =>
  S.pipe([
    refId => S.find(ref => ref.getAttribute('id') === refId)(refs),
    S.fromMaybe_(() => {
      throw new Error('Expect every citation to have corresponding reference')
    })
  ])

const getRefTitles = (
  citations: Array<HTMLElement>,
  refs: Array<HTMLElement>
): Array<string> =>
  S.map(
    S.pipe([getRefId, findRefById(refs), ref => ref.textContent, parseRefTitle])
  )(citations)

const addTooltips = (pairs: Array<Pair<HTMLElement, string>>): void => {
  pairs.forEach(pair => {
    const citation = S.fst(pair)
    const refTitle = S.snd(pair)
    citation.setAttribute('data-balloon', refTitle)
    citation.setAttribute('data-balloon-pos', 'up')
    citation.setAttribute('data-balloon-length', 'large')
  })
}

documentReadyPromise.then(() => {
  const citations = Array.from(document.querySelectorAll('.citation'))
  const citeLinks = citations.map(c =>
    S.pipe([
      x => x.querySelector('a'),
      toMaybe,
      S.fromMaybe_(() => {
        throw new Error('Expected citation to have link: ' + c.outerHTML)
      })
    ])(c)
  )
  const refs = Array.from(document.querySelectorAll('#refs > div'))
  console.assert(
    citations.length === citeLinks.length,
    'Citation length mismatch'
  )
  addTooltips(S.zip(citations)(getRefTitles(citeLinks, refs)))
})
