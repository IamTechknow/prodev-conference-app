# Locations microservice

## Refactoring notes

The locations microservice is refactored to be uncoupled from the conference microservice,
thus it depends only on its datastore service. Here are some changes that resulted from
the refactor:

* A new endpoint is added to be able to query for a single location based on its ID.
  It is used by the conference events endpoint.
* Code to identify an email address is replaced by an API call to the auth service's
  identify endpoint.
* Process handler is added to be able to respond to Ctrl-C for the server process to exit
