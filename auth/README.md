# Auth microservice

## Refactoring notes

The auth microservice is refactored to be uncoupled from other microservices,
thus it depends only on its datastore service. Here are some changes that resulted from
the refactor:

* A new endpoint is added for identification of an email address. It is used in the
  other microservices.
* Corrected status code for the login endpoint from 404 to 401.
