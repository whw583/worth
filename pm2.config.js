const obj = {
    apps: [
        // First application
        {
            name: "worth",

            script: "./build-server/server/server.js",

            env: {
                NODE_ENV: "production"
            }
        }
    ]
};

module.exports = obj;
