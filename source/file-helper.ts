import * as fs from 'fs'
import * as child from 'child_process'
import * as path from 'path'

export class FileHelper extends Object {

    pathForFile = (name: string) => {
        let dir = path.parse(__dirname).dir
        return path.join(dir, 'source', "files", name)
    }

    removeFile = async (file: string) => {
        return new Promise((resolve, reject) => {
            fs.unlink(file, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    copyFile = async (source: string, destination: string) => {
        return new Promise((resolve, reject) => {
            let input = fs.createReadStream(source)
            let output = fs.createWriteStream(destination)

            input.on('error', (err) => {
                input.destroy()
                output.end()
                reject(err)
            })

            output.on('error', (err) => {
                input.destroy()
                output.end()
                reject(err)
            })

            output.on('finish', resolve)
            input.pipe(output)
        })
    }

    getFileString = async (path: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.toString())
                }
            })
        })
    }

    getFile = async (path: string): Promise<{}> => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data.toString()))
                }
            })
        })
    }

    writeFile = async (fileName: string, file: string) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, file, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    mkDir = async (name: string) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(name, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    executeProc = (cmd: string) => {
        return new Promise((resolve, reject) => {
            let proc = child.exec(cmd, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })

            proc.stdout.on('data', console.log);
        })
    }
}