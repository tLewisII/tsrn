#!/usr/bin/env node
import { ProjectGenerator } from './generator'
import { FileHelper } from './file-helper'
async function run(argument: string) {

    if (argument === '--version' || argument === '-V') {
        let helper = new FileHelper()
        let versionNumber = await helper.versionNumber()
        console.log(`tsrn version ${versionNumber}`)
    } else {
        let generator = new ProjectGenerator()

        try {
            generator.startGenerator(argument)
        } catch (error) {
            console.log(error);
        }
    }
}

if (process.argv.length <= 2) {
    console.log('You must supply a project name.')
} else {
    run(process.argv[2])
}
