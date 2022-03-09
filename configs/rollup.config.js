import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json";


// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const globals = {
    ...packageJson.devDependencies,
};

export default {
    input: 'src/main.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS
        },
    ],
    plugins: [
        commonjs(),
        resolve({
            browser: false,
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                exclude: ['**/*.stories.*'],
            },
        }),
        json(),
    ],
    external: Object.keys(globals),
};
