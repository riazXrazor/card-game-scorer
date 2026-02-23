import { configure } from 'quasar/wrappers';
import { fileURLToPath, URL } from 'node:url';

export default configure(function (/* ctx */) {
    return {
        boot: [
        ],
        css: [
            'app.scss'
        ],
        extras: [
            'material-icons'
        ],
        build: {
            target: {
                browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
                node: 'node20'
            },
            vueRouterMode: 'history', // available values: 'hash', 'history'
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        devServer: {
            open: false
        },
        framework: {
            config: {
                dark: true
            },
            plugins: [
            ]
        },
        animations: [],
        pwa: {
            workboxMode: 'GenerateSW',
            injectPwaMetaTags: true,
            swFilename: 'sw.js',
            manifestFilename: 'manifest.json',
            useCredentialsForManifestTag: false,
            manifest: {
                name: 'Card Game Scorer',
                short_name: 'CardScorer',
                description: 'Card game scorer for Fish and Hajari',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#020617',
                theme_color: '#0f172a',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        },
        cordova: {},
        capacitor: {
            hideSplashscreen: true
        },
        electron: {
            inspectPort: 5858,
            bundler: 'packager',
            packager: {},
            builder: {
                appId: 'card-game-scorer'
            }
        },
        bex: {
            contentScripts: [
                'my-content-script'
            ],
        }
    }
});
