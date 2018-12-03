'use strict';
require('dotenv').config()
var mysql = require('mysql');
var pool = mysql.createPool({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_DATABASE
});

var util = require('util');
const database_query = 'SELECT DISTINCT fullDeviceInformation.deviceName, fullDeviceInformation.canonicalName, fullDeviceInformation.density, fullDeviceInformation.densityName, fullDeviceInformation.screenSize, portrait.devicePixelHeight AS portraitdevicePixelHeight, portrait.devicePixelWidth AS portraitdevicePixelWidth, portrait.contentViewPixelHeight AS portraitcontentViewPixelHeight, portrait.contentViewPixelWidth AS portraitcontentViewPixelWidth, portrait.navBarHeight AS portraitnavBarHeight, portrait.navBarWidth AS portraitnavBarWidth, portrait.statusBarHeight AS portraitstatusBarHeight, portrait.titleBarHeight AS portraittitleBarHeight, landscape.devicePixelHeight AS landscapedevicePixelHeight, landscape.devicePixelWidth AS landscapedevicePixelWidth, landscape.contentViewPixelHeight AS landscapecontentViewPixelHeight, landscape.contentViewPixelWidth AS landscapecontentViewPixelWidth, landscape.navBarHeight AS landscapenavBarHeight, landscape.navBarWidth AS landscapenavBarWidth, landscape.statusBarHeight AS landscapestatusBarHeight, landscape.titleBarHeight AS landscapetitleBarHeight FROM fullDeviceInformation, (SELECT * FROM screenDetails WHERE isPortrait = 1) as portrait, (SELECT * FROM screenDetails WHERE isPortrait = 0) as landscape WHERE portrait.deviceInformationId = landscape.deviceInformationId AND portrait.deviceInformationId = fullDeviceInformation.deviceInformationId ORDER BY fullDeviceInformation.deviceName;';
const database_view = 'SELECT * FROM webQueryFullDeviceInformation;';

module.exports = {
  get_screen_sizes: get_screen_sizes
};

function get_screen_sizes(req, res) {
  
  pool.query(database_query, function (error, results, fields) {
    if (error) {
      console.error(error);
      throw error;
    }

    var queryResults = [];
    for (var index = 0; results && index < results.length; index++ ){
      var result = results[index];
      var resultObject = {
        deviceName: result.deviceName,
        canonicalName: result.canonicalName,
        density: result.density,
        densityName: result.densityName,
        screenSize: result.screenSize,
        portraitdevicePixelHeight: result.portraitdevicePixelHeight,
        portraitdevicePixelWidth: result.portraitdevicePixelWidth,
        portraitcontentViewPixelHeight: result.portraitcontentViewPixelHeight,
        portraitcontentViewPixelWidth: result.portraitcontentViewPixelWidth,
        portraitnavBarHeight: result.portraitnavBarHeight,
        portraitnavBarWidth: result.portraitnavBarWidth,
        portraitstatusBarHeight: result.portraitstatusBarHeight,
        portraittitleBarHeight: result.portraittitleBarHeight,
        landscapedevicePixelHeight: result.landscapedevicePixelHeight,
        landscapedevicePixelWidth: result.landscapedevicePixelWidth,
        landscapecontentViewPixelHeight: result.landscapecontentViewPixelHeight,
        landscapecontentViewPixelWidth: result.landscapecontentViewPixelWidth,
        landscapenavBarHeight: result.landscapenavBarHeight,
        landscapenavBarWidth: result.landscapenavBarWidth,
        landscapestatusBarHeight: result.landscapestatusBarHeight,
        landscapetitleBarHeight: result.landscapetitleBarHeight 
      }

      queryResults[index] = resultObject;
    }


    res.json(queryResults);
  });
}
