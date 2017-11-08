## Mutate
An imbedded music client of sorts for 4chan's music board

Finds all YouTube links and queries them into a list that can be played at will

### Installation
The only configuration required is an API key

However, because this means modifying the source code in some way it can't work on the Chrome Web Store and needs to be manually set up:

1. Download Mutate into the Chrome directory:
- Click the green "Clone or download" button
- Click "Download ZIP"
- Unzip it
- Place it in `<home path>/chrome`

or

`git clone https://github.com/jackhasakeyboard/mutate <home path>/chrome/mutate`

2. Find your API key
- Head to https://console.developers.google.com/
- Log in with a Google account
- Click the "Create Project" button
- Give it a name, any name
- Add "YouTube Data API v3"
- Select "Credentials" on the bar on the left
- Select "Create credentials"

You now have an API key

3. Open the following file:
`<home path>/chrome/mutate/script/key.js`

4. Paste the API key inbetween the quotes:
`var key = '<my API key>'`

And she's gravy

### Hotkeys
| Key    | Effect              |
| ------ | ------------------- |
| n      | Next track          |
| p      | Previous track      |
| Enter  | Load selected track |
| Space  | Pause / Play        |
