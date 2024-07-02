/* Utility related to Maths and numbers */

/**
 * Clamps the given number between a certain range
 * @param number The number to limit within the range
 * @param min The lower bound
 * @param max The upper bound
 * @returns The number clamped between range [min, max]
 */
export const clamp = (number: number, min: number, max: number) => {
  return Math.max(min, Math.min(number, max))
}

/**
 * The interface Range for defining min and max
 */
interface Range {
  min: number
  max: number
}

/**
 * Converts a value from old range to new range while preserving the ratio
 * @param value The value to interpolate
 * @param oldRange The old range of number [old_min, old_max]
 * @param newRange The new range of number [new_min, new_max]
 */
export const lconv = (value: number, oldRange: Range, newRange: Range) => {
  return (
    ((value - oldRange.min) / (oldRange.max - oldRange.min)) *
      (newRange.max - newRange.min) +
    newRange.min
  )
}
