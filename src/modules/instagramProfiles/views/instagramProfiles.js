import {_, Marionette} from '~/src/vendor/libs';
import ItemTemplate from './instagramProfile.html';
import ItemsListTemplate from './instagramProfiles.html';

var ChildView = Marionette.View.extend({

    template: _.template(ItemTemplate),

    tagName: 'li',

    triggers: {
        click: 'itemPressed'
    }
});

export default Marionette.CollectionView.extend({

    template: _.template(ItemsListTemplate),

    tagName: 'ul',

    className: 'items-list',

    childView: ChildView
});
