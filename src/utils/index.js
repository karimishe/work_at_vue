export const countObjectsProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}
