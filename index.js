// Styles
import 'normalize-css/normalize.css'
import './src/styles/index.less'

// Modules
// import 'regenerator/runtime'
import App from './src/App'

const app = new App()
app.init().then(() => {
  console.log('-- STARTING APP --')
  app.start()
})
