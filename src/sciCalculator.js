document.addEventListener('DOMContentLoaded', function(){
    const calcDisplay = document.getElementById('display');
    // const calButtons = document.getElementsByClassName('btn')
    const calButtons = document.querySelectorAll('.btn')    // this gives an array
    let currentValueToDisplay = '';

    // todo: not reccomentded to use eval for user inputs, find a way to evaluate user input
    function evaluateResult(){
        // Replace special symbols with their JavaScript equivalents
        const convertedValue = currentValueToDisplay
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/%/g, '*0.01')
            .replace('sin', 'Math.sin')
            .replace('cos', 'Math.cos')
            .replace('tan', 'Math.tan')
            .replace('ln', 'Math.log')
            .replace('π', 'Math.PI')
            .replace('e', 'Math.E')
            .replace('log', 'Math.log10')
            .replace('2√x', 'Math.sqrt')
            .replace('x²', '**2')
            .replace('x³', '**3')
            .replace('xʸ', '**')
            .replace('10ˣ', '10**')
            .replace('1/x', '(1/')
            .replace('√', 'Math.sqrt')
            .replace('x!', 'factorial')
            .replace('sinh', 'Math.sinh')
            .replace('cosh', 'Math.cosh')
            .replace('tanh', 'Math.tanh')
            .replace('EE', 'Math.pow(10,')
            .replace('Rand', 'Math.random()')
            .replace('log₂', 'Math.log2')
            .replace('log₁₀', 'Math.log10');
        const result = eval(convertedValue)
        currentValueToDisplay = result.toString();
        calcDisplay.value = currentValueToDisplay
    }

    //add event listener to the buttons
    calButtons.forEach(calButton => {
        calButton.addEventListener('click', function(){
            const valueOfTheButton = calButton.textContent;
            try{
               if (valueOfTheButton === 'AC'){
                   currentValueToDisplay = '';
                   calcDisplay.value = currentValueToDisplay
               }else if(valueOfTheButton ==='='){
                   evaluateResult();
               }else{
                   currentValueToDisplay += valueOfTheButton
                   calcDisplay.value = currentValueToDisplay;
               }

           } catch(error){
                console.error(error);
                currentValueToDisplay = 'ERROR'
                calcDisplay.value = currentValueToDisplay;
           }
        })
    });
})
