#### JavaScript引擎
1. JavaScript引擎将我们编写的代码转换为机器可读语言
2. 日常可能会用到的JavaScript引擎
   1. Chakra, Microsoft IE/Edge
   2. SpiderMonkey, FireFox
   3. V8, Chrome
3. JavaScript引擎的内里
   1. V8是最受欢迎的JavaScript引擎之一，也是Chrom和NodeJS使用的引擎。用C++编写。
   2. 确立引擎规范：ECMA标准
   3. V8引擎内部流程
      1. Parser
      2. AST
      3. Interpreter生成ByteCode
      4. profiler
      5. Compiler生成优化后的代码
    ![alt JS Engine内部工作流程图](https://github.com/EarlyBirdss/FrontEnd-Notes/blob/feature-general/images/2019.10.17.webp)
4. Interpreter对比Compilter
   1. Interpreter 逐行读取代码并立即执行
   2. Compiler读取全部代码，优化后再生成优化后的代码
   3. Babel实际上是一个JS Compiler，接受开发者编写的新版本js代码，并向下兼容生成浏览器可直接运行的旧版本js代码
   4. Interpreter立即执行，但不优化；Compiler花费更多时间编译，但优化了原代码。
5. V8引擎使用了JIT(Just In Time) Compiler，该编译器是是interpreter和compiler的结合，更快更高效，流程如下：
   1. Parser通过各种JavaScript关键字来识别，分析和分类程序各个部分的解析器。可以区分代码是一个方法还是一个变量。
   2. AST（抽象语法树）基于Parser的分类构造树状结构。
   3. 将AST提供给Interpreter生成ByteCode。ByteCode不是最底层代码，但可以被执行。在次阶段，浏览器借助V8引擎执行ByteCode进行工作。
   4. 同时，Profiler也会查看可以被优化的代码，然后将他们传递给compiler。compiler生成优化代码的同时，浏览器暂时用ByteCode执行操作。并且，一旦Compiler生成了优化代码，优化代码将完全替换掉临时的ByteCode
6. ByteCode
   1. 中间代码，不是底层代码，不能被所有计算器理解及执行，但可以借助虚拟机或V8引擎执行。
7. JavaScript是一门解释型语言吗？
   1. 不完成是。 
   2. 最早spiderMonkey引擎只有Interpreter来告诉浏览器该怎么执行代码，现在的引擎同时具备Interpreter和Compiler。我们的代码不仅可以被转换为ByteCode，还可以被编译输出优化后的代码。因此，这完全取决于引擎。
   

![alt 如何code review 思维导图](https://github.com/EarlyBirdss/FrontEnd-Notes/blob/feature-general/images/JS_engine.png)

#### 原文地址
[前端早读课第1740期](https://mp.weixin.qq.com/s/qynv4v8nXPSU1XwyjEa62A)

#### 补充
1. webp: Google推出的webp图片格式，支持有损和无损压缩，具备alpha透明以及动画的特性。相同的图片，webp格式均比PNG、JPG格式的图片节约不少体积。
2. 补充：JS Engine内部工作流程图的文件类型为.webp