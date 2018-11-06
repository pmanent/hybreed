import Config from './config'
import {Backbone} from '~/src/vendor/libs';

const localCache = {}

// It always returns a Backbone collection
function getCommon(paramsObj){
  const deferred = $.Deferred()
  const tryLocalCache = (_.isUndefined(paramsObj.tryLocalCache)) ? false : paramsObj.tryLocalCache
  const localCacheName = paramsObj.localCacheName
  const url = Config.endpoints.getEndpoint() + paramsObj.url;


  const parse = (_.isUndefined(paramsObj.parse)) ? ((a) => a) : paramsObj.parse
  const fields = paramsObj.fields ? paramsObj.fields:{};

  // Serve data from cache or online
  if(tryLocalCache && !_.isUndefined(getLocalCache(localCacheName))){
    deferred.resolve(getLocalCache(localCacheName))
  }
  else {
    // Set Backbone
    // console.log('Get the values from server!!!');
    const Model = Backbone.Model.extend();
    const Collection = Backbone.Collection.extend({
        model: Model,
        url,
        parse
    })

    // Get Data from remote
    let collection = new Collection();
    collection.credentials = Config.getCredentials();

    collection.contentType = 'application/json; charset=utf-8';

    collection.fetch({data: fields,timeout:30000})
    .then(() => {
        if(!collection.isEmpty()){
            var firstElement=collection.first();
            var response = firstElement.get('response');
            if(firstElement && response && response == 'error'){
                var responseCode=firstElement.get('responseCode');
                deferred.reject('Server error Response '+responseCode);
            } else{
                setLocalCache(localCacheName, collection);
                deferred.resolve(collection);
            }
        }
        else{
            setLocalCache(localCacheName, collection);
            deferred.resolve(collection);
        }

    })
    .fail(( jqXHR, textStatus, errorThrown ) => {
        deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
    })
  }

  return deferred.promise()
}

var ModelSave = Backbone.Model.extend();
function setCommon(paramsObj) {
    var deferred = $.Deferred();
    var url = Config.endpoints.getEndpoint() + paramsObj.url;
    var fields = paramsObj.fields ? paramsObj.fields:{};
    var parse = (_.isUndefined(paramsObj.parse)) ? ((a) => a) : paramsObj.parse;
    // Set Backbone

    var model = new ModelSave();
    model.url=url;
    model.parse=parse;

    var defaultCredentials = Config.getCredentials();
    if(paramsObj.fields.username ){
        defaultCredentials = {username : paramsObj.fields.username ,
                              password : paramsObj.fields.password}
    }
    model.credentials = defaultCredentials;
    fields.username = defaultCredentials.username;
    fields.password = defaultCredentials.password;
    //model.contentType = 'application/json;charset=UTF-8;';

    // Set Data to remote {contentType : 'application/json;charset=UTF-8;'},{data:fields}
    model.save(fields,{timeout:30000,contentType : 'application/json;charset=UTF-8'})
    .then(() => {
        deferred.resolve(model);
    })
    .fail(( jqXHR, textStatus, errorThrown ) => {
        deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
    })

    return deferred.promise()
}

function updateCommon(paramsObj) {
    const deferred = $.Deferred()
    const id = paramsObj.id
    const url = paramsObj.url
    const fields = paramsObj.fields

    this.getCommon({url})
    .then((colection) => {
      colection.get(id).save(fields)
      .then((resUpdate) => {
        deferred.resolve(resUpdate)
      })
      .fail(( jqXHR, textStatus, errorThrown ) => {
          deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
      })
    })
    .fail(( jqXHR, textStatus, errorThrown ) => {
        deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
    })

    return deferred.promise()
}

function deleteCommon(paramsObj) {
    const deferred = $.Deferred()
    const id = paramsObj.id
    const url = paramsObj.url

    this.getCommon({url})
    .then((colection) => {
      colection.get(id).destroy()
      .then((resDelete) => {
        deferred.resolve(resDelete)
      })
      .fail(( jqXHR, textStatus, errorThrown ) => {
          deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
      })
    })
    .fail(( jqXHR, textStatus, errorThrown ) => {
        deferred.reject(PrivateAPI.retrieveErrorMessage(jqXHR, textStatus, errorThrown))
    })

    return deferred.promise()
}



function getLocalCache(localCacheName){
  if(!_.isUndefined(localCache[localCacheName])){
    return localCache[localCacheName].data
  }
  else {
    return undefined
  }
}


function setLocalCache(localCacheName, data){
  localCache[localCacheName] = {
    cachedTime: new Date().getTime(),
    data
  }
}



// API definition
const API = {
  getCommon,
  setCommon,
  updateCommon,
  deleteCommon,
  setLocalCache
}
export default API

const PrivateAPI = {
    //"timeout", "error", "abort", and "parsererror"

    retrieveErrorMessage: (jqXHR, textStatus, errorThrown)=>{
        var errorMessage = '';

        switch(textStatus) {
            case 'timeout':
                errorMessage = 'Unable to connect to the data server. Please verify your connection.';
                break;
            case 'error':
                errorMessage = 'Unable to connect to the data server. An error has been detected';
                break;
            case 'abort':
                errorMessage = 'Unable to connect to the data server. The request has been aborted';
                break;
            case 'parsererror':
                errorMessage = 'Unable to connect to the data server. Parse error detected';
                break;
            default:
                errorMessage = 'Unable to connect to the data server.';
        }
        var error={
            jqXHR:jqXHR,
            textStatus:textStatus,
            errorThrown:errorThrown,
            errorMessage:errorMessage
        }
        return error;

    }
}