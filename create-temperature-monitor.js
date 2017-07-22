
const {demo, group, wait, using} = require('demokit')
const {type, paste, key} = require('demokit/keyboard')
const scene = require('demokit/scene')
const browser = require('demokit/window/browser')
const mouse = require('demokit/mouse')
const { click, move } = mouse
const recording = require('demokit/recording')
const { link, b, i } = require('demokit/html')
const window = require('demokit/window')
const { callout, blurb } = require('demokit/callout')

const styledBlurb = <blurb style = "font-family: 'Lato'; color: #eee;" />

const { username, password } = require('./login.json')
const route = {
    monitors: '#app-navbar-collapse > ul > li:last-child a',
    create_temperature: '.container__content > .row > .col-md-12 > .row > .col-md-4:last-child a'
}

module.exports = (
    <demo>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700"/>
        <wait.loaded font="Lato"/>

        <scene width={1440} height={900}
            background="linear-gradient(to top, #232526, #414345)"/>

        <browser id="wm" title="Wireless Monitor"
            contentURL="http://localhost:8000/login"
            contentRect={{
            origin: {
                x: 'center',
                y: 'center'
            },
            size: {
                width: 1024,
                height: 768
            }
        }}/>

        <recording.start filePath="videos/video"/>

        <using window="wm">
            <mouse.hide/>
            <wait delay={1000}/>
            <click selector="input#email"/>
            <wait delay={500}/>
            <type>{username}</type>
            <click selector="input#password"/>
            <wait delay={500}/>
            <type>
                <paste>{password}</paste>
            </type>
            <click selector="button[type=submit]"/>

            <wait delay={2000}/>
            <move selector={route.monitors}/>
            <click selector={route.monitors}/>

            <window.style dx = { 450 } animate = { true } />
            <callout from = { { x: 630, y: 165 } } to = { { x: 680, y: 165 } }>
                <styledBlurb>
                    Let's create a <b>Temperature Monitor</b>
                </styledBlurb>
                <wait delay = { 2000 } />
            </callout>
            <window.style dx = { -450 } animate = { true } />
            <wait delay = { 1000 } />

            <move selector={route.create_temperature}/>
            <click selector={route.create_temperature}/>
            <wait delay={1500}/>

            <click selector="input#description"/>
            <wait delay={500}/>
            <type>My Bedroom</type>

            <click selector="input#min"/>
            <wait delay={500}/>
            <type>15</type>

            <click selector="input#max"/>
            <wait delay={500}/>
            <type>42</type>

            <click selector="select#unit"/>
            <wait delay={500}/>
            <key code="Enter"/>
            <click selector="input[type=submit]"/>
            <wait delay={1000}/>

            <click selector=".btn-group a:last-child"/>
            <wait delay={1000}/>

            <window.style dx = { 450 } animate = { true } />
            <callout from = { { x: 650, y: 165 } } to = { { x: 680, y: 165 } }>
                <styledBlurb>
                    From here you can see the <b>Setup tab</b> with initial instructions
                </styledBlurb>
                <styledBlurb>
                    <b>Wireless Monitor</b> uses <b>JSON</b> for communication and standard <i>GET</i> and <i>POST</i> requests. Check out the Documentation.
                </styledBlurb>
                <wait delay = { 2000 } />
            </callout>
            <window.style dx = { -450 } animate = { true } />
            <wait delay = { 1000 } />

        </using>

        <recording.stop/>

    </demo>
)
