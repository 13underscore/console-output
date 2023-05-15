# console-output
A bookmarklet console clone that hooks onto all the console.log and all the errors and puts it into a output. It can also run code

## Bookmarket
```javascript
javascript:fetch("https://raw.githubusercontent.com/13underscore/console-output/main/main-release.js").then(r => r.text()).then(r => eval(r)).catch(e => alert("Unable to retrive files from github, this may be because the current page is blocking access to github. Please leave a issue at https://github.com/13underscore/console-output/issues. Error code: "+e))
```

## FAQ

TypeError: Failed to fetch
The website you tried to run the bookmarklet on doesn't allow trafic to other website. To fix it: Copy the main-release file and run it as a bookmarklet.

EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval': The website you tried to run doesn't allow evals. To fix it, Copy the main-release file and run it as a bookmarklet, But you cannor run code. Just use inspect element.