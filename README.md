# material-ui-calculator

```javascript
import Calculator from 'material-ui-calculator';
const Demo = () => <Calculator mode="basic"/>
```


Should look something like this when ready: 

![./sample.png](./sample.png)

## Roadmap

1. something like we have now
2. with selection + prettier input as described below..

# TODOS

* hook up all functions
* display is input
* tab
* tests

* if using input will need to track selection

* Try having the buttons just add symbols, or supescript

so if we have:
```shell
33|3 + sin => 33sin(|)3

33|3 + pi => 33pi|3

4 + xy => 4ʸ (with y selected)

4 + x3 => 4³
```

we then convert this expr into something mathjs can eval: 
```
4³ => 4^3
33pi|3 => 33pi1 // which will be an error
```
## Prior Art

* http://calculator.smarterbalanced.org/scientificinv.html
* https://www.google.com/search?q=scientific+calculator&oq=scien&aqs=chrome.0.69i59j69i60j69i61j69i59j69i60l2.1504j0j7&sourceid=chrome&ie=UTF-8



# handy
* https://lingojam.com/SuperscriptGenerator