<?php

namespace Coduo\TuTu\Recorder\Controller;

use Guzzle\Http\Client;
use Guzzle\Http\Exception\BadResponseException;
use Guzzle\Http\Message\Header\HeaderCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Proxy
{
    private $optionsResolver;
    /**
     * @var Client
     */
    private $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->optionsResolver = new OptionsResolver();
        $this->optionsResolver->setRequired([
            'url',
            'method'
        ]);

        $this->optionsResolver->setOptional([
            'body',
            'headers',
            'parameters'
        ]);

        $this->optionsResolver->setAllowedTypes([
            'url' => 'string',
            'method' => 'string',
            'headers' => 'array',
            'parameters' => 'array',
            'body' => 'string'
        ]);

        $this->optionsResolver->setNormalizers([
            'headers' => $this->createNormalizeArrayFunction(),
            'parameters' => $this->createNormalizeArrayFunction(),
        ]);
    }

    public function __invoke(Request $request)
    {
        try {
            $this->validateRequest($request);
            $requestData = $this->optionsResolver->resolve(json_decode($request->getContent(), true));

            $options = ($requestData['method'] == 'GET')
                ? ['query' => $requestData['parameters']]
                : ['params' => $requestData['parameters']];

            $response = $this->client->createRequest(
                $requestData['method'],
                $requestData['url'],
                $requestData['headers'],
                empty($requestData['body']) ? null : $requestData['body'],
                $options
            )->send();
        } catch (BadResponseException $e) { // All 5xx, 4xx responses;
            return new JsonResponse([
                'status' => $e->getResponse()->getStatusCode(),
                'headers' => $this->normalizeResponseHeaders($e->getResponse()->getHeaders()),
                'body' => $e->getResponse()->getBody(true)
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
            ], 400);
        }

        return new JsonResponse([
            'status' => $response->getStatusCode(),
            'headers' => $this->normalizeResponseHeaders($response->getHeaders()),
            'body' => $response->getBody(true)
        ]);
    }

    private function validateRequest(Request $request)
    {
        $json = $request->getContent();
        @json_decode($json, true);

        if ((json_last_error() !== JSON_ERROR_NONE)) {
            throw new \RuntimeException("Request content must be a valid json");
        }
    }

    private function createNormalizeArrayFunction()
    {
        return function (Options $options, $value) {
            $array = [];
            foreach ($value as $element) {
                $array[$element['key']] = $element['value'];
            }

            return $array;
        };
    }

    private function normalizeResponseHeaders(HeaderCollection $headers)
    {
        $jsonHeaders = [];
        foreach ($headers->toArray() as $key => $value) {
            $jsonHeaders[] = ['key' => $key, 'value' => implode(', ', $value)];
        }

        return $jsonHeaders;
    }
}
