---
external: false
author: "Utkarsh Maheshwari"
draft: false
publishDate: "2021-05-29 05:30:00"
title: "To extern or not to extern?"
snippet: "We know that the extern keyword is important for variable declarations in C. But how does it affect a function declaration and when to use it?"
image:
  src: "__GHOST_URL__/content/images/2021/05/c-extern.png"
  alt: "To extern or not to extern?"
tags: ["untagged"]
category: ""
---


While working on a [project](https://github.com/coditva/Jazz) recently, I wanted to use a function declared in another file but not in a header. I wrote the declaration of the function prefixed with `extern` and everything went well. Then I removed the `extern` and it still worked! This got me thinking, **what does `extern` do when added to a function declaration?**

Begin with the basics
=====================

Before using a symbol in C, it must be declared. This is done by a **declaration statement**. The declaration statement can be used to define the symbol as well.

    // function declaration
    void funcA (int, char);
    
    // function declaration + definition
    void funcB (int a)
    {
      return 10 + a;
    }
    
    // variable declaration
    int a;
    
    // variable declaration + definition
    int b = 0;
    

What is a declaration statement?
--------------------------------

The **function declaration** statement specifies the number and types of arguments that the function takes and the type of the return value. It can have a scope modifier `static` which tells the compiler to not "export" this function outside the file i.e. to limit the visibility of the function inside the source file itself. `inline` keyword can be used to signal the compiler to substitute the _call_ of the function with the _code_ inside the function (though the compiler may choose to ignore it and many do).

Function declarations are useful to let the compiler know the signature of the function. It **does not allocate memory** for it because the definition is unknown and allocating memory is neither possible nor needed.

For **variable declarations**, there is a slight difference. A variable declaration is exactly same as a variable definition with a garbage value. This means that declaring a variable would allocate memory for the variable but put nothing in the allocated memory; whatever was already in that memory (garbage value) will still be there.

What is `extern` and when do we use it?
---------------------------------------

Whenever you want to use a symbol you would have to declare it. **But how do you tell the compiler that you're declaring using a symbol defined in another file[\[1\]](#fn1)?** Declaring a variable would allocate memory for it again. Linking[\[2\]](#fn2) at a later stage would also fail due to conflicting names for _different_ global variables.

To do this, we have the keyword `extern` which tells the compiler that the declaration that follows is for a symbol that is _defined elsewhere_. The compiler on seeing this does not allocate any memory for the symbol and keeps a reference to be resolved at the linking stage.

* * *

To `extern` or not to `extern`?
===============================

Since a function declaration does not allocate memory at compile time, we come back to the original question – **What does `extern` do when added to a _function declaration_?** And the answer is... \*\*drumroll\*\*

**Absolutely nothing!**[\[3\]](#fn3)

Turns out that in C, every function declaration contains the `extern` keyword _implicitly_ (unless you add the `static` keyword). So, by default every function declaration means that the function is globally scoped.

**But what if I declare a function as `extern` but define it in the same file?** This is fine too. The compiler does not care. But we write code for developers not the compiler, so don't do this please!

So, why use `extern` for function declarations at all?
------------------------------------------------------

We've already established that `extern` adds no value to the compiler. So let's look at it from the perspective of a developer.

There are two places where declarations are added in a source file. In a **header file** or at the **start of the source file**.

When declaring the function in a header file, I find no value in adding `extern`. A header file almost always only contains declarations for symbols (exception being `inline` functions) and definitions would be in some other source file. Adding `extern` just makes the code harder to read and adds no value to the reader.

But if declaring the function in a header file, it might have some benefits for readability.

If the function is defined in the same file as the declaration, `extern` is not only redundant **but also misleading**. It tells the reader that this function is defined in a different source file while that is not the case.

However, it does add some value in the case **when the function is indeed defined in a different source file**. In this case, it helps by signalling to the reader that the declared function is not in the current source file so don't waste time searching for it in this file!

But using `extern` is a choice of taste rather than correctness. The compiler does not care. You are free to use this convention for your project or not. But whatever you choose, just be consistent. Enforce it using a linter or a static analysis tool.

* * *

1.  **Global scoped** symbols are symbols which are visible outside the file in which they're declared. Any symbol which does not have the `static` modifier in the declaration and is not defined inside a function, is by default globally scoped. [↩︎](#fnref1)
    
2.  **Linking** is the last step of the compilation process. Once all the source file have been individually compiled, they are combined by replacing the external references with the actual addresses where the compiled definitions are present. See the [wikipedia for Linker](https://en.wikipedia.org/wiki/Linker_%28computing%29) for more info. [↩︎](#fnref2)
    
3.  [https://en.cppreference.com/w/c/language/storage\_duration](https://en.cppreference.com/w/c/language/storage_duration) [↩︎](#fnref3)