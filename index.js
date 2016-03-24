/**
 *   fis.baidu.com
 */

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
    kissy: function(tpl) {return helper.compileToKissy(tpl, getOptions())},
    kissyfn: function(tpl) {return helper.compileToKissyFn(tpl, getOptions())},
    cmd: function(tpl) {return helper.compileToCMD(tpl, getOptions())},
    amd: function(tpl) {return helper.compileToAMD(tpl, getOptions())},
    nodejs: function(tpl) {return helper.compileToCommonJS(tpl, getOptions())}
  };

  compilers.commonjs = compilers.nodejs;
  compilers.seajs = compilers.cmd;
  compilers.requirejs = compilers.amd;
  compilers.vm2 = compilers.vm;

  function getOptions() {
    return {
      htmlEncode: outHtmlEncode,
      modulePrefix: outModulePrefix
    }
  }

  var outHtmlEncode = '',
    outModulePrefix = '';

  // grunt.registerMultiTask('crox', 'compile crox templates.', function() {

    // var options = this.options({
      // target: grunt.option('target') || 'js',
      // modulePrefix: grunt.option('modulePrefix') || '',
      // htmlEncode: grunt.option('htmlEncode') || '',
      // flatten: grunt.option('flatten') || false
    // });

    // var target = options.target;
    // var targets;
    // if (target.indexOf(',') != -1) {
      // targets = target.split(',');
    // } else {
      // targets = [target];
    // }
    // outHtmlEncode = options.htmlEncode;
    // outModulePrefix = options.modulePrefix;

    // this.filesSrc.forEach(function(f) {
      // var content = grunt.file.read(f);
      // targets.forEach(function(target) {
        // target = target.trim();
        // var compiler = compilers[target];
        // var isJs = target != 'vm' && target != 'vm2' && target != 'php';
        // var compiled;

        // if (isJs && target != 'js') {
          // if (options.flatten) {
            // // precompiler的参数是file，为了确保模块分析是在正常位置，所以只能写原文件了
            // grunt.file.write(f, precompiler(f));
            // // compiler的参数也是file
            // compiled = compiler(f);
            // // 源文件的内容已经在precompiler之后被修改了，还需要再改回去
            // grunt.file.write(f, content);
          // } else {
            // compiled = compiler(f);
          // }
        // } else {
          // if (options.flatten) {
            // // 调用crox的precompiler读取文件替换之
            // content = precompiler(f);
          // }
          // compiled = compiler(content);
        // }
        // if (isJs) {
          // compiled = doJsBeautify(compiled);
        // }
        // if (target == 'vm2') {
          // compiled = compiled.replace(/#\{end\}/g, '#end');
        // }
        // var targetFile = isJs ? (f + '.js') : f.replace(/\.[\w\d]+$/, '.' + (target == 'vm2' ? 'vm' : target));
        // grunt.log.writeln();
        // grunt.log.ok('[Crox Compiling]', f, '-->', targetFile);
        // grunt.file.write(targetFile, compiled);
      // })
    // });
  // });

// };


module.exports = function (content, file, opts) {
    consoel.log('===================content=======================');
    console.log(content);
    console.log('===================file=======================');
    console.log(file);
    console.log('===================opts=========================');
    console.log(opts);
    return content;
};
