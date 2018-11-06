import InstagramProfilesView from './views/instagramProfiles'
import { Broker, Hybreed} from '~/src/vendor/libs';

var instagramProfilesView;

function start() {
    showProfiles();
}

function showProfiles() {

    Hybreed.UI.showSpinner();
    Broker.channel('cms').request('retrieveProfiles')
    .then((profilesColelction)=>{
        instagramProfilesView = new InstagramProfilesView({
            collection: profilesColelction
        });

        instagramProfilesView.on({

            'childview:itemPressed': (view) => {
                //Broker.channel('example').trigger('start', view.model);
                alert('Collection element Clicked',view)
            }
        });

        Broker.channel('screen').trigger('start', {
            type: 'snap',
            title: 'Instagram Profiles',
            contentView: instagramProfilesView,
            menuView: Broker.channel('menu').request('getView')
        });

    })
    .fail((error)=>{
        //TODO catch error
        console.log(error);
    })
    .always(()=>{
        Hybreed.UI.hideSpinner();
    });


}

//
// API
//

Broker.channel('instagramProfiles').on({
    start
});

export default {
    start
};
