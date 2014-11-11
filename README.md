# TuTu Recorder

Simple angular js application that can be used to call external http servers and transform requests & responses into TuTu configuration

**Application is still under rapid development**

## Before you start

1) Install npm (nodejs package manager - [install node.js](http://nodejs.org/download/)) dependencies
```
$ npm install
```

2) Install bower dependencies
```
$ node_modules/.bin/bower install
```

3) Install composer (php package manager - [install composer](https://getcomposer.org/download/)) dependencies

```
$ php composer.phar install
```

4) Run grunt

```
$ node_modules/.bin/grunt
```

## How to use

1) Because this application use php and should not be hosted anywhere php build-in web server is perfect choice to
execute it.

```
$ cd app
$ php -S localhost:8000
```

2) Open http://localhost:8000 in your browser.

3) Have fun!

## Security

In order to prevent security issues this application should be never hosted in any public place.
That's why all "deployment" grunt tasks were removed. It should be executed only locally using build-in php server.


