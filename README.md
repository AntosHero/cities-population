# cities-population

A small React/Node.js/Javascript/MUI project for working with cities and population data

## Description

#FE
This project returns cities data table with name, area, population and population density.
The user can use search field for filtering cities by name or use an accordion to add new cities (name, area and population are requited)
The table is sorteable, for sorting click the corresponding header.

#BE
This application supports GET, POST and OPTIONS methods, DELETE is not supported. If you want to change cities data, go to app/api/data and edit cities.json

This application was tested on MacOS and Windows 10 WSL (Ubuntu 18) in Safari and Firefox


#IMPORTANT! It is a test project which was done in a short timespan, not all functionality is flawless, but it gets job done.
Accessibility features might not cover everything. 
Below I will mention the parts of the app which require more work or improvement.

## Getting Started

### Dependencies

Node.js 18.16.1
npm 9.7.2

Node version 17 is not supported because of MUI


### Installing

1. Clone the repository in the folder of your choice, the first option should work without additional configurations:
```
git clone https://github.com/AntosHero/cities-population.git
```
OR
```
git clone git@github.com:AntosHero/cities-population.git
```
2. Install dependencies for backend:
```
cd cities-population/

npm ci
```
3. Install dependencies for frontend:

```
cd app/ui

npm ci
```


### Executing program

1. Open two terminals

2. Let's start with backend, go to the project root.
```
cd cities-population/
node ./app/api/index.js
```

3. For the frontend go to the second terminal:
```
cd cities-population/app/ui
npm start
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)