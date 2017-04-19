#!/usr/bin/env node
import { ProjectGenerator } from './generator'

if (process.argv.length <= 2) {
    console.log('You must supply a project name.')
    process.exit(0)
}

let dirName = process.argv[2]
let generator = new ProjectGenerator()

try {
    generator.startGenerator(dirName)
} catch (error) {
    console.log(error);
}

