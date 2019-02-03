import puzzleParameter from './views/puzzleParameter/puzzleParameter.js'
let test = {}
    test.install = function (Vue, options) {
        Vue.prototype.$msg = puzzleParameter
    }

    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue);
      }
      
    export default test