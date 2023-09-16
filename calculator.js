let keys = document.querySelectorAll('.key')
let user_input = document.querySelector('.input')
let calculator_output = document.querySelector('.output')

//user_input.innerHTML = "200"
let input = ""
let emptyString = ""
let calculator_display = ""


function occurrence_count(obj, obj_to_seek){
    let objects_length = obj.length
    let j = 0
    
    for (let i = 0; i < objects_length; i++) {
        if (obj[i] == obj_to_seek){
            j++
        }
    }
    return j
}

function actual_input_to_display(given_input){
    let inputs_given = given_input.split('')
    let v = inputs_given.length - 1;
    while (v >= 0){
        console.log(v)
        console.log(inputs_given[v])
        if (inputs_given[v] == "+") {
            inputs_given[v] = '<span class="operator">+</span>'
        }
        else if (inputs_given[v] == "-" && inputs_given[v-1] != "(") {
            inputs_given[v] = '<span class="operator">-</span>'
        }
        else if (inputs_given[v] == "/") {
            inputs_given[v] = '<span class="operator">÷</span>'
        }
        else if (inputs_given[v] == "x") {
            console.log("Here now")
            inputs_given[v] = '<span class="operator">x</span>'
        }
        else if (inputs_given[v] == "(" && inputs_given[v + 1] != "-") {
            inputs_given[v] = '<span class="operator">(</span>'
        }
        else if (inputs_given[v] == ")"){
            let k = inputs_given.length - 1;
            while (k >= 0){
                if (inputs_given[k] == "("){
                    j = k + 1
                    let right_side_of_slice = inputs_given.slice(j)
                    if (right_side_of_slice[1] == "-") {
                        inputs_given[v] = ')'
                    }
                    else {
                        inputs_given[v] = '<span class="operator">)</span>'
                    }
                    break
                }
                k--
            }
        }
        v--
    }
    return inputs_given.join('')
}


function clean_backend_calculation_input(input){
    let new_input = input
    input_length = new_input.length
    let k = input_length - 1;
    while (k >= 0){
        if (new_input[k] == "x"){
                new_input[k] = '*'
        }
        k--
    }
    console.log(new_input)
    return new_input
}


