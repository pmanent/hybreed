import {Broker} from '~/src/vendor/libs';

function start() {
    if(Broker.channel('login').request('getUserLogged')) {
        Broker.channel('instagramProfiles').trigger('start');
    } else {
        Broker.channel('login').trigger('start');
    }
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
