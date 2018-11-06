import _ from  'underscore';
import $ from 'jquery';
import BackboneBasicauth from 'backbone.basicauth';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Broker from 'backbone.radio';
import Hybreed from 'mhyc';
import Snap from 'snapjs';
import ionRangeslider from 'ion-rangeslider';

window.$ = window.jQuery = global.jQuery = $;
window._ = _;
window.Backbone = Backbone
window.BackboneBasicauth = BackboneBasicauth

export {
    _,
    Backbone,
    Marionette,
    Broker,
    Hybreed,
    Snap,
    ionRangeslider
};
