// https://www.cnblogs.com/sapho/p/4982483.html
// https://www.4455q.com/tech/umd_commonjs_es-module_amd.html


// 对象

// 如果模块库是UMD，导出一个全局对象myLib
export as namespace myLib;

// 如果模块库导出的对象有方法，例如导出一个这样的对象 {myMethod,myOtherMethod}
export function myMethod(a: string): string;
export function myOtherMethod(a: number): number;

// 如果模块库导出了一个类型，例如 {someType}
export interface someType {
    name: string;
    length: number;
    extras?: string[];
}

// 可以声明模块导出的对象，有哪些属性
export const myField: number;

// 导出一个名字空间，这个名字空间中可以有类型，属性，和方法
export namespace subProp {

    // import { subProp } from 'yourModule'; 其中subProp是一个名字空间
    // subProp.foo(); 名字空间中的方法

    // 或者 import * as yourMod from 'yourModule'; 其中 import * as yourMod 将整个模块看做yourMod
    // yourMod.subProp.foo();
    export function foo(): void;
}



/*
    导出一个类
*/ 

// 如果模块库是UMD，导出一个全局对象myLib
export as namespace myClassLib;
// 表明模块只导出了一个类，

// 注意，ES module只能导出一个对象，不能导出一个类
export = MyClass;

// 声明导出的这个类的构造器，属性，和方法
declare class MyClass {

    // 构造器
    constructor(someParam?: string);

    // 属性
    someProperty: string[];

    // 方法
    myMethod(opts: MyClass.MyClassMethodOptions): number;
}

// 如果导出的这个类，还可以做为名字空间来使用
declare namespace MyClass {

    // 名字空间中的类型
    // const MyClass = require('yyy');
    // const x: MyClass.MyClassMethodOptions
    export interface MyClassMethodOptions {
        width?: number;
        height?: number;
    }
}



/*
    导出一个方法
*/ 


// 如果模块库是UMD，导出一个全局函数myFuncLib
export as namespace myFuncLib;

// 表明模块只导出了一个函数，
// 注意，ES module只能导出一个对象，不能导出一个函数
export = MyFunction;

// 导出的函数可以具有多个重载版本
declare function MyFunction(name: string): MyFunction.NamedReturnType;
declare function MyFunction(length: number): MyFunction.LengthReturnType;

// 如果导出的这个函数，还可以做为名字空间来使用
declare namespace MyFunction {

    // 名字空间中的类型
    // const MyFunction = require('yyy');
    // const x: MyFunction.LengthReturnType
    export interface LengthReturnType {
        width: number;
        height: number;
    }

    // 名字空间中的类型
    // const MyFunction = require('yyy');
    // const x: MyFunction.NamedReturnType
    export interface NamedReturnType {
        firstName: string;
        lastName: string;
    }

    // 名字空间中的属性
    export const defaultName: string;

    // 名字空间中的属性
    export let defaultLength: number;
}