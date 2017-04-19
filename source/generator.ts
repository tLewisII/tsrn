import * as path from 'path'
import { FileHelper } from './file-helper'

let packages = {
    scripts: {
        "start": "node node_modules/react-native/local-cli/cli.js start --skipflow",
        "ios": "node node_modules/react-native/local-cli/cli.js run-ios",
        "test": "jest --coverage",
        "lint": "tslint source/**/*.ts",
        "preBuild": "yarn rimraf build",
        "build": "tsc",
        "debugPreBuild": "yarn preBuild && yarn build && yarn watch",
        "watch": "tsc -p . --watch"
    }
}

let commands = {
    installDevDependencies: 'yarn add typescript rimraf @types/react @types/react-native tslint -D',
    installRN: 'react-native init'
}

let files = {
    package: 'package.json',
    tslint: 'tslint.json',
    tsconfig: 'tsconfig.json',
    tasks: 'tasks.json',
    launch: 'launch.json',
    settings: 'settings.json'
}

export class ProjectGenerator extends Object {
    private fileHelper: FileHelper

    constructor() {
        super()
        this.fileHelper = new FileHelper()
    }

    startGenerator = async (dirName: string) => {
        await this.fileHelper.executeProc(`${commands.installRN} ${dirName}`)
        process.chdir(dirName)

        await this.makeDirs()

        this._writeConfigFiles()
        this._writeSourceFiles(dirName)
        this._removeOldFiles()

        await this.fileHelper.executeProc(commands.installDevDependencies)
    }

    private makeDirs = async () => {
        this.fileHelper.mkDir('.vscode')
        this.fileHelper.mkDir('build')
        this.fileHelper.mkDir('source')
    }

    private _writeConfigFiles = async () => {
        let packageJson = await this.fileHelper.getFile(files.package)
        packageJson['scripts'] = packages.scripts
        this.fileHelper.writeFile(files.package, JSON.stringify(packageJson))

        this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tslint), files.tslint)
        this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tsconfig), files.tsconfig)
        this.fileHelper.copyFile(this.fileHelper.pathForFile(files.tasks), path.join('.vscode', files.tasks))
        this.fileHelper.copyFile(this.fileHelper.pathForFile(files.launch), path.join('.vscode', files.launch))
        this.fileHelper.copyFile(this.fileHelper.pathForFile(files.settings), path.join('.vscode', files.settings))
    }

    private _writeSourceFiles = async (dirName: string) => {
        let appDelegate = await this.fileHelper.getFileString(this.fileHelper.pathForFile('AppDelegate.m'))
        let appDelegateModified = appDelegate.replace('{moduleName}', dirName)
        this.fileHelper.writeFile(path.join('ios', dirName, 'AppDelegate.m'), appDelegateModified)

        let indexIOS = await this.fileHelper.getFileString(this.fileHelper.pathForFile('index.ios.tsx'))
        let indexIOSModified = indexIOS.replace('{moduleName}', dirName)
        indexIOSModified = indexIOSModified.replace('{moduleName}', dirName)
        indexIOSModified = indexIOSModified.replace('{moduleName}', dirName)
        this.fileHelper.writeFile(path.join('source', 'index.ios.tsx'), indexIOSModified)

        let indexAndroid = await this.fileHelper.getFileString(this.fileHelper.pathForFile('index.android.tsx'))
        let indexAndroidModified = indexAndroid.replace('{moduleName}', dirName)
        indexAndroidModified = indexAndroidModified.replace('{moduleName}', dirName)
        indexAndroidModified = indexAndroidModified.replace('{moduleName}', dirName)
        this.fileHelper.writeFile(path.join('source', 'index.android.tsx'), indexAndroidModified)
    }

    private _removeOldFiles = async () => {
        this.fileHelper.removeFile('index.ios.js')
        this.fileHelper.removeFile('index.android.js')
        this.fileHelper.removeFile('.flowconfig')
    }
}
