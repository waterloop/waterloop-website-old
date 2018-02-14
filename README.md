# team-website
Official website of teamwaterloop

## How to start a server and locally run the website?
* Git clone the repo `git clone https://github.com/teamwaterloop/waterloop-website.git --depth=1`
(remove the --depth flag if you are a contributor and don't want the entire commit history)
* Do this `cd waterloop-website`
* Install requirements `npm install`
* If this is your first time doing this contact @aurpine on slack for the API_KEYS
* Run server `npm start`

## Setting up for production
http://pm2.keymetrics.io/docs/usage/deployment/

## Maintaining the team roster
All the data is stored within `routes/teamStructure.json`. The file contains a JSON array of the team. It has the list of members by team alongside the faculty and alumni advisors.
Images of team leads are stored in `public/images` and can be updated in `views/team.ejs` accordingly

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

## Adding to downloads

All the data is stored within `routes/downloads.json`. The file contains a JSON array of the downloads. A download has few properties:

* `name`: The name of the pod, used for titles and such
* `thumbnail`: The image used to display on the page
* `mobile`: The URL of the mobile image version of the download
* `desktop`: The URL of the full image version of the download

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
|style.css   |Holds the CSS for the entire website|

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

## Style Guide
1. Two-space indent.
2. Must run `npm run lint` and fix all linting errors before committing.
