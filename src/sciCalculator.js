document.addEventListener('DOMContentLoaded', function(){
    const calcDisplay = document.getElementById('display');
    // const calButtons = document.getElementsByClassName('btn')
    const calButtons = document.querySelectorAll('.btn')    // this gives an array
    let currentValueToDisplay = '';

    // todo: not reccomentded to use eval for user inputs, find a way to evaluate user input
    function evaluateResult(){
        // Replace special symbols with their JavaScript equivalents
        const convertedValue = currentValueToDisplay
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/%/g, '*0.01')
        const result = eval(convertedValue)
        currentValueToDisplay = result.toString();
        calcDisplay.value = currentValueToDisplay
    }

    //add event listener to the buttons
    calButtons.forEach(calButton => {
        calButton.addEventListener('click', function(){
            const valueOfTheButton = calButton.textContent;
            if (valueOfTheButton === 'AC'){
                currentValueToDisplay = '';
                calcDisplay.value = currentValueToDisplay
            }else if(valueOfTheButton ==='='){
                evaluateResult();
            }else{
                currentValueToDisplay += valueOfTheButton
                calcDisplay.value = currentValueToDisplay;
            }
        })
    });

    // for loop:
    // for (let i = 0; i <calButtons.length; i++){
    //     const calcButton = calButtons[i];
    //     calcButton.addEventListener('click', function(){
            // const valueOfTheButton = calButton.textContent;
            // currentValueToDisplay += valueOfTheButton
            // calcDisplay.value = currentValueToDisplay;
    //     })
    // }
})
