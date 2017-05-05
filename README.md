# tsrn
A single command to setup a React Native project with Typescript.


# Installation
`npm install -g tsrn` is all you have to do. tsrn has no dependencies.

# Usage
`tsrn MyProject` will setup a new React Native project for you that is ready to be built with Typescript.

All `.ts/.tsx` files will be in the `source` directory, and the build output goes to the `build directory`.

tsrn is built with Visual Studio Code in mind, and the debugger is already setup so all you have to do is hit `debug iOS/debug Android` from the debug menu to run the app and have Typescript watch for source changes for hot reloading.

tsrn assumes that you have the react-native-cli installed as well as yarn. If you do not have these installed, you can follow the instructions [here](https://facebook.github.io/react-native/docs/getting-started.html) and [here](https://yarnpkg.com/en/docs/install).

# License

MIT License

Copyright (c) 2017 Terry Lewis II

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
