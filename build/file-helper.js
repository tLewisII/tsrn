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
const fs = require("fs");
const child = require("child_process");
const path = require("path");
class FileHelper extends Object {
    constructor() {
        super(...arguments);
        this.versionNumber = () => __awaiter(this, void 0, void 0, function* () {
            let dir = path.parse(__dirname).dir;
            let packageJson = yield this.getFile(path.join(dir, 'package.json'));
            return packageJson['version'];
        });
        this.pathForFile = (name) => {
            let dir = path.parse(__dirname).dir;
            return path.join(dir, 'source', "files", name);
        };
        this.removeFile = (file) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.unlink(file, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
        this.copyFile = (source, destination) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let input = fs.createReadStream(source);
                let output = fs.createWriteStream(destination);
                input.on('error', (err) => {
                    input.destroy();
                    output.end();
                    reject(err);
                });
                output.on('error', (err) => {
                    input.destroy();
                    output.end();
                    reject(err);
                });
                output.on('finish', resolve);
                input.pipe(output);
            });
        });
        this.getFileString = (path) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data.toString());
                    }
                });
            });
        });
        this.getFile = (path) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(data.toString()));
                    }
                });
            });
        });
        this.writeFile = (fileName, file) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(fileName, file, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
        this.mkDir = (name) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.mkdir(name, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
        this.executeProc = (cmd) => {
            return new Promise((resolve, reject) => {
                let proc = child.exec(cmd, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
                proc.stdout.on('data', console.log);
            });
        };
    }
}
exports.FileHelper = FileHelper;
