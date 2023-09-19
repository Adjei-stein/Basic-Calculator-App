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


function bracketing(inputs_given){
    let bracker_var = inputs_given
    console.log("bracker_var is" + bracker_var)
    let bracker_var_length = 0
    let t = 0
    let s = 1
    while (t < bracker_var.length){
        t++
    }
    if (occurrence_count(bracker_var, "(") == occurrence_count(bracker_var, ")")){
        console.log("Here, ma nigga")
        bracker_var_length = bracker_var.length - 1
    }
    else {
        if (occurrence_count(bracker_var, "(") > occurrence_count(bracker_var, ")")){
            console.log("Here, ma nigga")
            s = 3
        }
        console.log("Here, ma g")
        bracker_var_length = bracker_var.length
    }
    let bracker_var_array = []
    let l = 0
    let k = 0
    while (l < bracker_var_length) {
        if (bracker_var[l] == "(" || bracker_var[l] == ")"){
            bracker_var_array.push(l)
        }
        l++
    }
    let new_sting = []
    let sting = bracker_var_array
    while (k < bracker_var_length){
        if (bracker_var[bracker_var_array[k]] == "(" && bracker_var[bracker_var_array[k + 1]] == ")"){
            new_sting.push(bracker_var_array[k])
            new_sting.push(bracker_var_array[k + 1])
        }
        k++
    }
    let j = 0
    while (sting.length > s){
        console.log('bracketing is here')
        console.log('sting is ' + sting)
        for (let i in sting){
            j = parseInt(i) + 1
            if (bracker_var[bracker_var_array[i]] == "(" && bracker_var[bracker_var_array[j]] == ")"){
                console.log(j)
                console.log("sting is; " + sting)
                console.log(i)
                console.log("new_sting is; " + new_sting)
                console.log("Removing " + sting[i] + " and " + sting[j])
                sting.splice(i, 2)
            }
        }
    }
    console.log(sting)
    console.log(sting[0])
    if (s == 1){
        return sting[0]
    }
    else {
        return sting[1]
    }
    
}

