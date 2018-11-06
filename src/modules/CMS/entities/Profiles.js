// Content Management Service
import Common from '../common'
import {Broker} from '~/src/vendor/libs';

function retrieveProfiles(paramsObj){
  const deferred = $.Deferred()

  if(!paramsObj) paramsObj = {}
  const tryLocalCache = (_.isUndefined(paramsObj.tryLocalCache)) ? false : paramsObj.tryLocalCache
  const parse = (a) => a.profiles

  const urlProd = '/0/instagram/profiles'


  const commonParams = {
    tryLocalCache,
    parse,
    localCacheName: 'profiles',
    url: urlProd
  }
  Common.getCommon(commonParams)
  .then((profiles) => {
    console.log('profiles:', profiles);
    deferred.resolve(profiles)

  })
  .fail((error) => {
      console.log('profiles error:', error);
      deferred.reject(error)
  });
  return deferred.promise();
}


// API definition
const API = {
    retrieveProfiles
}
Broker.channel('Profiles').reply(API)
export default API
