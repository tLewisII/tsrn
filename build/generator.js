"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const file_helper_1 = require("./file-helper");
let packages = {
    scripts: {
        "start": "node node_modules/react-native/local-cli/cli.js start --skipflow",
        "ios": "node node_modules/react-native/local-cli/cli.js run-ios",
        "test": "jest",
        "lint": "tslint source/**/*.ts",
        "preBuild": "yarn rimraf build",
        "build": "tsc",
        "debugPreBuild": "yarn preBuild && yarn build && yarn watch",
        "watch": "tsc -p . --watch"
    },
    jest: {
        "preset": "react-native",
        "transform": {
            "^.+\\.js$": "./node_modules/babel-jest",
            ".(ts|tsx)": "./node_modules/ts-jest/preprocessor.js"
        },
        "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
        "moduleFileExtensions": [
            "ts",
            "tsx",
            "js"
        ]
    }
};
let commands = {
    installDevDependencies: 'yarn add typescript rimraf @types/jest @types/react @types/react-native tslint ts-jest jest-react-native -D',
    installRN: 'react-native init'
};
let files = {
    package: 'package.json',
    tslint: 'tslint.json',
    tsconfig: 'tsconfig.json',
    tasks: 'tasks.json',
    launch: 'launch.json',
    settings: 'settings.json',
    extensions: 'extensions.json',
    babelrc: '.babelrc',
    indexiOS: 'index.ios.js',
    indexAndroid: 'index.android.js',
    indexiOSTest: 'index.ios.test.ts',
    indexAndroidTest: 'index.android.test.ts'
};
class ProjectGenerator extends Object {
    constructor() {
        super();
        this.startGenerator = (dirName) => __awaiter(this, void 0, void 0, function* () {
            yield this.fileHelper.executeProc(`${commands.installRN} ${dirName}`);
            process.chdir(dirName);
            yield this.makeDirs();
            this._writeConfigFiles();
            this._writeSourceFiles(dirName);
            this._removeOldFiles();
            yield this.fileHelper.executeProc(commands.installDevDependencies);
        });
        this.makeDirs = () => __awaiter(this, void 0, void 0, function* () {
            this.fileHelper.mkDir('.vscode');
            this.fileHelper.mkDir('build');
            this.fileHelper.mkDir('source');
        });
        this._writeConfigFiles = () => __awaiter(this, void 0, void 0, function* () {
            let packageJson = yield this.fileHelper.getFile(files.package);
            packageJson['scripts'] = packages.scripts;
            packageJson['jest'] = packages.jest;
            this.fileHelper.writeFile(files.package, JSON.stringify(packageJson));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tslint), files.tslint);
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tsconfig), files.tsconfig);
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tasks), path.join('.vscode', files.tasks));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.launch), path.join('.vscode', files.launch));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.settings), path.join('.vscode', files.settings));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.extensions), path.join('.vscode', files.extensions));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.babelrc), files.babelrc);
        });
        this._writeSourceFiles = (dirName) => __awaiter(this, void 0, void 0, function* () {
            let appDelegate = yield this.fileHelper.getFileString(this.fileHelper.pathForFile('AppDelegate.m'));
            let appDelegateModified = appDelegate.replace('{moduleName}', dirName);
            this.fileHelper.writeFile(path.join('ios', dirName, 'AppDelegate.m'), appDelegateModified);
            let indexIOS = yield this.fileHelper.getFileString(this.fileHelper.pathForFile('index.ios.tsx'));
            let indexIOSModified = indexIOS.replace('{moduleName}', dirName);
            indexIOSModified = indexIOSModified.replace('{moduleName}', dirName);
            indexIOSModified = indexIOSModified.replace('{moduleName}', dirName);
            this.fileHelper.writeFile(path.join('source', 'index.ios.tsx'), indexIOSModified);
            let indexAndroid = yield this.fileHelper.getFileString(this.fileHelper.pathForFile('index.android.tsx'));
            let indexAndroidModified = indexAndroid.replace('{moduleName}', dirName);
            indexAndroidModified = indexAndroidModified.replace('{moduleName}', dirName);
            indexAndroidModified = indexAndroidModified.replace('{moduleName}', dirName);
            this.fileHelper.writeFile(path.join('source', 'index.android.tsx'), indexAndroidModified);
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.indexiOS), files.indexiOS);
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.indexAndroid), files.indexAndroid);
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.indexiOSTest), path.join('__tests__', files.indexiOSTest));
            this.fileHelper.copyFile(this.fileHelper.pathForFile(files.indexAndroidTest), path.join('__tests__', files.indexAndroidTest));
        });
        this._removeOldFiles = () => __awaiter(this, void 0, void 0, function* () {
            this.fileHelper.removeFile('.flowconfig');
            this.fileHelper.removeFile(path.join('__tests__', 'index.ios.js'));
            this.fileHelper.removeFile(path.join('__tests__', 'index.android.js'));
        });
        this.fileHelper = new file_helper_1.FileHelper();
    }
}
exports.ProjectGenerator = ProjectGenerator;
