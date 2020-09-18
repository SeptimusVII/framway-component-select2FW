module.exports = function(app){
    var Select2FW = Object.getPrototypeOf(app).Select2FW = new app.Component("select2FW");
    //Select2FW.debug = true;
    Select2FW.createdAt      = "2.0.0";
    Select2FW.lastUpdate     = "2.0.0";
    Select2FW.version        = "1";
    // Select2FW.factoryExclude = true;
    // Select2FW.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Select2FW.requires       = [];

    // Select2FW.prototype.onCreate = function(){
    // do thing after element's creation
    // }
    return Select2FW;
}