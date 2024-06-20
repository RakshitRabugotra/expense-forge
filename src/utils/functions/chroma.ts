/* Utility functions related to colors */
import Color from 'color'

const BASE_COLORS = [
  '#fe2e55' /* Red */,
  '#33a4db' /* light-blue */,
  '#fe9600' /* Orange */,
  '#fecf01' /* Yellow */,
  '#1775fe' /* Blue */,
  '#c7c6cb' /* Grey */,
]

/**
 *
 * @param colorNum The number of colors to generate
 * @returns Generated colors in given format
 */
export const generateColors = (colorNum: number) => {
  // If we need only single color
  if (colorNum <= 1) return BASE_COLORS.slice(-1)

  // If we have the colors under the given spectrum
  if (colorNum <= BASE_COLORS.length) return BASE_COLORS

  // We will start with rotating the base_colors
  const startColor = Color(BASE_COLORS[0], 'hex')

  // Make an array of new colors (in hex)
  const newColors: string[] = []
  for (let i = 0; i < colorNum; i++) {
    newColors.push(
      startColor
        .rotate((320 * (i / colorNum)) % 320)
        .desaturate(0.2)
        .fade(0.2)
        .hex(),
    )
  }
  return newColors
}

/**
 * Converts HSL to RGB,
 * source: https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/#hsl-to-rgb
 * @param h Hue
 * @param s Saturation
 * @param l Luminance
 * @returns A number array [R, G, B]
 */
export const hsl2rgb = (h: number, s: number, l: number) => {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

/**
 * Converts RGB to HEX,
 * source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param r Red
 * @param g Green
 * @param b Blue
 * @returns Array of numbers in form of [R, G, B]
 */
export const rgb2hex = (r: number, g: number, b: number) => {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

/**
 * Converts HSL to HEX
 * @param h Hue
 * @param s Saturation
 * @param l Luminance
 * @returns A string of hex color
 */
export const hsl2hex = (h: number, s: number, l: number) => {
  const rgb = hsl2rgb(h, s, l)
  return rgb2hex(rgb[0], rgb[1], rgb[2])
}

/**
 * COLORS used to categorize the expenses
 */
export const COLORS = generateColors(10)

console.log({ COLORS })
