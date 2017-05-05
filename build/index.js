#!/usr/bin/env node
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
const generator_1 = require("./generator");
const file_helper_1 = require("./file-helper");
function run(argument) {
    return __awaiter(this, void 0, void 0, function* () {
        if (argument === '--version' || argument === '-V') {
            let helper = new file_helper_1.FileHelper();
            let versionNumber = yield helper.versionNumber();
            console.log(`tsrn version ${versionNumber}`);
        }
        else {
            let generator = new generator_1.ProjectGenerator();
            try {
                generator.startGenerator(argument);
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
if (process.argv.length <= 2) {
    console.log('You must supply a project name.');
}
else {
    run(process.argv[2]);
}
