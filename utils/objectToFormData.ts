export const objectToFormData = (data: object) => {
  const outputData = new FormData()

  for (const key in data) {
    outputData.append(key, data[key as keyof typeof data] || '')
  }

  return outputData
}
