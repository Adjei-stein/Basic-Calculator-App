let keys = document.querySelectorAll('.key')
let user_input = document.querySelector('.input')
let calculator_output = document.querySelector('.output')

//user_input.innerHTML = "200"
let input = ""
let emptyString = ""

for (let key of keys){
    let value = key.dataset.key;
    key.addEventListener("click", () => {
        console.log(value)
        if (value == 'clear'){
            user_input.innerHTML = emptyString
            calculator_output.innerHTML = emptyString
        }
        else if (value == "negative"){
            let negate = user_input.innerHTML
            console.log(negate)
            let negSymbol = "(-"
            if (negate == emptyString){
                user_input.innerHTML = negSymbol
            }
            else {

                if (negate.indexOf(negSymbol) == -1){
                    
                    let i = negate.length - 1;
                    while (i > -1){
                        console.log(negate[i])
                        console.log("i is " + i)
                        if (negate[i] == "+" || negate[i] == '&divide;' || negate[i] == "%" || negate[i] == "x" || negate[i] == "-"){
                            j = i + 1
                            console.log("J is "+ j)
                            user_input.innerHTML = negate.slice(0, j) + negSymbol + negate.slice(j)
                            break
                        }
                        else if (i == 0) {
                            user_input.innerHTML = negSymbol + negate
                            break
                        }
                        i--
                    }
                }
                else {
                        let i = negate.length - 1;
                        let closeBracket = ")";
                        let multiplyWithNegativeValue = "x" + negSymbol
                        while (i >= 0){
                            if (negate[i] == closeBracket) {
                                if (i == negate.length - 1){
                                    user_input.innerHTML = negate + multiplyWithNegativeValue
                                }
                                else {
                                    let k = negate.length - 1;
                                    while (k >= 0){
                                        console.log(negate[k])
                                        console.log("k is " + k)
                                        if (negate[k] == "+" || negate[k] == '&divide;' || negate[k] == "%" || negate[k] == "x" || negate[k] == "-"){
                                            j = k + 1
                                            console.log("J is "+ j)
                                            user_input.innerHTML = negate.slice(0, j) + negSymbol + negate.slice(j)
                                            break
                                        }
                                        k--
                                    }
                                }
                                break
                            }
                            else if (negate[i] == "-" && negate[i-1] == "("){
                                console.log(negate[i])
                                j = i
                                console.log("J is "+ j)
                                new_negate = negate.slice(0, j) + negate.slice(j + 1)
                                console.log(new_negate)
                                user_input.innerHTML = new_negate.slice(0, j - 1) + new_negate.slice(j)
                                break
                            }
                            i--
                        }
                }
            }
        }
        else {
            user_input.innerHTML += value
        }
    })
}