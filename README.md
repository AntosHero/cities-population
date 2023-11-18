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

If for some reason you get ENOENT error when running app, check if you running the nodejs server from the root

## Authors

Contributors names and contact info

Hanna Sivazhalezava 
sivazhalezava@gmail.com

## Version History

* 1.0.0
    * Initial Release

## License

This project is unlicensed

## Needed improvements in future:
1. Add proper testing (I have jest downloaded, but the tests cases are not written)
2. More beautiful and intuitive UI
3. Accessibility updates (not just area label and contrast colors)
4. Addition of proper BE logging
5. For actuall application it is better to use database, not just json/csv file. I'd say MongoDB will work well here
6. If we use the database, we can safely calculate the density and insert the value in the db, not just calculate during runtime
7. Better safety for the BE
8. Better error messages for BE
9. On FE add more modularity to the components
10. useMemo instead or useEffect might be better
11. Both FE and BE could benefit from Typescript, but it would be slower to develop.