const parser = new DOMParser();
const maindiv = parser.parseFromString(`
<div id="console-div">
    <div id="console-divheader">
        <h3>Console</h3>
    </div>
    <div id="console-output" contenteditable="true"></div>
    <form id="console-form">
        <div class="input-group input-group-lg">
            <input type="text" class="form-control" id="console-input" data-bs-theme="dark" placeholder=">>> Enter Code" id="console-input">
        </div>
    </form>
</div>
`, "text/html");
const body = document.getElementsByTagName('body')[0];
body.insertBefore(maindiv.body.firstChild, body.firstChild);

// create a style element
const style = document.createElement('style');

// add the CSS as a string using template literals
style.appendChild(document.createTextNode(`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css');
  #console-div { 
    font-family: 'Montserrat', sans-serif;
    color: white;
    background-color: #232323;
    width: 46rem;
    border-radius: 0.5%;
    position: fixed;
    z-index: 10001;
  }
  #console-output {
    height: 18rem;
    background-color: #323232;
    border-radius: 0.5%;
    overflow: auto;
  }
  #console-input {
    font-family: Arial;
  }
  #console-divheader {
    padding: 10px;
    cursor: move;
    z-index: 10002;
  }`
));

// add it to the head
const head = document.getElementsByTagName('head')[0];
head.appendChild(style);



const origConsoleLog = console.log;
console.log = (...args) => {
  origConsoleLog.apply(console, args);
  MessageAdd(args, "white")
};


console.log('This message means that the console logs are currently working.');

const origConsoleErrorLog = console.error;
console.error = (...args) => {
  origConsoleErrorLog.apply(console, args);
  MessageAdd(args, "red")
};


console.error('This message means that the error logs are currently working.');

window.onerror = function (error, source, lineno, colno, errorobj) {
    MessageAdd(`${error}`, "red")
}


const origConsoleWarnLog = console.warn;
console.warn = (...args) => {
  origConsoleWarnLog.apply(console, args);
  MessageAdd(args, "yellow")
};

console.warn('This message means that the warn logs are currently working.')


const origConsoleDebugLog = console.debug;
console.debug = (...args) => {
  origConsoleDebugLog.apply(console, args);
  MessageAdd(args, "gray")
};

console.debug('This message means that the debug logs are currently working.')

const origConsoleInfoLog = console.info;
console.info = (...args) => {
  origConsoleInfoLog.apply(console, args);
  MessageAdd(args, "blue")
};

console.info('This message means that the Info logs are currently working.')

// add message to chat:
function MessageAdd(message, color) {
    var console_messages = document.getElementById("console-output");

    const mesparag = document.createElement('p');
    mesparag.appendChild(document.createTextNode(message));
    mesparag.setAttribute("style", `color: ${color};`);
    console_messages.appendChild(mesparag);
    console_messages.scrollTop = console_messages.scrollHeight;
}

// Make the DIV element draggable:
dragElement(document.getElementById("console-div"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.getElementById("console-form").addEventListener("submit", function(event){
  event.preventDefault()
  const val = document.getElementById("console-input").value
  MessageAdd("> "+val)
  let res = eval(val)
  if (res){
    MessageAdd(res.toString())
  }
});