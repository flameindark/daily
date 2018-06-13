"use strict";

const marked = require("marked");
const loaderUtils = require("loader-utils"); //用来获取webpack的配置

module.exports = function (markdown) {
    console.log(typeof markdown); //String

    const options = loaderUtils.getOptions(this); // 获取loader的option配置

    this.cacheable();

    marked.setOptions(options); // 将配置的options传给marked

    return marked(markdown); // 返回另外一个String
};