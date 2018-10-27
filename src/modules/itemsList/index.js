import ItemsListView from './views/itemsList'
import {Backbone, Broker} from '~/src/vendor/libs';

var itemsListView;

function start() {
    showExampleView();
}

function showExampleView() {

    itemsListView = new ItemsListView({
        collection: new Backbone.Collection(
            [{name: 'Item4'}, {name: 'Item5'}, {name: 'Item6'}]
        )
    });

    itemsListView.on({

        'childview:itemPressed': (view) => {
            Broker.channel('example').trigger('start', view.model);
        }
    });

    Broker.channel('screen').trigger('start', {
        type: 'snap',
        title: 'Items List',
        contentView: itemsListView,
        menuView: Broker.channel('menu').request('getView')
    });
}

//
// API
//

Broker.channel('itemsList').on({
    start
});

export default {
    start
};