function actual_input_to_display(given_input){
    let new_given_input = clean_calculation_display(given_input)
    console.log("new_given_input" + new_given_input)
    let inputs_given = new_given_input.split('')
    let v = inputs_given.length - 1;
    let p = v;
    //console.log("p is; " + p)

    for (let input_given in inputs_given){
        console.log("p is; " + input_given)
        console.log("inputs_given[p] is; " + inputs_given[input_given])
        if (inputs_given[input_given] == '<span class="operator">(</span>'){
            inputs_given[input_given] = "("
        }
        else if (inputs_given[input_given] == '<span class="operator">)</span>'){
            inputs_given[input_given] = ")"
        }
    }
    
    
    console.log("inputs_given" + inputs_given)
    while (v >= 0){
        console.log("v is "+ v)
        console.log(inputs_given)
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
            inputs_given[v] = '('
        }
        else if (inputs_given[v] == ")"){
            console.log(inputs_given)
            let k = bracketing(new_given_input)
            let x = get_close_bracket_position(new_given_input)
            console.log("K is being given")
            console.log("k is" + k)
            console.log("x is being given")
            console.log("x is" + x)
            if ((k != undefined && x != undefined) && (k != x) && (inputs_given[parseInt(x) + 1] != "+" && inputs_given[parseInt(x) + 1] != '÷' && inputs_given[parseInt(x) + 1] != "%" && inputs_given[parseInt(x) + 1] != "x" && inputs_given[parseInt(x) + 1] != "-")
            && (inputs_given[parseInt(x) + 1] != '<span class="operator">+</span>' && inputs_given[parseInt(x) + 1] != '<span class="operator">÷</span>' && inputs_given[parseInt(x) + 1] != "%" && inputs_given[parseInt(x) + 1] != '<span class="operator">x</span>' && inputs_given[parseInt(x) + 1] != '<span class="operator">-</span>')){
                console.log("inputs_given[p] " + inputs_given[p])
                console.log("inputs_given[x + 1] " + inputs_given[parseInt(x) + 1])
                inputs_given[k] = '<span class="operator">(</span>'
                inputs_given[x] = '<span class="operator">)</span>'
            }

            
            //console.log("p is; " + p)
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


function clean_calculation_display(input){
    let inputs_given = input.split('')
    let v = inputs_given.length - 1;
    while (v >= 0){
        if (inputs_given[v] == '<span class="operator">(</span>') {
            inputs_given[v] = '('
            console.log("Here 1 " + inputs_given[v])
        }
        else if (inputs_given[v] == '<span class="operator">)</span>'){
            inputs_given[v] = ')'
            console.log("Here 2 " + inputs_given[v])
        }
        v--
    }
    return inputs_given.join('')
}


function get_close_bracket_position(users_input){
    let bracker_var = users_input
    console.log("This is the users input; " + bracker_var)
    let bracker_var_length = bracker_var.length
    let bracker_var_array = []
    let k = 0
    while (k < bracker_var_length) {
        if (bracker_var[k] == ")"){
            bracker_var_array.push(k)
        }
        k++
    }
    console.log(bracker_var_array)
    console.log(bracker_var_array.length)
    last_arr = bracker_var_array.length - 1
    console.log(last_arr)
    console.log(bracker_var[last_arr])
    return bracker_var_array[last_arr]
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
            console.log(bracketing())
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
            let inputted_text_length = inputted_text.length - 1;
            console.log(inputted_text)
            if (inputted_text == ""){
                console.log("Here charley")
                calculator_display = inputted_text + "("
                input += "("
                user_input.innerHTML = actual_input_to_display(calculator_display)
            }
            else if (inputted_text[inputted_text_length] == '('){
                console.log("Here 2 charley")
                calculator_display = inputted_text + "("
                input += "("
                user_input.innerHTML = actual_input_to_display(calculator_display)
            }
            else if((inputted_text.indexOf("+") == -1 && inputted_text.indexOf('÷') == -1 && inputted_text.indexOf("%") == -1 && inputted_text.indexOf("x") == -1 && inputted_text.indexOf("-") == -1 && inputted_text.indexOf("(") == -1 && inputted_text.indexOf(")") == -1)){
                console.log("Here 3 charley")
                calculator_display = "(" + inputted_text
                input = "(" + input
                user_input.innerHTML = actual_input_to_display(calculator_display) 
            }
            else if (occurrence_count(inputted_text, "(") > occurrence_count(inputted_text, ")")){
                console.log(occurrence_count(inputted_text, "("))
                console.log(occurrence_count(inputted_text, ")"))
                console.log("Here 3 too charley")
                let k = inputted_text.length - 1;
                if (inputted_text[k] == "+" || inputted_text[k] == '÷' || inputted_text[k] == "%" || inputted_text[k] == "x" || inputted_text[k] == "-"){
                    calculator_display = inputted_text + "("
                    input += "("
                    user_input.innerHTML = actual_input_to_display(calculator_display)
                }
                else {
                    calculator_display = inputted_text + ")"
                    input += ")"
                    user_input.innerHTML = actual_input_to_display(calculator_display) 
                }
            }
            else {
                var k = inputted_text.length - 1;
                console.log(k)
                while (k >= 0){
                    if (inputted_text[k] == ")"){
                        console.log("Here 4 charley")
                        console.log(k)
                        console.log(input[k + 1])
                        console.log(inputted_text[k + 1])
                        if (k == inputted_text.length - 1){
                            console.log("Here 4 too, charley")
                            calculator_display = inputted_text + "x("
                            input += "*("
                            user_input.innerHTML = actual_input_to_display(calculator_display)
                        }
                        else if ((input[k + 1] == "*" || input[k + 1] == "+" || input[k + 1] == '÷' || input[k + 1] == "%" || input[k + 1] == "-") 
                        && (inputted_text[k + 1] == "x" || inputted_text[k + 1] == "+" || inputted_text[k + 1] == '÷' || inputted_text[k + 1] == "%" || inputted_text[k + 1] == "-")) {
                            console.log("Here 4 too two, charley")
                            calculator_display = inputted_text + "("
                            input += "("
                            user_input.innerHTML = actual_input_to_display(calculator_display)
                        }
                        break;
                    }
                    else if (inputted_text[k] == "("){
                        console.log("Here 5 charley")
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