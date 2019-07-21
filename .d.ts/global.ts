/**
 * 但这种代码最后会编译成 .js 的 js 代码，供他人使用。这个时候，
 * 类型信息就丢失了。所以 ts 编译器会自动根据 .
 * ts 中的信息，生成对外的 .d.ts 文件，和生成的 js 文件搭配使用。
 * 其中，js 文件是给运行引擎用的，
 * 而 .d.ts 文件是给 IDE（智能编辑器）写代码时参考用的。
 * 另一种情况是，你的代码不是用 ts 写的，
 * 只是希望最后给别人用时能有类型信息作为辅助，
 * 那么这种情况下的 .d.ts 文件就需要你手写了。
 *  */

/**
 * 全局代码库
 *  */

//  代码库的表现形式 全局代码库，会导出名字到全局对象的属性上，
//  全局声明
function creatGreeting(s) {
    return "hello" + s
};
// 直接给全局变量赋值
window.creatGreeting = function(s) {
    return "hello" + s;
}
// 代码库的使用方式 需要增加/// <reference types="..." />指令，以找到相关的.d.ts文件。
/// <reference types="someLib" />
function getThing(): someLib.thing;

// 如果全局代码库，导出了一个名为myLib的函数
// 例如，window.myLib(xxx)
declare function myLib(a: string): string;
declare function myLib(a: number): number;

// 如果全局代码库，导出了一个自定义类型
// 例如，var x: myLib
interface myLib {
    name: string;
    length: number;
    extras?: string[];
}

// 如果全局代码库，导出了一个对象
// 例如，window.myLib.timeout, window.myLib.version, ...
declare namespace myLib {

    // window.myLib.timeout
    let timeout: number;

    // window.myLib.version
    const version: string;

    // window.myLib.Cat
    class Cat {
        constructor(n: number);
        readonly age: number;
        purr(): void;
    }

    // var x: window.myLib.CatSettings
    interface CatSettings {
        weight: number;
        name: string;
        tailLength?: number;
    }
    /**
     * 不同于 interface 只能定义对象类型， type 声明的方式可以定义组合类型，交叉类型，原始类型。

        如果用 type alias 声明的方式，会导致一些功能的缺失：

        interface 方式可以实现接口的 extends 和 implements ， 而 type alias 则不行。
        interface 可以实现接口的 merge ，但 type alias 则不行。
     *  */ 
    // var x: window.myLib.VetID
    type VetID = string | number;

    // window.myLib.checkCat(xxx)
    function checkCat(c: Cat, s?: VetID);
}
