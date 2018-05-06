exports.config = {
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T01-loadData.js'],
    
    capabilities: {
        'browserName':'phantom.js'
    }
}