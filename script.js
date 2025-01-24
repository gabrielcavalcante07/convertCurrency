//cotação da moeda
const USD = 5.91
const EUR = 6.21
const GBP = 7.38

//obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//manipulando o input amount para receber somente números. 
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch(currency.value){
        case "USD":
            ConvertCurrency(amount.value, USD, "US$")
            break

        case "EUR":
            ConvertCurrency(amount.value, EUR, "€")
            break

        case "GBP":
            ConvertCurrency(amount.value, GBP, "£")
            break
    }
}

//função para converter moeda
function ConvertCurrency(amount, price, symbol){
    try {
        //aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")
        
        //exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`  

        //calcula o total
        let total = amount * price 

        //verifica se o resultado não é um número
        if (isNaN(total)) {
            alert("Por favor, digite o valor corretamente para converter.")
            
        }

        //formatar o valor total
        total = formatCurrencyBRL(total).replace("R$", "")

        //exibe o resultado total
        result.textContent = `${total} Reais`
    
    //remove a classe do footer removendo ele da tela
    } catch (error) {
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
        footer.classList.remove("show-result")
    }
}

//formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
    //converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$00.00)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    
}

