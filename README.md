# console-output
A bookmarklet console clone that hooks onto all the console.log and all the errors and puts it into a output. It can also run code

## Bookmarket
```javascript
javascript:fetch("https://raw.githubusercontent.com/13underscore/console-output/main/main-release.js").then(r => r.text()).then(r => eval(r)).catch(e => alert("Unable to retrive files from github, this may be because the current page is blocking access to github. Please leave a issue at https://github.com/13underscore/console-output/issues. Error code: "+e))
```
