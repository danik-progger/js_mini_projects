var obsidian = require('obsidian')

class TestHabrPlugin extends obsidian.Plugin {
    async onload() {
        console.log('Habr stronk')
    }
}

module.exports = TestHabrPlugin
