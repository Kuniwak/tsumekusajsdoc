// This script licensed under the MIT.
// http://orgachem.mit-license.org

var LOREM_IPSUM = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];

var WordWrapper = require('./WordWrapper');

exports.testWrap = function(test) {
  var wrapper = new WordWrapper();
  var wrapped;

  // General condition
  wrapped = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor\nincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\nnostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\nfugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\nculpa qui officia deserunt mollit anim id est laborum.';
 
  test.equal(wrapper.wrap(LOREM_IPSUM, 80), wrapped);

  // Hard condition
  wrapped = 'Lorem\nipsum\ndolor\nsit\namet,\ncons-\necte-\ntur\nadip-\nisic-\ning\nelit,\nsed\ndo e-\niusm-\nod t-\nempor\ninci-\ndidu-\nnt ut\nlabo-\nre et\ndolo-\nre\nmagna\naliq-\nua.\nUt\nenim\nad\nminim\nveni-\nam,\nquis\nnost-\nrud\nexer-\ncita-\ntion\nulla-\nmco\nlabo-\nris\nnisi\nut a-\nliqu-\nip ex\nea c-\nommo-\ndo c-\nonse-\nquat.\nDuis\naute\nirure\ndolor\nin r-\nepre-\nhend-\nerit\nin v-\nolup-\ntate\nvelit\nesse\ncill-\num d-\nolore\neu f-\nugiat\nnulla\npari-\natur.\nExce-\npteur\nsint\nocca-\necat\ncupi-\ndatat\nnon\nproi-\ndent,\nsunt\nin\nculpa\nqui\noffi-\ncia\ndese-\nrunt\nmoll-\nit\nanim\nid\nest\nlabo-\nrum.';

  test.equal(wrapper.wrap(LOREM_IPSUM, 5), wrapped);

  var indent = new WordWrapper.Indent();
  indent.getIndentWidth = function(lineIdx) {
    return lineIdx;
  };

  // Indent test.
  wrapped = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n sed do eiusmod tempor incididunt ut labore et dolore magna\n  aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n   ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate\n     velit esse cillum dolore eu fugiat nulla pariatur.\n      Excepteur sint occaecat cupidatat non proident, sunt\n       in culpa qui officia deserunt mollit anim id est\n        laborum.';

  test.equal(wrapper.wrap(LOREM_IPSUM, 60, indent), wrapped);
  test.done();
};
