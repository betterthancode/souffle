export default function mixin(...mixins) {
  return function (Base = HTMLElement) {
    return mixins.reduce((clazz, mixin) => mixin(clazz, ...arguments), Base);
  }
}