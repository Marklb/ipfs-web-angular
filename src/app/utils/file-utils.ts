export const readFileAsync = async (file: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}
