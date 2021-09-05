export const arrayToNumberedList = (array: any[], key: string) => {
  const list = {} as { [key: string]: keyof typeof array }
  array.forEach((item, index) => (list[`${key}_${index + 1}`] = item))
  return list
}
