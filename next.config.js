module.exports = {
    webpack: (config, { isServer }) => {
      // Transpile the @quillforms/blocklib-date-block package
    //   if (!isServer) {
    //     config.resolve.alias['@quillforms/blocklib-date-block'] = require.resolve('@quillforms/blocklib-date-block');
    //   }
  
      // Additional custom configurations can go here
  
      return config;
    },
  
    // Other Next.js configurations can go here
    // For example, you can configure environment variables, images, etc.
  
    // Uncomment and configure the following lines if needed:
    // env: {
    //   MY_ENV_VARIABLE: 'my-value',
    // },
    // images: {
    //   domains: ['example.com'],
    // },
  };
  