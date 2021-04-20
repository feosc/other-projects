var buttonSubmit = document.querySelector('#app form div.input #send')
var zipCodeField = document.querySelector('#app form div.input #cep')
var results = document.querySelector('#app form main')

buttonSubmit.addEventListener('click', run)

function run(event){
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function(response){
        if(response.data.erro) {
            throw new Error('CEP Invalido')
        }


        results.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf ) 
        createLine(response.data.bairro)
    })
    .catch(function (error){
        results.innerHTML = ''
        console.log(error)
        createLine('Ops. algo deu errado!')
    })
}



function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    results.appendChild(line)
}