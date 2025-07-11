import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import px2viewport from "postcss-px-to-viewport-8-plugin";

export default {
  plugins: [
    tailwindcss(),
    px2viewport({
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度，可选
      unitPrecision: 3, // 转换后的精度，即小数点位数
      viewportUnit: "vw", // 指定需要转换成的视口单位
      selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视口单位的类
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }),
    autoprefixer(),
  ],
};
