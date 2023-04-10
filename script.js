let container = document.createElement("div");
container.setAttribute("class", "container d-flex flex-column flex-content-center");
container.innerHTML = `
    <h1 id="title" class="text-center">Calculator</h1>
    <p id="description" class="text-center">
        Scratch your head no more. Use my simple yet fast calculator.
    </p>
    <!--Calculator Section-->
    <div class="calculator">
        <input type="text" placeholder="0" id="result" onkeypress="return isNumberKey(event)">
        <button onclick="clr()" id="clear">AC</button>
        <button onclick="del()" id="delete">DEL</button>
        <button onclick="display('%')" id="modulus">%</button>
        <button onclick="display('/')" id="divide">/</button>
        <button onclick="display('7')" id="7">7</button>
        <button onclick="display('8')" id="8">8</button>
        <button onclick="display('9')" id="9">9</button>
        <button onclick="display('*')" id="multiply">*</button>
        <button onclick="display('4')" id="4">4</button>
        <button onclick="display('5')" id="5">5</button>
        <button onclick="display('6')" id="6">6</button>
        <button onclick="display('-')" id="subtract">-</button>
        <button onclick="display('1')" id="1">1</button>
        <button onclick="display('2')" id="2">2</button>
        <button onclick="display('3')" id="3">3</button>
        <button onclick="display('+')" id="add">+</button>
        <button onclick="display('.')" id="decimal">.</button>
        <button onclick="display('0')" id="0">0</button>
        <button class="equalBtn" onclick="calculate('=')" id="equal">=</button>
    </div>
    <!--Restriction Toast-->
    <div class="toast-container position-fixed bottom-0 end-0" style="z-index: 11" >
      <div id="restrictToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Sorry :-(</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-danger text-white">
          Only numbers are allowed.
        </div>
      </div>
    </div>
    <!--Invalid Toast-->
    <div class="toast-container position-fixed top-50 end-0" style="z-index: 11">
      <div id="invalidToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Oops :-(</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-warning text-white">
          Please enter a valid expression.
        </div>
      </div>
    </div>
`;


document.body.append(container);

let outputDisplay = document.getElementById("result");

// Function to restrict user to not allow to enter any keys other than numbers
function isNumberKey(evt) {
    // Create Bootstrap Invalid Toast Trigger
    var restrictElement = document.getElementById("restrictToast");
    var restrictToast = new bootstrap.Toast(restrictElement, {
        delay: 3000
    });

    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        restrictToast.show();
        return false;
    }
    else  return true;
}

// Display values entered values
function display(val){
    // Restrict user from adding multiple decimal points
    if(val === "." && outputDisplay.value.includes('.')){
        return
    }
    else outputDisplay.value += val;
}

// Evaluate Function
function calculate(){
    // Create Bootstrap Invalid Toast Trigger
    var invalidElement = document.getElementById("invalidToast");
    var invalidToast = new bootstrap.Toast(invalidElement, {
        delay: 3000
    });

    try { 
    outputDisplay.value = eval(outputDisplay.value).toFixed(3).replace(/[.,]000$/, "");
    } catch (error) {
     invalidToast.show();
    }
}

// Clear Function
function clr(){
    outputDisplay.value = "";
}

// Delete Last digit or operand
function del(){
    outputDisplay.value = outputDisplay.value.slice(0,-1);
}