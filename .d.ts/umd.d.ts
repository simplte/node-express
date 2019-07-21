// https://www.jianshu.com/p/9b91aa120550

// 作为核心库的插件，这里要引入核心库本身
import * as m from 'someModule';

// 如果需要的话，也可以引入其他库
import * as other from 'anotherModule';

// 声明一个和核心库同名的module
declare module 'someModule' {

    // 添加插件中t添加的函数，类型
    // 注意，还可以使用unexport删除核心库中已经导出的名字

    // 插件中的函数
    export function theNewMethod(x: m.foo): other.bar;

    // 插件中的类型
    export interface SomeModuleOptions {
        someModuleSetting?: string;
    }

    // 插件中的类型
    export interface MyModulePluginOptions {
        size: number;
    }
}