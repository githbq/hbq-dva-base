 
const path = require('path');   
const autoprefixer = require('autoprefixer');

//使用postcss作为默认的CSS编译器
exports.postCSSConfig = [
  autoprefixer({
    browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  }),
  require('postcss-flexibility')
];

