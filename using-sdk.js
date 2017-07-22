const {demo, group, wait, using} = require('demokit')
const {type, paste, key, br} = require('demokit/keyboard')
const scene = require('demokit/scene')
const browser = require('demokit/window/browser')
const terminal = require("demokit/window/terminal")
const editor = require("demokit/window/code-editor")
const mouse = require('demokit/mouse')
const {click, move} = mouse
const recording = require('demokit/recording')
const {link, b, i} = require('demokit/html')
const window = require('demokit/window')
const {focus} = window
const {callout, blurb} = require('demokit/callout')
const styledBlurb = <blurb style = "font-family: 'Lato'; color: #eee;" />

const { username, password } = require('./login.json')

module.exports = (
    <demo>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700"/>
        <wait.loaded font="Lato"/>
        <scene width={1440} height={900} background="linear-gradient(to top, #232526, #414345)"/>

        <terminal id="term"
            contentRect = {{
                origin: {
                    x: 'center',
                    y: 'center'
                },
                size: {
                    width: 600,
                    height: 400
                }
            }}/>

        <editor id="atom" title="index.js"
            contentRect={{
                origin: {
                    x: "center",
                    y: "offscreen-bottom"
                },
                size: {
                    width: 800,
                    height: 600
                }
            }}/>

        <recording.start filePath="videos/using-sdk"/>
        <move x={900} y={550}/>
        <using window="term">
            <window.style dx = { 100 } animate = { true } />
            <callout from = { { x: 500, y: 400 } } to = { { x: 520, y: 400 } }>
                <styledBlurb>
                    Let's create a node project using npm.
                </styledBlurb>
                <styledBlurb>
                    We will call it <b>wm-temperature</b>
                </styledBlurb>
            </callout>
            <window.style dx = { -100 } animate = { true } />
            <click move={false} effect={false} selector="textarea#capture"/>
            <wait delay = { 1000 }/>
            <type>mkdir wm-temperature<br/></type>
            <type><paste>~ $ </paste>cd wm-temperature<br/></type>
            <type><paste>~/wm-temperature $ </paste></type>
            <wait delay = { 3000 }/>
            <type>npm init --yes<br pause={1500}/></type>
            <type><paste>{`Wrote to /~/wm-temperature/package.json:

{
    "name": "wm-temp",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "John Doe <john.doe@mail.com>",
    "license": "ISC"
}`}</paste><br/></type>
            <type><paste>~/wm-temperature $ </paste></type>
            <wait delay = { 2000 }/>
            <terminal.clear ps1="~/wm-temperature $ " />
            <type>npm install --save wireless-monitor<br/></type>
            <wait delay={2000}/>
            <type><paste>{`+ wireless-monitor@1.0.0
added 6 packages in 2.028s`}</paste><br/></type>
            <type><paste>~/wm-temperature $ </paste></type>
            <wait delay={3000}/>
            <type>editor index.js<br/></type>
            <wait delay={1000}/>
        </using>

        <using window="atom">
            <window.style y="center" animate={true} />
            <window.style dx = { 100 } animate = { true } />
            <callout from = { { x: 400, y: 160 } } to = { { x: 420, y: 160 } }>
                <styledBlurb>
                    Let's require <b>wireless-monitor</b> and instantiate an object
                    with our <b>api_key</b>, <b>monitor_key</b> and <b>URL</b>.
                </styledBlurb>
                <styledBlurb>
                    In this example our server is running locally in address                     <b>http://localhost:8000</b>
                </styledBlurb>
            </callout>
            <window.style dx = { -100 } animate = { true } />

            <click selector = "body"/>
            <wait delay = { 1000 } />
            <type>const Monitor = require('wireless-monitor')<br pause={1000} count={2}/></type>
            <type>{`const monitor = new Monitor({`}<br/></type>
            <type>{`\tapi_key: '`}</type>
            <type><paste>fa3076b3-ddb3-421f-a0ed-303a8dd04fb8</paste></type>
            <type>{`',`}<br pause={1000}/></type>
            <type>{`\tmonitor_key: '`}</type>
            <type><paste>e98fb37c-e79c-4a80-ac7f-b8fbdb82d48b</paste></type>
            <type>{`',`}<br pause={1000}/></type>
            <type>{`\turl: 'http://localhost:8000'`}<br pause={1000}/></type>
            <type>{`})`}<br pause={3000} count={2}/></type>

            <window.style dx = { 100 } animate = { true } />
            <callout from = { { x: 400, y: 260 } } to = { { x: 420, y: 260 } }>
                <styledBlurb>
                    Next we need to <b>authenticate</b> then try to <b>send</b> some data.
                </styledBlurb>
                <styledBlurb>
                    The <b>wireless-monitor</b> API is Promise based. You can check other details in our Documentation.
                </styledBlurb>
            </callout>
            <window.style dx = { -100 } animate = { true } />

            <type>{`monitor.auth().then((response) => {
    return monitor.send({value: 25})
}).then((response) => {
    console.log('status:', response.status)
    console.log('result:', response.data)
}).catch((error) => {
    console.log(error);
})`}<br count={2}/></type>
            <wait delay={1500}/>
            <window.style dx={400} animate={true} />
        </using>

        <using window="term">
            <window.style dx={-380} animate={true} />
            <move x={330} y={600}/>
            <click window="atom" move={false} effect={false} selector="textarea#capture"/>
            <wait delay = { 1000 }/>
            <terminal.clear ps1="~/wm-temperature $ " />
            <type>node index.js<br/></type>
            <wait delay = { 1500 }/>
            <type><paste>{`status: 200
result: { data: { value: 25 } }`}</paste><br/></type>
            <type><paste>~/wm-temperature $ </paste></type>
            <wait delay = { 3000 }/>
        </using>

        <recording.stop/>
    </demo>
)
