# Conference GO!: A Professional Development Application

This is an application composed of microservices that uses a traditional frontend/backend
architecture providing conference management functionality. To run it locally,
please read the instructions in each project's README files.

- [Frontend README](./frontend/README.md)
- [Conference README](./conference/README.md)

## Domain diagram

![domain diagram](./conference/src/docs/domain_diagram.png)

## Setup instructions

After forking the repo, copy template.env to .env in the auth, conference, and locations folders. Then you can go back to the project root, run `docker compose up` and the whole project should build and start up!
