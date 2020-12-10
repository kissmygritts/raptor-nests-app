# raptor-nests

A data entry application & dashboard for raptor nest survey efforts at the Nevada Department of Wildlife. *Under active development, will remain unstable until v1 is reached.*

## Test it out

For those interested in testing there are a few prerequisites:

* Install NodeJS
* Install json-server
* install pm2

```bash
git clone https://github.com/kissmygritts/raptor-nests-app.git
cd raptor-nests-app

# install dependencies and build
npm install
npm run build:modern

# run application
pm2 start ecosystem.config.js
```
