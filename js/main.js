const currencyOne = document.getElementById('currency-one')
const currencyTwo = document.getElementById('currency-two')
const amountOneInput = document.getElementById('amount-one')
const amountTwoInput = document.getElementById('amount-two')
const btnSwap = document.getElementById('swap')
const rateEl = document.querySelector('.rate')

const url = 'https://api.exchangerate-api.com/v4/latest/'

calculate()
// FETCH EXCHANGE RATES AND UPDATE THE DOM
function calculate() {
    // console.log('works')

    const currency_one = currencyOne.value
    const currency_two = currencyTwo.value
    // console.log(currency_one, currency_two)

    async function getExchangeRates() {
        const res = await fetch(url + currency_one)
        const data = await res.json()

        // console.log(dataOne)
        const rate = data.rates[currency_two]
        // rate element
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
        // amount equation
        amountTwoInput.value = (amountOneInput.value * rate).toFixed(2)
    }
    getExchangeRates()
}

// EVENT LISTENERS
currencyOne.addEventListener('change', calculate)
amountOneInput.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountTwoInput.addEventListener('input', calculate)

// SWAP BUTTON
btnSwap.addEventListener('click', () => {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    calculate()
})


