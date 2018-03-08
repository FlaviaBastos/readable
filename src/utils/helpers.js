export default function dateToDisplay (timestamp) {
  const mths = {'0': 'Jan', '1': 'Fev', '2': 'Mar', '3': 'Apr', '4': 'May', '5': 'Jun',
                '6': 'Jul', '7': 'Aug', '8': 'Set', '9': 'Oct', '10': 'Nov', '11': 'Dec'}
  let date = new Date(timestamp)
  let dateY = date.getFullYear()
  let dateM = date.getMonth().toString()
  let dateD = date.getDate()
  let exactDate = `${dateD} ${mths[dateM]} ${dateY}`
  return exactDate
}
