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
        // fetching currency one
        const res = await fetch(url + currency_one)
        const data = await res.json()

        // console.log(dataOne)

        // getting the rates from currency one data for currency two
        const rate = data.rates[currency_two]
        // rate element
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
        // amount equation for second input element
        // value of input one multiplied by rate
        amountTwoInput.value = (amountOneInput.value * rate).toFixed(2)
    }
    getExchangeRates()
}

// EVENT LISTENERS
currencyOne.addEventListener('change', calculate)
amountOneInput.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountTwoInput.addEventListener('input', calculate)

// SWAP BUTTON FUNCTIONALITY
btnSwap.addEventListener('click', () => {
    // put select value of currency one to temp variable
    const temp = currencyOne.value
    // then change currency one value to value of currency two
    currencyOne.value = currencyTwo.value
    // and then get the currency two value from temp
    currencyTwo.value = temp
    // call calculate function when swap is complete
    calculate()
})


