const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  reactStrictMode: false,
  images: {
    domains: String(process.env.NEXT_PUBLIC_DOMAINS).split(','),
  },
  webpack(config, options) {
    const { dev, isServer } = options

    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    return config
  },
}
