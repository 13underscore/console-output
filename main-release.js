const maindiv = document.createElement('div');
maindiv.setAttribute("id", "console-div");
const body = document.getElementsByTagName('body')[0];
body.appendChild(maindiv);
const parser = new DOMParser();
const doc1 = parser.parseFromString(`
<h3>Console</h3>
<div id="console-output" contenteditable="true"></div>
<div class="input-group input-group-lg">
    <input type="text" class="form-control" id="console-input" data-bs-theme="dark">
</div>
`, "text/html");

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
  }
  #console-output {
    height: 18rem;
    background-color: #323232;
    border-radius: 0.5%;
    overflow: auto;
  }
  #console-input {
    font-family: Arial;
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


console.log('foo');
console.log('bar', 'baz');

const origConsoleErrorLog = console.error;
console.error = (...args) => {
  origConsoleErrorLog.apply(console, args);
  MessageAdd(args, "red")
};


console.error('foo');
console.error('bar', 'baz');

window.onerror = function (error, source, lineno, colno, error) {
    MessageAdd(error, "red")
}

// add message to chat:
function MessageAdd(message, color) {
    var console_messages = document.getElementById("console-output");

    const mesparag = document.createElement('p');
    mesparag.appendChild(document.createTextNode(message));
    mesparag.setAttribute("style", `color: ${color};`);
    console_messages.appendChild(mesparag);
}
