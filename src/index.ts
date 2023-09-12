import type { Plugin } from 'postcss'

const Option = {
    transform: 'px',
    viewportWidth: 375
}

interface Options {
    transform?: string
}

const getUnitRegexp = (unit: string) => {
    return new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit, 'g');
}


export const xmPostcssViewport = (Options: Options = Option): Plugin => {
    const opt = Object.assign({}, Option, Options)
    return {
        postcssPlugin: 'xm-postcss-viewport',
        Declaration(node) {
            const value = node.value
            if (value.includes(opt.transform)) {
                const pxRegexp = getUnitRegexp(opt.transform)
                node.value = value.replace(pxRegexp, (match) => {
                    return match.replace(/(\d*\.?\d+)/, (m) => {
                        return ((Number(m) / opt.viewportWidth) * 100).toFixed(2) + 'vw'
                    })
                })
                let reg = new RegExp(Options.transform + '','ig')
                node.value = node.value.replace(reg,'')
            }
        }
    }
}