/**
 *   fis.baidu.com
 */
var fs = require('fs');
var crox = require('crox.mod');
var helper = require('crox.mod/bin/helper');
var precompiler = require('crox.mod/lib/precompile-node').precompile;
var jsBeautify = require('js-beautify').js_beautify;

function doJsBeautify(str) {
    var opts = {
        "indent_size": 4,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false
    };
    return jsBeautify(str, opts);
}

var compilers = {
    vm: crox.compileToVM,
    php: crox.compileToPhp,
    js: function(tpl) {return crox.compile(tpl, getOptions()).toString()},
    cmd: function(tpl) {return helper.compileToCMD(tpl, getOptions())},
    amd: function(tpl) {return helper.compileToAMD(tpl, getOptions())},
    commonjs: function(tpl) {return helper.compileToCommonJS(tpl, getOptions())}
};

compilers.commonjs = compilers.commonjs;
compilers.seajs = compilers.cmd;
compilers.requirejs = compilers.amd;
compilers.vm2 = compilers.vm;

function getOptions() {
    return {
        htmlEncode: outHtmlEncode,
        modulePrefix:outModulePrefix || ''
    }
}

var outHtmlEncode = '';
var outModulePrefix = '';

module.exports = function (content, file, opts) {
    var opts = opts || {};
    var target = (opts.out || 'commonjs').trim();
    var htmlEncode = outHtmlEncode = opts.htmlEncode || '';
    var modulePrefix = outModulePrefix = opts.modulePrefix || '';
    var flatten = !!opts.flatten;

    var filepath = file.realpath;
    var compiler = compilers[target];
    var isJs = target != 'vm' && target != 'vm2' && target != 'php';
    var compiled;

    if (isJs && target != 'js') {
        if (opts.flatten) {
            fs.writeFileSync(filepath, precompiler(file.realpath));
            compiled = compiler(filepath);
            fs.writeFileSync(filepath, content);
        } else {
            compiled = compiler(filepath);
        }
    } else {
        if (opts.flatten) {
            content = precompiler(filepath);
        }
        compiled = compiler(content);
    }
    if (isJs) {
        compiled = doJsBeautify(compiled);
    }
    if (target == 'vm2') {
        compiled = compiled.replace(/#\{end\}/g, '#end');
    }


    return compiled;
};
