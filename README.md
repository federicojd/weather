# Weather - Backend

Aplicación de consulta de clima que pueda visualizar el pronóstico actual, próximos 5 días para la ciudad actual y de otras 5 ciudades seleccionables

## Quick Start

```bash
$ npm install
$ npm start
```

## Endpoints

**/v1**

Ruta base

**/location**

Devuelve los datos de ubicación city según ip-api.

**/current[/city]**

Devuelve los datos de ubicación city según ip-api. /current[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual.

**/forecast[/city]**

City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días

## Test

```bash
$ npm install
$ npm test
```
