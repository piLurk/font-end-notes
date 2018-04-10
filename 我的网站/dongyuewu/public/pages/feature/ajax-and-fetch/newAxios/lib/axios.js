'use strict';

/**
 * Create an instance of Axios
 * 
 * @param {Ojbect} defaultConfig The default config for the instance 
 * @return {Axios} A new instance of Axios
 * 
 * 
 */

 function createInstance(defaultConfig) {
   var context = new Object(defaultConfig)
   var instance = bind(Axios.prototype.request, context)

   
 }