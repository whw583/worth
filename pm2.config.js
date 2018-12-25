const obj = {
    apps: [
        // First application
        {
            name: 'worth',

            script: './build-server/server/server.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
}

module.exports = obj
