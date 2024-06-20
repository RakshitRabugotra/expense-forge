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
