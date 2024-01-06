const KsEval = require('kseval');
const KsNative = KsEval.get('native')?.Cls;
module.exports = class extends KsNative {}