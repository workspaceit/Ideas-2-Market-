import moment from 'moment';

export function paddy(num, padlen, padchar) {
  let pad_char = typeof padchar !== 'undefined' ? padchar : '0'
  let pad = new Array(1 + padlen).join(pad_char)
  return (pad + num).slice(-pad.length)
}

export function getSeconds({ minutes, seconds }) {
  if (minutes === undefined || minutes === null || minutes.length === 0) {
    minutes = '0'
  }
  if (seconds === undefined || seconds === null || seconds.length === 0) {
    seconds = '0'
  }
  return moment.duration({
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  }).asSeconds()
}

export function getMinuteStringFromSeconds(seconds) {
  let minutes = Math.trunc(seconds / 60)
  return paddy(minutes, 2)
}

export function getSecondStringFromSeconds(seconds) {
  let _seconds = Math.trunc(seconds - (Math.trunc(seconds / 60) * 60))
  return paddy(_seconds, 2)
}
