# Instagram Profiles

Se ha generado una vista que muestre una lista de los profiles que hay en instagram de Pull&Bear.

Al iniciar la aplicación se hace una petición GET al siguiente servicio: https://api.socialbakers.com/0/instagram/profiles

Se ha añadido una vista para mostrar el objeto Backbone.Collection en src/modules/instagramProfiles/

El controlador que src/modules/instagramProfiles/index.js, és iniciado por la aplicación y hace la petición a socialbakers.

Se ha implementado esta llamado con Promesas (then, fail, always)

Para hacer la llamada REST, se ha implementado un modulo nuevo que se llama CMS (Content Management System 'src/modules/CMS/').

El CMS esta compuesto de:

* Un index.js de entrada. Serà la entrada principal a todos los metodos del CMS.
* Un config.js donde tendremos configurado entornos, endpoints y credenciales de servidor.
* Un commons.js donde tendremos los metodos genéricos de la aplicación para poder hacer peticiones REST.
* Entities: Es un directorio que se generan archivos JS que se llamarán entidades. Éstas entidades serán las encargadas de hacer las peticiones REST, crear objetos Backbone y gestionar su lógica de negocio.



# Hybreed
Se ha partido del proyecto base Hybreed para generar un vista que muestra los profiles de instagram de Pull&Bear.

Se ha escogido hybreed porque és lo que mas se parece al framework del cliente porque se utiliza Backbone en la vista.

## Requisitos tècnicos

Este framework utiliza las siguientes tecnologías para desarrallor la aplicación
* HTML5 y CSS
* Javascript
* Backbone
* Marionette
* NodeJS

## Instalación

Para instalar las dependencias del proyecto, es necesario ejecutar el siguiente comando:

```
npm install
```


## Estructura de Hybreed


```
Hybreed
 ├── gulp
 │   ├── tasks
 │   └── index.js
 ├── node_modules
 │   └── hybreed-core-modules
 ├── src
 │   ├── common
 │   │   └── ...
 │   ├── fonts
 │   │   └── ...
 │   ├── modules
 │   │   └── ...
 │   ├── vendor
 │   │   └── ...
 │   ├── index.html
 │   ├── main.js
 │   └── main.scss
 ├── test
 │   └── ...
 ├── www
 │   └── ...
 ├── .eslintrc
 ├── config.xml
 ├── package.json
 └── ...
```

### Gulp

A continuación se detallan las tareas principales Gulp.

#### Develop

Tarea para desarrollar la aplicación:

```
gulp develop
```

És la tarea por defecto i se encarga de compilar el proyecto de manera que te lo sirva en un servidor local. También se puede ejecutar de la siguiente manera:

```
gulp
```

#### Producción

Compilarà el proyecto para que se pueda ejecutar en un servidor en producción, minificando y "uglificando" el còdigo.

```
gulp production
```


#### Test

Ejecuta las tareas de Test a través de Karma.

```
gulp test
```

#### Common

Este package contiene el còdigo generico para hacer peticiones REST (GET, POST, PUT, DEL.... )

#### Vendor

Incluye las librerias principales que utilizarà el framework(Backbone, Marionette, Hybreed, etc...)

#### Modules

Un modulo ès una vista o un funcionalidad de la app. 

Una modulo esta formado por los siguientes elementos:

* HTML que contiene la plantilla de la vista.
* SCSS que contiene los estilos de la vista.
* Archivo Javascript que contiene la logica de negocio.

#### Broker

Sirve para comunicarse entre las vistas.

#### Screen

És el modulo bàsico de la aplicación i contiene la plantilla principal en la que se basarán las otras vistas.

#### Tests

Modulo para crear los Test unitarios del proyecto.