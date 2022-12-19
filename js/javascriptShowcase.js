// For Javascript Page
import { jsonData } from './data.js';
import { monthlyJSON } from './FuelDataCSV.js';

const initialCurrencySelection = document.querySelector('#initial_currency');
const initialCurrencyAmount = document.querySelector("#currency_amount");
const destinationCurrencySelection = document.querySelector("#destination_currency");
const destinationCurrencyAmount = document.querySelector("#converted_currency");
const convertButton = document.querySelector("#convertButton");
const conversionMessageDiv = document.querySelector("#conversion-message");
const conversionMessageContainer = document.querySelector("#messageContainer");
const chartSpace = document.querySelector("#chart-space").getContext('2d');
const decrementYearButton = document.querySelector("#decrement-year");
const incrementYearButton = document.querySelector("#increment-year");
let chart;
let modeToggleSwitch = document.querySelector("#modeCheckBox");
let modeLabel = document.querySelector("#modeLabel");
let graphControlContainer = document.querySelector("#graph-control-container");
let loadingSvgContainer = document.querySelector("#loading-svg-container");

async function getJSON(startingCurrency, targetCurrency) {
    const jsonURL = `https://www.floatrates.com/daily/${startingCurrency}.json`
    const response = await fetch(jsonURL);
    const currencyJSON = await response.json();
    return currencyJSON[targetCurrency];
}

async function currencyConverterClick() {
    loadingSvgContainer.classList.add("svg-visible");
    let currencyAmount = Number(initialCurrencyAmount.value);
    if(currencyAmount > 0 && currencyAmount < 500) {
        let targetCurrency = destinationCurrencySelection.value.toLowerCase();
        let currencyToConvert = initialCurrencySelection.value.toLowerCase();
        let currencyJson = await getJSON(currencyToConvert, targetCurrency);
        let conversionDate = currencyJson.date;
        let convertedAmount = currencyAmount * currencyJson.rate;
        // TODO: Create message with timestamp and last conversion time - conversionDate.
        let conversionMessage = `Current Exchange Rate: 1 ${currencyToConvert.toUpperCase()} = ${currencyJson.rate} ${targetCurrency.toUpperCase()}. \n\nConverted ${getDate()}.\nConversion rate last updated: ${conversionDate}.`;
        conversionMessageDiv.innerText = conversionMessage;
        destinationCurrencyAmount.value = convertedAmount;
        conversionMessageContainer.style.display = "flex";
        destinationCurrencyAmount.classList.remove('input-controls-readonly-error');
        initialCurrencyAmount.classList.remove('input-controls-error');
    } else {
        conversionMessageContainer.style.display = "none";
        destinationCurrencyAmount.value = currencyAmount > 500? "Please provide a valid amount up to 500.": "Please provide a valid amount";
        initialCurrencyAmount.classList.add('input-controls-error');
        destinationCurrencyAmount.classList.add('input-controls-readonly-error');
    }
    loadingSvgContainer.classList.remove("svg-visible");
};

function resetYearIcons() {
    incrementYearButton.classList.remove("button-disabled");
    decrementYearButton.classList.remove("button-disabled");
}

async function populateChart(yearData) {
    // TODO: Would it make sense to have a fixed Y axis maximum to provide more context as people scroll through?
    chart = new Chart(
        chartSpace,
        {
            type: 'line',
            options: {
                aspectRatio: 1.4,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                },
                scales: {
                    y: {
                        ticks: {callback: value => `${value}p`}
                    }
                }
            },
            data: {
                labels: yearData.map((row) => {
                    return `${row.Month} ${row.DatasetIdentifierCode}`;
                }   
                    ),
                datasets: [
                    {
                        label: 'Solid Fuel',
                        data: yearData.map(row => row.D7DW),
                        backgroundColor: '#b30000',
                        borderColor: '#b30000'
                        
                    },
                    {
                        label: 'Gas',
                        data: yearData.map(row => row.D7DU),
                        backgroundColor: '#4421af',
                        borderColor: '#4421af'
                    },
                    {
                        label: 'Electricity',
                        data: yearData.map(row => row.D7DT),
                        backgroundColor: '#00b7c7',
                        borderColor: '#00b7c7'

                    },
                    {
                        label: 'Liquid Fuels',
                        data: yearData.map(row => row.D7DV),
                        backgroundColor: '#ebdc78',
                        borderColor: '#ebdc78'
                    }
                ]
            }
        }
    );
}

