# team-website
Official website of teamwaterloop

## How to start a server and locally run the website?
* Git clone the repo `git clone https://github.com/teamwaterloop/team-website.git`
* Do this `cd team-website`
* Install requirements `npm install`
* Run server `npm start`

## CSS file documentation
|File Name|Purpose|
|---|---|
|style.css   |  |
|main.css   |   |

## How to use EJS templates?
* A great tutorial here http://www.embeddedjs.com/getting_started.html

* We have a folder `/views` where we store all of our EJS files. The advantage of EJS is that we can include a predefined elements and reuse them that way. So for example, we have a `index.ejs` file that has multiple includes inside it
`<%- include('header', {active: "Home"}); %>` This line would include another EJS file `header.ejs`, meaning that the contents of header will be inserted at that place in the `index` file. This is the main feature of EJS.
* We also have a folder `/public` where we store all of our static content. So things like stylesheet, javascript, font files and images go here.