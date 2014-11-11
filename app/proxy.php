<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpKernel\Controller\ControllerResolver;
use Symfony\Component\HttpKernel\EventListener\RouterListener;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Coduo\TuTu\Recorder\Controller\Proxy;

if (is_dir($vendor = __DIR__ . '/../vendor')) {
    require($vendor . '/autoload.php');
} else {
    die(
        'You must set up the project dependencies, run the following commands:' . PHP_EOL .
        'curl -s http://getcomposer.org/installer | php' . PHP_EOL .
        'php composer.phar install' . PHP_EOL
    );
}

$client = new Guzzle\Http\Client('', [
    'ssl.certificate_authority' => false,
    'request.options' => [
        'timeout'         => 10,
        'connect_timeout' => 10
    ]
]);
$proxy = new Proxy($client);

$routes = new RouteCollection();
$routes->add('proxy', new Route('/', array(
        '_controller' => $proxy
    )
));

$request = Request::createFromGlobals();

$matcher = new UrlMatcher($routes, new RequestContext());

$dispatcher = new EventDispatcher();
$dispatcher->addSubscriber(new RouterListener($matcher));

$resolver = new ControllerResolver();
$kernel = new HttpKernel($dispatcher, $resolver);

$response = $kernel->handle($request);
$response->send();

$kernel->terminate($request, $response);
