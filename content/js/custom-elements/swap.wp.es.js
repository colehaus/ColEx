// @flow
/* eslint no-undef: "off" */

// Doesn't currently handle nested swaps

import $ from 'jquery'
import { create, env } from 'sanctuary'

import sidenote from 'custom-elements/sidenote'
import { makeAnimationPromise } from 'libs/util'
import { circleFromChord, pointOnCircle } from 'libs/geometry'

const S = create({ checkTypes: false, env })

const translations = (top: JQuery, bottom: JQuery) => {
  const bottomToTop = top.offset().top - bottom.offset().top
  const between = bottom.height() - top.height()
  const topToBottom = bottom.offset().top - top.offset().top + between
  return { bottomToTop, between, topToBottom }
}

const swapTranslate = (topEl: JQuery, bottomEl: JQuery) => (resolve: Function, reject: Function) => {
  const betweenEls = topEl.nextUntil(bottomEl)
  const { bottomToTop, between, topToBottom } = translations(topEl, bottomEl)

  const angle = Math.PI / 4
  const mkTranslator = (trans: number): (number => string) => {
    const startAngle = trans <= 0 ? Math.PI + angle : angle
    const { center, radius } = circleFromChord(
      startAngle,
      startAngle - 2 * angle,
      { x: 0, y: 0 },
      { x: 0, y: trans })
    return (prog: number): string => {
      const { x, y } = pointOnCircle(center, radius,
        startAngle - angle * 2 * prog)
      return `translate(${x}px, ${-y}px)`
    }
  }
  const topTranslator = mkTranslator(topToBottom)
  const bottomTranslator = mkTranslator(bottomToTop)
  const betweenTranslator = mkTranslator(between)

  const stepDuration = 300 // ms

  Promise.all([
    makeAnimationPromise(
      stepDuration,
      prog => topEl.css('transform', topTranslator(prog))
    ).then(() => topEl.removeAttr('style')),
    makeAnimationPromise(
      stepDuration,
      prog => bottomEl.css('transform', bottomTranslator(prog))
    ).then(() => bottomEl.removeAttr('style')),
    makeAnimationPromise(
      stepDuration,
      prog => betweenEls.css('transform', betweenTranslator(prog))
    ).then(() => betweenEls.removeAttr('style'))
  ]).then(resolve)
}

const swap = function () {
  const arrow = $(this)
  const p = arrow.parent()
  const selector = '.' + p.attr('class').replace(' ', '.')
  const [top, bottom] =
    (arrow.attr('class') === 'swap-down')
      ? [p, p.nextAll(selector + ':first')]
      : [p.prevAll(selector + ':first'), p]
  new Promise(swapTranslate(top, bottom)).then(() => {
    swapDom(top, bottom)
    sidenote.fixNotes()
    $('.swap-up, .swap-down').remove()
    decorate()
  })
}

const swapDom = (top: JQuery, bot: JQuery) => {
  const topNext = top.next()
  if (topNext[0] === bot[0]) {
    bot.before(top)
    top.before(bot)
  } else {
    bot.before(top)
    topNext.before(bot)
  }
}

const decorate = () => {
  const up = $('<span class="swap-up"></span>')
  const down = $('<span class="swap-down"></span>')
  const swaps = $('.swap')
  const swapGroups = S.groupBy(S.on(S.equals)(el => $(el).attr('class')))(swaps.toArray())
  const decorateGroup = group => {
    S.pipe([S.tail, S.map(S.map(el => $(el).prepend(up.clone())))])(group)
    S.pipe([S.init, S.map(S.map(el => $(el).append(down.clone())))])(group)
  }
  swapGroups.forEach(decorateGroup)
  $('.swap-up, .swap-down').click(swap)
}

$(decorate)
