// `jest ./babel_sample`
// [この記事](https://qiita.com/riversun/items/6c30a0d0897194677a37)を参考にした
// - CommonJSのモジュール管理ではrequire構文をつかうが、
// babel_sample/hello.jsではES6より導入されたimport文によるモジュール管理をつかっている。
// - 本番向け開発はいままでどおりES6で書いて、Jestでテストするときには、(Babelで)CommonJS形式にしよう、というのはよくやられている。


import {default as Hello} from './hello'

test('greeting#sayHello returns hello', () => {
    const greeting = new Hello();
    expect(greeting.sayHello()).toBe('Hi, there!');
});