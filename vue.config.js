module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      outputDir: "dist",
      removeElectronJunk: false,
      nodeIntegration: true,
      builderOptions: {
        productName: "Asteroid",
        mac: {
          darkModeSupport: true
        },
        dmg: {
          artifactName: "Asteroid-v${version}.${ext}",
          title: "Asteroid"
        },
        nsis: {
          artifactName: "Asteroid-v${version}.${ext}",
          deleteAppDataOnUninstall: true,
          shortcutName: "Asteroid",
          uninstallDisplayName: "Asteroid"
        }
      }
    }
  },
  devServer: {
    https: false,
    proxy: {
      "^/api": {
        target: "https://www.theparadigmdev.com",
        changeOrigin: true,
        ws: true,
        cookieDomainRewrite: {
          "*": ""
        }
      }
    }
  }
};
