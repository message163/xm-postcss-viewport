import { defineConfig } from 'vite'

import { xmPostcssViewport } from './src'

export default defineConfig({

    css: {
        postcss: {
            plugins: [
                xmPostcssViewport()
            ]
        }
    }
})