/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;
var FILLER_NAME = 'n.n';

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}

if(!Number.prototype.cutOff) {
	//using this because Number.toFixed() rounds
	Number.prototype.cutOff = function (precision) {
    var multiplier = Math.pow( 10, precision + 1 );
    //fix floating point precision
    var wholeNumber = Math.round( this * multiplier );
    return Math.floor( wholeNumber / 10 ) * 10 / multiplier;
	}
}

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console);


$(function () {
	'use strict';

	// kick things off by creating the `App`
	new app.AppView();
});
