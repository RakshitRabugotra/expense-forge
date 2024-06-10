/* tailwindCSS Util functions */

/**
 * Generates a tailwindCSS style className string for each style and prefix
 * @param styles The styles like ['bg-white', 'text-black']
 * @param prefixes The prefix or state selectors like ['hover', 'focus', 'md']
 * @returns A joined string containing all the styles
 */
export const mapStyles = (styles: string[], prefixes: string[]) =>
  prefixes
    .map((prefix) => styles.map((style) => `${prefix}:${style}`).join(' '))
    .join(' ')

/**
 * Makes the program sleep for some time
 * @param ms The milliseconds for which to sleep
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
