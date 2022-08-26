let operand_storage1="";
let operand_storage2="";
let outcome="0";
let operator_storage="";

const digit_button="0123456789";
const binary_operator_button="+-*/"; 
// const unary_operator_button=["%","+/-","."]; 
// = needs some special treat.
// AC can be used at any time.

function Display()
{
    const answer=document.querySelector(".answer");
    answer.textContent = Math.round(+outcome * 1000000000000)/ 1000000000000;
    //we won't change the outcome, because we still need it to calculate
    const formula=document.querySelector(".formula");
    formula.textContent = `${operand_storage1} ${operator_storage} ${operand_storage2} `;

}


function Reset()
{
    operand_storage1="";
    operand_storage2="";
    outcome="0";
    operator_storage="";
    Display();
}

function Add(a,b)
{
    return a+b;
}
function Subtract(a,b)
{
    return a-b;
}
function Multiply(a,b)
{
    return a*b;
}
function Divide(a,b)
{
    if(b === 0)
    {
        alert("Can't divided by 0") ;
        Reset();
    }
    else 
        return a/b;
}




function Equals(){
    outcome=Operate_two_operands(operand_storage1, operand_storage2, operator_storage);
    Display();
    operand_storage1=outcome;
    operand_storage2="";
    operator_storage="";
}

function Operate_two_operands(operand1, operand2, operator)
{
    if (operator === '+')
        return ( Add(+operand1 , +operand2) ).toString();
    else if (operator === '-')
        return ( (Subtract(+operand1, +operand2)) ).toString();
    else if (operator === '*')
        return ( (Multiply(+operand1, +operand2)) ).toString();
    else if (operator === '/')
        return ( Divide(+operand1, +operand2) ).toString();
}

function Operate_one_operand(operand, operator)
{
    if(operator === '%')
        return ( (+operand)/100 ).toString();
        // +operand will make ure "%" still work.
    else if(operator === '+/-')
        return ( ( - (+operand)).toString() );
}




function EnterANumber(buttonValue)
{
    if( digit_button.search(buttonValue)>= 0)   
        {
            if( operand_storage1.length + operand_storage2.length>30  )
            {
                alert("The length of the formula should be smaller than 29 characters");
                Reset();
                return;
            }

            if(operator_storage === "")
            operand_storage1 +=buttonValue;
            else
            operand_storage2 +=buttonValue;
            Display();
        }
}

function EnterABinaryOperator(buttonValue)
{
    if ( operand_storage1 !== "" && operator_storage === "" )
        {
            operator_storage = buttonValue; 
            Display();
        }
    else if ( operand_storage1 !== "" && operator_storage !== "" && operand_storage2 === "" )
        {
            operator_storage = buttonValue; 
            Display();
        }//If we have already have first operand and a operator, update the operator

    else if ( operand_storage1 !== "" && operator_storage !== "" && operand_storage2 !== "" )
        {
            Equals();
            operator_storage=buttonValue;
            Display();
        }
}

function EnterAEqualSign()
{
    
        if ( operator_storage !== "")
        {
            if (operand_storage1 !== "" && operand_storage2 !=="")
            {
                Equals();
            }  
        }
        if (operand_storage1 !== "" && operand_storage2 ==="") {
            // If there is only one operand, assign the value of operand_storage1 to the outcome.
            // = could be a unary operator as well
            outcome = operand_storage1;
            Display();
        }
    
}

function EnterADotSign()
{
    
        if(operator_storage === "")
        {
            if( operand_storage1.search(/\./) <=0 )
            //I can't use string.search(".") because javascript treat it like a regular expression!
            {
                if(operand_storage1 === "")
                operand_storage1 += "0";
                //6+.will be NaN. Add a 0 first to execute
                operand_storage1 += ".";
            }

        } else {
            if( operand_storage2.search(/\./) <=0 )
            {
                if(operand_storage2 === "")
                operand_storage2 += "0";
                operand_storage2 += ".";
            }
        }
        Display();
    
}

function BackSpace()
{
    if(operand_storage2 !== "" && operand_storage1 !=="" && operator_storage !== "")
    operand_storage2=operand_storage2.slice(0,-1);
    else if(operand_storage2 === "" && operand_storage1 !=="" && operator_storage !== "")
    operator_storage=operator_storage ="";
    else if(operand_storage2 === "" && operand_storage1 !=="" && operator_storage === "")
    operand_storage1=operand_storage1.slice(0,-1);
    Display();
}

function getValue(e)
{
    const buttonValue = (e.target.textContent).toString();

    if (buttonValue === "AC")
        Reset();

    if (buttonValue === "X")
        BackSpace();
        

    //Enter a unary operator
    if (buttonValue === "%" || buttonValue === "+/-")
    {
        if(operator_storage === "")
        operand_storage1 = Operate_one_operand(operand_storage1, buttonValue);
        else
        operand_storage2 = Operate_one_operand(operand_storage2, buttonValue);
        Display();

    }
    if (buttonValue === ".")
        EnterADotSign();
    
    if (buttonValue === "="  )
        EnterAEqualSign();
        
    
    if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/"  )
        EnterABinaryOperator(buttonValue);
    
    
    if( !isNaN(buttonValue) )
    
        EnterANumber(buttonValue);
    

}

const allButtons=Array.from(document.querySelectorAll('button'));
allButtons.forEach( 
    (button) => {
        button.addEventListener('click', getValue);
    }
    );

