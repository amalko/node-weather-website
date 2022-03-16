
const WeatherForm = document.querySelector('form')      //to select/get the 'form' tag from index.hbs
const searchElement = document.querySelector('input')   //to get the input text from index.hbs
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

WeatherForm.addEventListener('submit', (e /*event object*/)=>{
    e.preventDefault()                  //prevents the web page from refreshing upon clicking 'submit'
    
    const location = searchElement.value    //to select or obtain the value/text from the entry
    
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error)
            messageOne.textContent = data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            //render data to the web page
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})













