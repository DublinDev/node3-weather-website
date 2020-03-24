console.log('client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'messageOne';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading ...';

    fetch('http://localhost:3000/weather?address=' + search.value).then(resp => {
        resp.json().then(data => {
            messageOne.textContent = '';

            if (data.error) messageOne.textContent = data.error;
            else messageTwo.textContent = `In ${data.location} it is ${data.weather}`;
        })
    })
})