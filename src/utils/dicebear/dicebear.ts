import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'

// For unique id generation
import { v4 as uuidv4 } from 'uuid'

/**
 * Creates a random avatar based on some seed
 * @param seed The seed for randomness, can be the user's name
 * @returns A avatar which can be converted with .toString(), toDataUri(), .toJson()
 */
export const generateAvatar = (seed: string) =>
  createAvatar(identicon, {
    seed,
  })

/**
 * Generates a new random unique avatar
 */
export const generateUniqueAvatar = () => generateAvatar(uuidv4())
