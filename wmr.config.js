import { promises as fs } from 'fs';
/**
 *  ls(1) plugin for Rollup / WMR
 *  import pages from 'ls:./pages';
 *  console.log(pages); // ['a.md', 'b.md']
 */
function lsPlugin() {
    return {
        name: 'ls',
        async resolveId(id, importer) {
            if (!id.startsWith('ls:')) return;
            const r = await this.resolve(id.slice(3), importer);
            if (r) return 'ls:' + r.id;
        },
        async load(id) {
            if (!id.startsWith('ls:')) return;
            this.addWatchFile((id = id.slice(3)));
            const files = (await fs.readdir(id)).filter((d) => d[0] != '.');
            return `export default ${JSON.stringify(files)}`;
        }
    };
}

export default async function (config) {
    config.plugins.push(lsPlugin());
}
