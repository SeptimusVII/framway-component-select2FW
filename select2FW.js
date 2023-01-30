require('select2/dist/css/select2.min.css');
require('select2/dist/js/select2.full.min.js');
module.exports = function(app){
    var Select2FW = Object.getPrototypeOf(app).Select2FW = new app.Component("select2FW");
    // Select2FW.debug = true;
    Select2FW.createdAt      = "2.0.0";
    Select2FW.lastUpdate     = "2.0.0";
    Select2FW.version        = "1.1.1";
    // Select2FW.factoryExclude = true;
    // Select2FW.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Select2FW.requires       = [];

    
    Select2FW.prototype.onCreate = function(){
        var select2FW = this;
        select2FW.classes           = select2FW.$el.attr('class');
        select2FW.style             = select2FW.$el.attr('style');
        select2FW.classWrapper      = (select2FW.classWrapper !== undefined) ? select2FW.classWrapper : select2FW.getData('classwrapper', '');
        select2FW.withinModal       = select2FW.$el.closest('.modalFW').length ? true : false;
        select2FW.classDropdown     = (select2FW.classDropdown !== undefined) ? select2FW.classDropdown : select2FW.getData('classdropdown', '');
        select2FW.$el.wrap('<div class="select2FW-wrapper '+select2FW.classWrapper+'"></div>');
        select2FW.templateSelection = typeof window[select2FW.getData('templateselection')] == 'function' ? window[select2FW.getData('templateselection')] : function(data,container) {
            if ($(container).get(0) && !select2FW.$el.get(0).hasAttribute('multiple'))
                $(container).get(0).className = "select2-selection__rendered";
            if (data.element) {
                $(container).addClass($(data.element).attr("class"));
            }
            return data.text;
        };
        select2FW.templateResult    = typeof window[select2FW.getData('templateresult')] == 'function' ? window[select2FW.getData('templateresult')] : function (data, container) {
            if (data.element) {
                $(container).addClass($(data.element).attr("class"));
            }
            return data.text;
        };

        if (select2FW.withinModal)
            select2FW.classDropdown += ' withinModal';
        else if(select2FW.getData('container') == 'body')
            select2FW.classDropdown += ' bodyLevel';


        select2FW.select2 = select2FW.$el.select2({
            minimumResultsForSearch: parseInt(select2FW.getData('minimumresultsforsearch',5)),
            width: '100%',
            dropdownParent: select2FW.getData('container') == 'body' ? $(document.body) : select2FW.$el.parent(),
            templateSelection: select2FW.templateSelection,
            templateResult: select2FW.templateResult,
            dropdownCssClass: select2FW.classDropdown,
        });

        select2FW.$el.closest('.select2FW-wrapper').find('.select2-container').first().addClass(select2FW.classes).attr('style',select2FW.style);
        if(Select2FW.debug) console.log('Select2FW has been created \n ',select2FW);
        return select2FW;
    }



    Select2FW.prototype.reset = function(){
        var select2FW = this;
        select2FW.$el.unwrap('.select2FW-wrapper');
        select2FW.$el.select2('destroy');
        if(Select2FW.debug) console.log('Select2FW has been reseted \n ',select2FW);
    }
    Select2FW.prototype.destroy = function(){
        this.$el.closest('.select2FW-wrapper').remove();
    }
    Select2FW.prototype.onDestroy = function(){
        var select2FW = this;
        select2FW.$el.select2('destroy');
        if(Select2FW.debug) console.log('Select2FW has been destroyed \n ',select2FW);
    }
    
    $(function () {
        $('select').not('.custom').select2FW();
        utils.addHtmlHook('select:not(.custom)', function(item){
            if (item.closest('.select2FW-wrapper').length == 0) 
                item.select2FW();
        });

        $(document).on('select2:open', () => {
            document.querySelector('.select2-container--open .select2-search__field').focus();
            var dropdown = $('.select2-dropdown .select2-results');
            setTimeout(function(){
                dropdown.attr('style','');
                if ((dropdown.offset().left + dropdown.outerWidth()).toFixed(2) > viewport.width) {
                    dropdown.css('max-width',(viewport.width-15) - dropdown.offset().left);
                }
            })
        });

    });

    return Select2FW;
}