// Custom Advanced Behaviour of Next.js

module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    siteMetadata: {
        title: "Contacts App",
        description: "React & Next.js app for Contacts Management",
        url: "https://github.com/kamiryu-sama/contacts-app#readme",
        contact: {
            email: "dieterdewit@gmail.com",
        },
    },
    // Webpack configuration to load image and .woff font files
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(jpg|JPG|jpeg|JPEG|png|PNG|woff)$/,
            loader: 'url-loader'
        });
        return config
    },
}
