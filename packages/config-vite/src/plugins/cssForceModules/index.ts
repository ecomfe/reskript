import path from 'node:path';
import fs from 'node:fs/promises';
import {Plugin} from 'vite';

const VIRTUAL_ID_PADDING = '__reskript_css_force_modules__';

const CSS_LANGS = new Set(['.css', '.less', '.sass', '.scss', '.styl', '.stylus', '.pcss', '.postcss']);

interface Options {
    enableModules?: (resource: string) => boolean;
}

const DEFAULT_ENABLE_MODULES = (id: string) => !id.includes('node_modules');

export default function cssForceModules({enableModules = DEFAULT_ENABLE_MODULES}: Options = {}): Plugin {
    return {
        name: 'reskript:css-force-modules',
        enforce: 'pre',
        async resolveId(source, importer, options) {
            if (!enableModules(source)) {
                return;
            }

            const id = source.replace(/\?used$/, '');
            const extension = path.extname(id);

            // 1. 是样式文件
            // 2. 如果已经是`.module.*`了，Vite本来就会处理，所以忽略
            // 3. 如果是`.global.*`，就不需要CSS Modules处理
            // 4. 其它的都转成`.module.*`再让Vite继续处理
            if (CSS_LANGS.has(extension) && !id.includes('.module.') && !id.includes('.global.')) {
                // 因为类似LESS这样的预处理器是要处理样式中的`@import`的，这些引入的文件查找并不完全走Vite的规则，
                // 为了让预处理器能正确地找到对应的文件和，我们必须保持当前文件的`id`在修改后能保留原始的目录信息，
                // 即`path.dirname(resolved.id)`和`path.dirname(source)`是一样的。
                // 因此，我们不能按照Vite推荐的方法，在这里用`virturl:xxx`这样的虚拟路径，只能在原路径上做处理。
                const resolved = await this.resolve(source, importer, {skipSelf: true, ...options});
                return resolved && `${resolved.id.replace(/\?used$/, '')}${VIRTUAL_ID_PADDING}.module${extension}`;
            }
        },
        async load(id) {
            if (!id.includes(VIRTUAL_ID_PADDING)) {
                return;
            }

            const extension = path.extname(id);
            const file = id.slice(0, -(VIRTUAL_ID_PADDING.length + `.module${extension}`.length));
            return {
                code: await fs.readFile(file, 'utf-8'),
            };
        },
    };
}
