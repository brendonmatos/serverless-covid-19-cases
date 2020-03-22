# COVID 19 Cases Tracking

## POST /cases
Cria um registro utilizando Get
#### Request Body / JSON:
- latitude: latitude
- longitude: longitude
- status: Status do caso

## GET /cases/new
Cria um registro utilizando Get
#### Query params:
- latitude: latitude
- longitude: longitude
- status: Status do caso

## GET /cases
Busca os casos baseando-se em latitude, longitude e raio passados por get
#### Query params:
- latitude: latitude
- longitude: longitude
- radius: Raio de busca em metros
