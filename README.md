## Presentation

Approach adopted : Function based component </br>
To do so, i needed hooks, they were added to React in version 16.8, i had to upgrade the version of react
### Added Tools 

- [React v16.8 (the one with hooks)](https://www.npmjs.com/package/react/v/16.8.0)
- [react-feather (for Search icon)](https://feathericons.com/)
- [use-debounce (for debouncing callbacks)](https://www.npmjs.com/package/use-debounce)
- [react-input-range (input range UI for Testing purpose)](https://www.npmjs.com/package/react-input-range)
- [react-icons (for Spinner icon )] (https://www.npmjs.com/package/react-icons)
- [react-content-loader (for loading the svg Skeletton)](https://github.com/danilowoz/react-content-loader)

### Steps

1. Display paginated users list 
    - Load paginated data  ***(done)***
    - Display data table   ***(done)***
    - Test your components  ***(in progress)***
2. Display quick search bar
    - Display search bar autocomplete input ***(done)***
    - Load data on change ***(done)***
    - Test your components ***(in progress)***




## Display paginated users list
Instead of making a component UI based on raw static data that is coming from a JSON, i prefred to do the job like if it was a real world situation.
I mean by that, what if we were expecting data from an API and we needed to interact with it asynchronously instead of synchronously ? 

The solution was to transform the payload to a promise object through 
```js 
 TransformToPromise(payload : array)
``` 
Function located at  [/src/App/UI/Users/List/utils.js](./src/App/UI/Users/List/utils.js) file.

To simulate internet speed latency i used
```js 
 sleep(someValue : int)
``` 
function located at  [/src/App/UI/Users/List/utils.js](./src/App/UI/Users/List/utils.js) file.
## Added Scripts under /src/App/UI/Users/List folder.
### lib.js
here i created all my styled-comppnents. <br/>
File located at [/src/App/UI/Users/List/lib.js](./src/App/UI/Users/List/lib.js)

### customHooks.js 
Here i created all my customHooks .<br/>
File  located at [/src/App/UI/Users/List/customHooks.js](./src/App/UI/Users/List/customHooks.js)

### list.js 
here i consume all components created at **lib.js** .<br/>
File located at [/src/App/UI/Users/List/list.js](./src/App/UI/Users/List/list.js)

### index.js 
The final result :).<br/>
File located at [/src/App/UI/Users/List/index.js](./src/App/UI/Users/List/index.js).<br/>
if you wonder why i surround dispatch comming from Props with  useSafeDispatch(dispatch) ?
it's for avoiding setState warnings on unmounted React components here is an amazing video made by the famous Kent C.Dodds
explaining why we need to do so : ***https://www.youtube.com/watch?v=8BNdxFzMeVg&t=221s*** .

To replicate the warning follow these steps : 
1. comment line 18 
2. uncomment line 20 in same file
3. open the app in via the command: ***npm start*** or ***npm run start***
4. click Button Next & toggle the checkbox before users load 
5. and voilà you get the warning

the latest version of react stop checking if a component is mounted source : **https://medium.com/doctolib/react-stop-checking-if-your-component-is-mounted-3bb2568a4934**



## Display quick search bar


## Added Scripts under /src/App/UI/Users/Search folder.
### search.js

Here you find the UI available in [/src/App/UI/Users/Search/search.js](./src/App/UI/Users/Search/search.js).</br>
Since it is a small component i decided to keep the created styled-component objects in the same file.</br>
The input and icon are well centred horizontally and vertically and  available in 3 variants  small, medium, large.


