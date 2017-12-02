# team-website
Official website of teamwaterloop

## How to start a server and locally run the website?
* Git clone the repo `git clone https://github.com/teamwaterloop/team-website.git`
* Do this `cd team-website`
* Install requirements `npm install`
* Run server `npm start`

## Maintaining the flock pages

All the data is stored within `routes/flock.json`. The file contains a JSON array of the pods. A pod has few properties:

* `name`: The name of the pod, used for titles and such
* `thumbnail`: The image used to display on the flock page
* `url`: The location of the pod page within `/flock/`.
* `desc`: A short description of the pod
* `banner`: The parallax image src to display on the pod page
* `sections`: Objects of the sections on the pod page
  * `title`: The header of the section
  * `content`: An array of text (paragraphs)
  * `parallax`: An optional image for a parallax slide above the section
  * `img`: An optional array containing image srcs

## How to add routes?
* Find `routes/siteRoutes.js`
* Insert another one of those
```javascript 1.8
router.get('/', function(req, res, next) {
    res.render('index', { title: '[TITLE]' });
});
```
* where `/` is the url that you want to render
* where `index` is name of ejs file that you want to render
* and `[TITLE]` is the title of the page, generally in the form `Waterloop – [page]`

## CSS file documentation
|File Name|Purpose|
|---|---|
|style.css   |  |

## How to use EJS templates?
* A great tutorial here http://www.embeddedjs.com/getting_started.html

* We have a folder `/views` where we store all of our EJS files. The advantage of EJS is that we can include a predefined elements and reuse them that way. So for example, we have a `index.ejs` file that has multiple includes inside it
`<%- include('header', {active: "Home"}); %>` This line would include another EJS file `header.ejs`, meaning that the contents of header will be inserted at that place in the `index` file. This is the main feature of EJS.
* We also have a folder `/public` where we store all of our static content. So things like stylesheet, javascript, font files and images go here.

## Styling
### Colours:
| Element | Color |
|:--------|:-------|
|Titles | `#262626`|
|Sub-titles | `#27282B`|
|Text (Including Navbar) | `#808080`|
|Downloads link - Navbar | `#C1C1C1`|
|Navbar-BG | `#FFFFFF`|
|Main-BG | `#FAFAFA`|
|Primary-Gold | `#FFD550`|
|Secondary-Gold| `#FFC64F` |

### Fonts:
|| Fonts |
|---| --- |
|Main | Proxima Nova |
|Secondary 1 | Montserrat |
|Secondary 2 | Helvetica |

### Transparency & Drop-Shadows:
Light: `#FCFCFC` overlay at 95% opacity.

Dark: `#27282B` overlay at 75% opacity.

Button drop-shadows: `x:0,  Y:5, B:5`
