# Recruitment task for Farm51

#### install dependencies
```
npm install
```
#### serve at localhost:8080
```
npm run dev
```
#### serve with hot reload at localhost:8080
```
npm run hot
```
#### build for production with minification
```
npm run build
```
#### notes

* There should be a compatibility check on item selection before any other action. Prompt should be displayed if compatibility check fails.
* Rendered car implementation could contain several overlapping image layers with transparent background. Currently it only takes into consideration color selection.
* Class naming could be refactored. BEM or just namespacing all the classes. Depending on needs.
* Tabs component should be implemented for easier navigation, currently it's hardcoded