const withFonts = require('next-fonts');

const prodConfig = {
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export'
}

module.exports = withFonts(prodConfig);