async function alternativeCreateChart() {
    let lastIndex = sessionStorage.getItem("lastIndex");
    resetYearIcons()
    let yearData;
    if(lastIndex == 0) {
        incrementYearButton.classList.add("button-disabled");
        yearData = monthlyJSON.slice(lastIndex-12);
    } else if (lastIndex <= -312) {
        decrementYearButton.classList.add("button-disabled");
        yearData = monthlyJSON.slice(0, lastIndex);
    } else {
        yearData = monthlyJSON.slice(lastIndex-12, lastIndex);
    }
    populateChart(yearData)
}

async function removeChartData(chart) {
    chart.destroy();
}

async function incrementYear() {
    removeChartData(chart);
    sessionStorage.setItem("lastIndex", Number(sessionStorage.getItem("lastIndex"))+12);
    alternativeCreateChart();
}

async function decrementYear() {
    removeChartData(chart)
    sessionStorage.setItem("lastIndex", Number(sessionStorage.getItem("lastIndex"))-12);
    alternativeCreateChart();
}

function switchMode(evt) {
    if(evt.target.checked) {
        // Forecast mode
        modeLabel.innerText = "12 Month Forecast";
        graphControlContainer.style.display = "none";
        removeChartData(chart);
        calculateForecast();
    } else {
        // Historic mode
        modeLabel.innerText = "Historic Data";
        graphControlContainer.style.display = "flex"
        removeChartData(chart);
        alternativeCreateChart();
    }
}

function calculateForecast() {
    const baseData = jsonData["2022"]["Monthly Data"];
    let lastKnownData = baseData.slice(-1)[0];
    const d7DTGrowth = (lastKnownData.D7DT - baseData[0].D7DT) / 12;
    const d7DUGrowth = (lastKnownData.D7DU - baseData[0].D7DU) / 12;
    const d7DVGrowth = (lastKnownData.D7DV - baseData[0].D7DV) / 12;
    const d7DWGrowth = (lastKnownData.D7DW - baseData[0].D7DW) / 12;
    const months = {"0": "September", "1": "October", "2": "November", "3": "December", "4": "January", "5": "February",
    "6": "March", "7": "April", "8": "May", "9": "June", "10":"July", "11": "August"};
    let monthArray = []
    for (let i = 0; i < 12; i++) {
        let tempMonth = {
            "Month": months[i],
            "DatasetIdentifierCode": i < 4? "2022" : "2023",
            "D7DW": i==0? lastKnownData.D7DW + d7DWGrowth : monthArray[i-1].D7DW + d7DWGrowth,
            "D7DU": i==0? lastKnownData.D7DU + d7DUGrowth : monthArray[i-1].D7DU + d7DUGrowth,
            "D7DT": i==0? lastKnownData.D7DT + d7DTGrowth : monthArray[i-1].D7DT + d7DTGrowth,
            "D7DV": i==0? lastKnownData.D7DV + d7DVGrowth : monthArray[i-1].D7DV + d7DVGrowth
        }
        monthArray.push(tempMonth);
    }
    populateChart(monthArray); 
}

modeToggleSwitch.addEventListener('change', switchMode);
convertButton.addEventListener('click', currencyConverterClick);
incrementYearButton.addEventListener('click', incrementYear);
decrementYearButton.addEventListener('click', decrementYear);
sessionStorage.setItem("lastIndex", 0)
alternativeCreateChart();