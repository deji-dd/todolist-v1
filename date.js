exports.getDate = function() {

  const today = new Date()
  const currDay = today.getDay()
  const currMonth = today.getMonth()
  const currDate = today.getDate()
  let dateSuffix = ""

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  if ([1, 21, 31].includes(currDate)) {
    dateSuffix = "st"
  } else if ([2, 22].includes(currDate)) {
    dateSuffix = "nd"
  } else if ([3, 23].includes(currDate)) {
    dateSuffix = "rd"
  } else {
    dateSuffix = "th"
  }

  return `${days[currDay]}, ${months[currMonth]} ${currDate}<sup>${dateSuffix}</sup>`
}
