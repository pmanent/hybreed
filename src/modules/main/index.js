import {Broker} from '~/src/vendor/libs';

function start() {
    Broker.channel('instagramProfiles').trigger('start');
}

//
// API
//

Broker.channel('main').on({
    start
});

export default {
    start
};
