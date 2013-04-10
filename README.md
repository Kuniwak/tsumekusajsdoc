Tsumekusa Template for Jsdoc3
=============================
[![Build Status](https://travis-ci.org/OrgaChem/tsumekusajsdoc.png?branch=master)](https://travis-ci.org/OrgaChem/tsumekusajsdoc)
[![NPM version](https://badge.fury.io/js/tsumekusajsdoc.png)](http://badge.fury.io/js/tsumekusajsdoc)

This template provides a CUI oriented documentation.

ScreenShot
----------
### on Vim
![Screren shot](https://raw.github.com/OrgaChem/tsumekusajsdoc/readme-contents/images/demo.png)

Using [OrgaChem/tsumekusa-syntax.vim](https://github.com/OrgaChem/tsumekusa-syntax.vim)

How-to
------
### Install

#### Use Zip
Download a [zip](https://github.com/OrgaChem/tsumekusa-jsdoc/archive/master.zip) and extract to your jsdoc templates directory.

#### Use git
```
git clone https://github.com/OrgaChem/tsumekusa-jsdoc your/jsdoc/templates/tsumekusajsdoc
```

#### Use NPM
```
cd your/temporary/derectory
npm install tsumekusajsdoc
mv node_modules/tsumekusajsdoc your/jsdoc/templates
rm node_modules
```

### Run
Use `-t` option. See the [official document](https://github.com/jsdoc3/jsdoc/blob/master/templates/README.md).

```
jsdoc/jsdoc your_script.js -t tsumkusajsdoc
```

License
-------
This script licensed under the MIT.
See: [http://orgachem.mit-license.org](http://orgachem.mit-license.org)