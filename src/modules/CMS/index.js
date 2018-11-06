// Content Management Service
import Profiles from './entities/Profiles';
import { Broker} from '~/src/vendor/libs';

// API definition
const API = {
    retrieveProfiles:Profiles.retrieveProfiles
}

Broker.channel('cms').reply(API)
export default API
