const dropdown = document.querySelector('#dropdown')
const result = document.querySelector('#result')
const resultTitle = document.querySelector('#resultTitle')
const previousDate = document.querySelector('#previousDate')
const currentDate = document.querySelector('#currentDate')

const getTime = (date) => {
  const curDay = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
  const curMonth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const curHours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
  const curMinutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  const curSeconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${curDay}/${curMonth}/${date.getFullYear()}, ${curHours}:${curMinutes}:${curSeconds}`
}

const addCurrency = (currency, curDate, prevDate) => {
  const currentDateAndTime = new Date(curDate)
  const previousDateAndTime = new Date(prevDate)
  for (const keys of Object.values(currency)) {
    const option = document.createElement('option')
    option.classList.add('dropdown-item')
    option.value = `${keys.NumCode}`
    option.name = `${keys.Name}`
    option.textContent = `${keys.ID} - ${keys.Name}`
    dropdown.appendChild(option)
  }
  dropdown.addEventListener('change', (e) => {
    result.style.opacity = 1
    for (const keys of Object.values(currency)) {
      if (e.target.value === `${keys.NumCode}`) {
        resultTitle.textContent = `${keys.ID} - ${keys.Name} (${keys.CharCode}).`
        currentDate.textContent = `${getTime(currentDateAndTime)} - ${
          keys.Value
        }`
        previousDate.textContent = `${getTime(previousDateAndTime)} - ${
          keys.Previous
        }`
      }
    }
  })
}

const getDataFromServer = async () => {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    if (!response.ok) {
      throw new Error('Ошибка при получении данных!')
    }
    const data = await response.json()
    const currency = data.Valute
    const curDate = data.Date
    const prevDate = data.PreviousDate
    addCurrency(currency, curDate, prevDate)
  } catch (error) {
    console.log(`Ошибка при получении данных: ${error.message}`)
  }
}

getDataFromServer()
