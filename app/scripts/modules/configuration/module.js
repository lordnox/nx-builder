angular.module('configuration', [])
  .provider('config', function() {
    var appPrefix = '/';
    var templateUrlPrefix = 'templates/';
    var appVersion = 8;

    var config = {

      version : appVersion,

      baseDirectory : appPrefix,
      templateDirectory : templateUrlPrefix,
      templateFileQuerystring : "?v=" + appVersion,

      routing : {
        prefix : '',
        html5Mode : false
      },

      viewUrlPrefix : templateUrlPrefix + 'views/',
      partialUrlPrefix : templateUrlPrefix + 'partials/',

      templateFileSuffix : '_tpl.html',

      prepareViewTemplateUrl : function(url) {
        return config.viewUrlPrefix + url + config.templateFileSuffix + config.templateFileQuerystring;
      },

      moduleUrlPrefix : 'scripts/modules/',
      prepareModuleTemplateUrl : function(module, url) {
        return config.moduleUrlPrefix + module + '/' + templateUrlPrefix + url + config.templateFileSuffix + config.templateFileQuerystring;
      }
    };
    return {
      $get: function() {
        return config;
      },
      prepareModuleTemplateUrl: config.prepareModuleTemplateUrl,
      prepareViewTemplateUrl: config.prepareViewTemplateUrl,
      set: function(key, value) {
        config[key] = value;
      },
      config: config
    };
  })
;