for (let key of keys){
    let value = key.dataset.key;
    key.addEventListener("click", () => {
        console.log(value)
        if (value == 'clear'){
            user_input.innerHTML = emptyString
            input = emptyString
            input_display = emptyString
            calculator_output.innerHTML = emptyString
            calculator_display = emptyString
        }
        else if (value == "negative"){
            let negate = user_input.innerHTML
            let negSymbol = "(-"
            if (negate == emptyString){
                calculator_display = negSymbol
                input = negSymbol
                user_input.innerHTML = actual_input_to_display(calculator_display)
            }
            else {
                if (negate.indexOf(negSymbol) == -1){
                    let i = negate.length - 1;
                    while (i > -1){
                        if (negate[i] == "+" || negate[i] == '÷' || negate[i] == "%" || negate[i] == "x" || negate[i] == "-"){
                            j = i + 1
                            calculator_display = negate.slice(0, j) + negSymbol + negate.slice(j)
                            input = negate.slice(0, j) + negSymbol + negate.slice(j)
                            user_input.innerHTML = actual_input_to_display(calculator_display)
                            break
                        }
                        else if (i == 0) {
                            calculator_display = negSymbol + negate
                            input = negSymbol + negate
                            user_input.innerHTML = actual_input_to_display(calculator_display)
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
                                    calculator_display = negate + multiplyWithNegativeValue
                                    input = negate + multiplyWithNegativeValue
                                    user_input.innerHTML = actual_input_to_display(calculator_display)
                                }
                                else {
                                    let k = negate.length - 1;
                                    while (k >= 0){
                                        if (negate[k] == "+" || negate[k] == '÷' || negate[k] == "%" || negate[k] == "x" || negate[k] == "-"){
                                            j = k + 1
                                            calculator_display = negate.slice(0, j) + negSymbol + negate.slice(j)
                                            input = negate.slice(0, j) + negSymbol + negate.slice(j)
                                            user_input.innerHTML = actual_input_to_display(calculator_display)
                                            break
                                        }
                                        k--
                                    }
                                }
                                break
                            }
                            else if (negate[i] == "-" && negate[i-1] == "("){
                                j = i
                                new_negate = negate.slice(0, j) + negate.slice(j + 1)
                                calculator_display = new_negate.slice(0, j - 1) + new_negate.slice(j)
                                input = new_negate.slice(0, j - 1) + new_negate.slice(j)
                                user_input.innerHTML = actual_input_to_display(calculator_display)
                                break
                            }
                            i--
                        }
                }
            }
        }
        else if (value == "."){
            let inputted_text = user_input.innerHTML
            if (inputted_text.indexOf(value) == -1){
                if (inputted_text.length == 0){
                    if (inputted_text == emptyString){
                        calculator_display = "0."
                        input += "0."
                        user_input.innerHTML = actual_input_to_display(calculator_display)
                    }
                }
                else {
                    calculator_display = inputted_text + "."
                    input += "."
                    user_input.innerHTML = actual_input_to_display(calculator_display)
                }
            }
            else {
                if ((inputted_text.indexOf("+") != -1 || inputted_text.indexOf('÷') != -1 || inputted_text.indexOf("%") != -1 || inputted_text.indexOf("x") != -1 || inputted_text.indexOf("-") != -1) && inputted_text[inputted_text.length - 1] != value){
                    if (occurrence_count(inputted_text, value) >= 2) {
                        let k = inputted_text.length - 1;
                        while (k >= 0){
                            if (inputted_text[k] == "+" || inputted_text[k] == '÷' || inputted_text[k] == "%" || inputted_text[k] == "x" || inputted_text[k] == "-"){
                                j = k + 1
                                let right_side_of_slice = inputted_text.slice(j)
                                if (right_side_of_slice.indexOf(value) == -1) {
                                    calculator_display = inputted_text + "."
                                    input += "."
                                    user_input.innerHTML = actual_input_to_display(calculator_display)
                                }
                                break
                            }
                            k--
                        }
                    }
                    else {
                        calculator_display = inputted_text + "."
                        input += "."
                        user_input.innerHTML = actual_input_to_display(calculator_display)
                    }
                    
                }
            }
        }
        else if (value == "="){
            console.log(input)
            let result = clean_backend_calculation_input(input)
            calculator_output.innerHTML = eval(result)
        }
        else if (value == "x"){
            calculator_display += value
            input += "*"
            user_input.innerHTML = actual_input_to_display(calculator_display)
        }
        else if (value == "brackets"){
            let inputted_text = calculator_display
            console.log(inputted_text)
            if (inputted_text == ""){
                calculator_display = inputted_text + "("
                input += "("
                user_input.innerHTML = actual_input_to_display(calculator_display)
            }
            else if((inputted_text.indexOf("+") == -1 && inputted_text.indexOf('÷') == -1 && inputted_text.indexOf("%") == -1 && inputted_text.indexOf("x") == -1 && inputted_text.indexOf("-") == -1 && inputted_text.indexOf("(") == -1 && inputted_text.indexOf(")") == -1)){
                console.log("Over here, Sir")
                calculator_display = "(" + inputted_text
                input = "(" + input
                user_input.innerHTML = actual_input_to_display(calculator_display) 
            }
            else {
                console.log("Over here rather, Sir")
                let k = inputted_text.length - 1;
                while (k >= 0){
                    if (inputted_text[k] == ")"){
                        if (k == inputted_text.length - 1){
                            calculator_display = inputted_text + "x("
                            input += "*("
                            user_input.innerHTML = actual_input_to_display(calculator_display)
                        }
                        else if ((input[k + 1] == "*" && input[k + 1] == "+" || input[k + 1] == '÷' || input[k + 1] == "%" || input[k + 1] == "-") 
                        && (inputted_text[k + 2] == "x" || inputted_text[k + 2] == "+" || inputted_text[k + 2] == '÷' || inputted_text[k + 2] == "%" || inputted_text[k + 2] == "-")) {
                            calculator_display = inputted_text + "("
                            input += "("
                            user_input.innerHTML = actual_input_to_display(calculator_display)
                        }
                        break;
                    }
                    else if (inputted_text[k] == "("){
                        calculator_display = inputted_text + ")"
                        input += ")"
                        user_input.innerHTML = actual_input_to_display(calculator_display)
                        break;
                    }
                    k--
                }
            }
        }
        else {
            calculator_display += value
            input += value
            user_input.innerHTML = actual_input_to_display(calculator_display)
        }
    })
}