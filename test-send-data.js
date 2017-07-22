
const { demo, group, wait, using } = require('demokit')
const { type, paste, key, br } = require('demokit/keyboard')
const scene = require('demokit/scene')
const browser = require('demokit/window/browser')
const terminal = require("demokit/window/terminal")
const mouse = require('demokit/mouse')
const { click, move } = mouse
const recording = require('demokit/recording')
const { link, b, i } = require('demokit/html')
const window = require('demokit/window')
const { focus } = window
const { callout, blurb } = require('demokit/callout')

const styledBlurb = <blurb style = "font-family: 'Lato'; color: #eee;" />
const blackBlurb = <blurb style = "font-family: 'Lato'; color: #111;" />
const spaceTabs = '    '

const { username, password } = require('./login.json')
const route = {
    monitors: '#app-navbar-collapse > ul > li:last-child a',
    create_temperature: '.container__content > .row > .col-md-12 > .row > .col-md-4:last-child a',
    edit_monitor: '.btn-group a:last-child',
    test_tab: '.container__content ul.nav-tabs > li:nth-child(2) a',
    view_data_tab: '.container__content ul.nav-tabs > li:nth-child(3) a'
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

        <terminal id = "term-send"
            contentRect = {{
                origin: {
                    x: 700,
                    y: "offscreen-bottom"
                },
                size: {
                    width: 600,
                    height: 400
                }
            }}/>

        <using window="wm">
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
            <wait delay={1000}/>
        </using>

        <recording.start filePath="videos/test-send-data"/>

        <using window="wm">
            <click selector={route.monitors}/>
            <wait delay={1000}/>
            <click selector={route.edit_monitor}/>
            <wait delay={1000}/>

            <window.style dx = { 450 } animate = { true } />
            <callout from = { { x: 640, y: 165 } } to = { { x: 680, y: 165 } }>
                <styledBlurb>
                    Let's test our Monitor sending some data.
                </styledBlurb>
                <styledBlurb>
                    You can click on the <b>Test tab</b> and use <i>cURL</i> to send a <b>JSON</b> payload.
                </styledBlurb>
                <wait delay = { 1000 } />
            </callout>
            <window.style dx = { -450 } animate = { true } />
            <wait delay = { 1000 } />

            <click selector={route.test_tab}/>
            <wait delay = { 1000 } />

        </using>

        <window.style id = "term-send" y = { 200 } animate = { true } />
        <wait delay = { 800 }/>
        <move x={1200} y={500}/>
        <using window="term-send">
            <click move={false} effect={false} selector="textarea#capture"/>
            <wait delay = { 1000 }/>
            <type>curl -i -X POST \<br/>
                -F '<paste>api_key=c72d215e-f80c-4217-b07c-f5ff745e338c</paste>' \<br pause={2000}/>
                -F '<paste>monitor_key=1d25c72d-b554-4ae3-bfed-10899b14eca5</paste>' \<br pause={2000}/>
                http://localhost:8000<paste>/api/authenticate</paste><br pause = { 2000 } /><br/></type>
                <type><paste>{`HTTP/1.1 200 OK
Host: localhost:8000
Date: Mon, 26 Jun 2017 09:43:51 -0300
Connection: close
X-Powered-By: PHP/7.1.6-2~ubuntu14.04.1+deb.sury.org+1
Cache-Control: no-cache
Content-Type: application/json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
Date: Mon, 26 Jun 2017 12:43:51 GMT
Set-Cookie: XSRF-TOKEN=eyJpdiI6ImZlZmVyYTNlQm9SV09pUGdHcCtuWHc9PSIsInZhbHVlIjoiY2NFRWt6aFkxNzFiNGpDdkRESXd4Y3lIMk1YenhVSlJoUVd1Y2JINXMzems1OEhja2xSRG5HYmpUc012UzBjUElxZGNITUhVZkJTaCs3ZktNem5wVnc9PSIsIm1hYyI6IjIyYTc5MTdhYzJiYzQ4YzY2YjlkZGQzMmFiOWQ4ZDY3YTdkY2NhNWIzNTg1NDZlMjUxMjI1YWQ5Y2MyNTE2MzYifQ%3D%3D; expires=Mon, 26-Jun-2017 14:43:51 GMT; Max-Age=7200; path=/
Set-Cookie: laravel_session=eyJpdiI6IkplSmZ2ZngySXBvM1doNHVWV0VSVkE9PSIsInZhbHVlIjoiNUNWNkxhaXp2STN5Vk1VYnFseUZyVU5tNzlIS1gxbmZLXC9tRHdxVWZOT0dKNHd3dFIzRW1cL3BvbkhYa1U3VEdid0piMEN1SmtrbVRFdmlkMEN6S1l5UT09IiwibWFjIjoiYjBmZGMwYTRhNzU5NDYyYzdhZWNlMDI1MWQ0NzliYjAyYTNmN2UxZjczZDQ0YjI5YWRjNzdhM2QzOTBkMzdlOCJ9; expires=Mon, 26-Jun-2017 14:43:51 GMT; Max-Age=7200; path=/; HttpOnly

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb25pdG9yX2tleSI6IjFkMjVjNzJkLWI1NTQtNGFlMy1iZmVkLTEwODk5YjE0ZWNhNSIsInN1YiI6NSwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FwaVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDk4NDgxMDMxLCJleHAiOjE0OTg0ODQ2MzEsIm5iZiI6MTQ5ODQ4MTAzMSwianRpIjoiYjdjYTQ1MWFmYTNiNjJmMDZjOTgxNjQzMmNiY2Q5MGUifQ.Ch3vRq385O1Y1IFm6-bBcsBJDwuJIj-Q-mW40MvPx1M"}`}</paste></type>
            <type><br/><paste>~ $ </paste></type>
            <window.scroll selector = "footer#bottom" />
        </using>

        <window.style id = "wm" opacity = { 0.1 } />
        <using window="term-send">
            <wait delay = { 1000 } />
            <callout from = { { x: 670, y: 500 } } to = { { x: 700, y: 500 } }>
                <styledBlurb>
                    Copy the token. You will need it whenever you need to send data.
                </styledBlurb>
            </callout>

            <terminal.clear />
            <type>curl -i -X POST \<br/>
            -H 'Content-Type: application/json' \<br/>
            -H 'Authorization: Bearer <paste>{`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb25pdG9yX2tleSI6IjFkMjVjNzJkLWI1NTQtNGFlMy1iZmVkLTEwODk5YjE0ZWNhNSIsInN1YiI6NSwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2FwaVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDk4NDgxMDMxLCJleHAiOjE0OTg0ODQ2MzEsIm5iZiI6MTQ5ODQ4MTAzMSwianRpIjoiYjdjYTQ1MWFmYTNiNjJmMDZjOTgxNjQzMmNiY2Q5MGUifQ.Ch3vRq385O1Y1IFm6-bBcsBJDwuJIj-Q-mW40MvPx1M`}</paste>' \<br/>
            -d {`'{"data":{"value":23.12}}'`} http://localhost:8000<paste>/api/send</paste></type>
            <type><br pause = { 2000 } /><br/></type>
            <type><paste>{`HTTP/1.1 200 OK
Host: localhost:8000
Date: Tue, 27 Jun 2017 10:06:09 -0300
Connection: close
X-Powered-By: PHP/7.1.6-2~ubuntu14.04.1+deb.sury.org+1
Cache-Control: no-cache
Content-Type: application/json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 53
Date: Tue, 27 Jun 2017 13:06:09 GMT
Set-Cookie: XSRF-TOKEN=eyJpdiI6IkxJYWNcLzkrV1hOekNCcmNIVXluTHBBPT0iLCJ2YWx1ZSI6InB6OGNOejl4MjJFOENrYURwQ0o4THY3T1wvUGlcL2hkNlAzMXRjSVpYY21KUU00OXkyczNGVm4rN214UjJlREdFTHlWNllZUERqQkxSekF2VUZmMGhpNnc9PSIsIm1hYyI6Ijg0YTEwN2MyMGIwNWRlODk0ODBlNjIyZWMwY2E3OWZkODE5OTM0NzQzMGU0NDIyNzgwZTcyNTRkNWNkZGFiY2EifQ%3D%3D; expires=Tue, 27-Jun-2017 15:06:09 GMT; Max-Age=7200; path=/
Set-Cookie: laravel_session=eyJpdiI6InZYcHNYXC9IalpZUEZySnhwOFMzcHd3PT0iLCJ2YWx1ZSI6IlR4NTh6OVZ0NHBjWmU2Nndza0dtdG5LTmw3YXpUcXJFT0RKVG5ZTndtdFhyVU5weGVhY3hoSmtwelk2alBZV2UxWCtFR1BPWlE1cTNjdHdnWGZ0Y2pRPT0iLCJtYWMiOiJiYjExNzEyNjk1ODBhZGJjYjQyNWQxNDE1MzcyNzRjYjhkYzhiZWM1N2IzZmY4YTQ2ZGU1NTY4NDMwMzRlOTQyIn0%3D; expires=Tue, 27-Jun-2017 15:06:09 GMT; Max-Age=7200; path=/; HttpOnly

{"data":{"value":23.12}}`}</paste></type>
            <type><br/><paste>~ $ </paste></type>
            <window.scroll selector = "footer#bottom" />
            <wait delay = { 3000 }/>
        </using>

        <group animate={true}>
            <window.style id = "wm" opacity = { 1 } />
            <window.style id = "term-send" opacity = { 0 } y = { 900 } />
        </group>

        <wait delay = { 800 }/>
        <click window="wm" selector={route.view_data_tab}/>
        <wait delay = { 2000 }/>

        <recording.stop/>
    </demo>
)
