# Tsumekusa Template for Jsdoc3

[![Build Status](https://travis-ci.org/OrgaChem/tsumekusajsdoc.png?branch=master)](https://travis-ci.org/OrgaChem/tsumekusajsdoc)
[![NPM version](https://badge.fury.io/js/tsumekusajsdoc.png)](http://badge.fury.io/js/tsumekusajsdoc)

This [Jsdoc3](https://github.com/jsdoc3/jsdoc) template provides a CUI oriented documentation by [Tsumekusa](https://github.com/OrgaChem/tsumekusa).

![Screren shot on Vim](https://raw.github.com/OrgaChem/tsumekusajsdoc/readme-contents/images/demo.png)


## Requirements

- [jsdoc3](https://github.com/jsdoc3/jsdoc)
- [node.js](http://nodejs.org)
- [npm](https://npmjs.org/)

## How to use

### Install

Theere are 3 ways to install.

#### Use Zip
Download a [zip](https://github.com/OrgaChem/tsumekusa-jsdoc/archive/master.zip) and extract to your jsdoc templates directory.

```
cd your/jsdoc/templates/tsumekusajsdoc
npm update
```

#### Use git
```
git clone https://github.com/OrgaChem/tsumekusa-jsdoc your/jsdoc/templates/tsumekusajsdoc
cd your/jsdoc/templates/tsumekusajsdoc
npm update
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

#### Query (template options)
Jsdoc3 can get queries by ```-q <value>``` or ```--query <value>```.

> 	A query string to parse and store in env.opts.query. Example: foo=bar&baz=true

##### Put a logo at the top
Use ```logo``` query to display an ascii art as your product logo.
The query value must be URI encoded by ```encodeURIComponent```.

For example:

```
jsdoc/jsdoc your_script.js -t tsumekusajsdoc -q "logo=%20%20%20%20______%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20__%0A%20%20%20%2F_%20%20__%2F______%20%20______%20___%20%20___%20%20%2F%20%2F____%20%20___________%20_%0A%20%20%20%20%2F%20%2F%20%2F%20___%2F%20%2F%20%2F%20%2F%20__%20%60__%20%5C%2F%20_%20%5C%2F%20%2F%2F_%2F%20%2F%20%2F%20%2F%20___%2F%20__%20%60%2F%0A%20%20%20%2F%20%2F%20(__%20%20)%20%2F_%2F%20%2F%20%2F%20%2F%20%2F%20%2F%20%2F%20%20__%2F%20%2C%3C%20%2F%20%2F_%2F%20(__%20%20)%20%2F_%2F%20%2F%0A%20%20%2F_%2F%20%2F____%2F%5C__%2C_%2F_%2F%20%2F_%2F%20%2F_%2F%5C___%2F_%2F%7C_%7C%5C__%2C_%2F____%2F%5C__%2C_%2F"
```
It becomes:

```
Class: YourClass
>>>
    ______                          __
   /_  __/______  ______ ___  ___  / /____  ___________ _
    / / / ___/ / / / __ `__ \/ _ \/ //_/ / / / ___/ __ `/
   / / (__  ) /_/ / / / / / /  __/ ,< / /_/ (__  ) /_/ /
  /_/ /____/\__,_/_/ /_/ /_/\___/_/|_|\__,_/____/\__,_/
>>>

CONTENTS
  1. Constructor
```

## Sample
Output sample was not highlighted. It can syntax highlight on Vim by [tsumekusa-syntax.vim](https://github.com/OrgaChem/tsumekusa-syntax.vim).

```
Class: SampleSuperClass
>>>
    ______                          __
   /_  __/______  ______ ___  ___  / /____  ___________ _
    / / / ___/ / / / __ `__ \/ _ \/ //_/ / / / ___/ __ `/
   / / (__  ) /_/ / / / / / /  __/ ,< / /_/ (__  ) /_/ /
  /_/ /____/\__,_/_/ /_/ /_/\___/_/|_|\__,_/____/\__,_/
>>>

CONTENTS
  1. Constructor
  2. Instance Methods
  3. Instance Properties

1. Constructor
  Inheritance:
  * #SampleSuperClass# [class]

  `SampleSuperClass`()
    Sample super class.

2. Instance Methods
  `SampleSuperClass#instanceMethod1`()
    Sample instance method has no params and no returns.

  `SampleSuperClass#instanceMethod2`(`param1`)
    Sample instance method has 1 param and no returns.

    Parameters:
      `param1`: `string`
        Parameter 1.

  `SampleSuperClass#instanceMethod3`(`param1`, `param2`)
    Sample instance method has 2 params and no returns.

    Parameters:
      `param1`: `string`
        Parameter 1.

      `param2`: `number`
        Parameter 2.

  `SampleSuperClass#instanceMethod4`() -> `string`|`null`
    Sample instance method has no params and 1 return.

    Returns:
      `string`|`null`
        Return.

3. Instance Properties
  `SampleSuperClass#instanceProp1`: `string`
    Sample instance property.

  `SampleSuperClass#instanceProp2_`: `string`
    Sample instance private property.

    Visibility
      #private#

  `SampleSuperClass#instanceProp3`: `string`
    Sample instance protected property.

    Visibility
      #protected#

  `SampleSuperClass#instanceProp4`: `string`
    Sample instance deprecated property.

    Deprecated
      #It was deprecated.#

  `SampleSuperClass#INSTANCE_PROP_5`: `string`
    Sample instance constant property.
```

## License
This script licensed under the MIT.
See: [http://orgachem.mit-license.org](http://orgachem.mit-license.org)
