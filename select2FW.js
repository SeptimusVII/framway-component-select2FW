require('select2/dist/css/select2.min.css');
require('select2');
module.exports = function(app){
    var Select2FW = Object.getPrototypeOf(app).Select2FW = new app.Component("select2FW");
    // Select2FW.debug = true;
    Select2FW.createdAt      = "2.0.0";
    Select2FW.lastUpdate     = "2.0.0";
    Select2FW.version        = "1";
    // Select2FW.factoryExclude = true;
    // Select2FW.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Select2FW.requires       = [];

    
    Select2FW.prototype.onCreate = function(){
        var select2FW = this;
        select2FW.$el.wrap('<div class="select2FW-wrapper"></div>');
        select2FW.classes = select2FW.$el.attr('class');
        select2FW.select2 = select2FW.$el.select2({
            minimumResultsForSearch: parseInt(select2FW.getData('minimumresultsforsearch',5)),
            width: '100%',
            dropdownParent: select2FW.getData('container') == 'body' ? $(document.body) : select2FW.$el.parent(),
            templateSelection: function(data,container) {
                if (data.element) {
                    $(container).addClass($(data.element).attr("class"));
                }
                return data.text;
            },
            templateResult: function (data, container) {
                if (data.element) {
                    $(container).addClass($(data.element).attr("class"));
                }
                return data.text;
            }
        });

        select2FW.$el.closest('.select2FW-wrapper').find('.select2-container').first().addClass(select2FW.classes);

        if(Select2FW.debug) console.log('Select2FW has been created \n ',select2FW);
        return select2FW;
    }

    Select2FW.prototype.onDestroy = function(){
        var select2FW = this;
        select2FW.$el.select2('destroy');
        if(Select2FW.debug) console.log('Select2FW has been destroyed \n ',select2FW);
    }
    
    $(function () {
        $('select').not('.custom').select2FW();
        utils.addHtmlHook('select:not(.custom)', function(item){
            item.select2FW();
        });

        $(document).on('select2:open', () => {
            document.querySelector('.select2-container--open .select2-search__field').focus();
        });

    });

    return Select2FW;
}