///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 'jimu/BaseWidget'], function(
  declare,
  BaseWidget
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-header jimu-main-background',

    postCreate: function() {
      this.inherited(arguments);

      // console.log(this.appConfig);
      if (this.appConfig) {
        this._initUI(this.appConfig);
      }
    },

    startup: function() {
      this.inherited(arguments);
    },
    _initUI: function(appConfig) {
      if (appConfig.logo) {
        this.logoNode.src = appConfig.logo;
        this.logoNode.alt = appConfig.logo;
      } else {
        this.logoNode.style.display = 'none';
      }
      // set title
      if (appConfig.title) {
        this.titleNode.innerHTML = appConfig.title;
      }
      // set subtitle
      if (appConfig.subtitle) {
        this.subtitleNode.innerHTML = appConfig.subtitle;
      }
      // add links
      if (appConfig.links && appConfig.links.length) {
        for (var i = 0; i < appConfig.links.length; i++) {
          var linkConfig = appConfig.links[i];
          var linkNode = document.createElement('a');
          linkNode.innerHTML = linkConfig.label;
          linkNode.className = 'jimu-link';
          linkNode.href = linkConfig.url;
          this.linksNode.appendChild(linkNode);
        }
      }
    },
    onAppConfigChanged: function(appConfig, reason, changedData) {
      // Console.log('attribute changed......................');
      // console.log(changedData);
      if (reason && reason === 'attributeChange') {
        Console.log('attribute changed......................');
        // update logo
        if ('logo' in changedData && changedData.logo !== this.appConfig.logo) {
          if (changedData.logo) {
            this.logoNode.src = appConfig.logo;
            this.logoNode.alt = appConfig.logo;
            this.logoNode.style.display = '';
          } else {
            this.logoNode.removeAttribute('src');
            this.logoNode.removeAttribute('alt');
            this.logoNode.style.display = 'none';
          }
        }
        // update title
        if (
          'title' in changedData &&
          changedData.title !== this.appConfig.title
        ) {
          this.titleNode.innerHTML = changedData.title;
        }
        // update subtitle
        if (
          'subtitle' in changedData &&
          changedData.subtitle !== this.appConfig.subtitle
        ) {
          this.subtitleNode.innerHTML = changedData.subtitle;
        }
        // recreate links
        if ('links' in changedData) {
          this.linksNode.innerHTML = '';
          if (changedData.links.length) {
            for (var i = 0; i < changedData.links.length; i++) {
              var linkConfig = changedData.links[i];
              var linkNode = document.createElement('a');
              linkNode.innerHTML = linkConfig.label;
              linkNode.className = 'jimu-link';
              linkNode.href = linkConfig.url;
              this.linksNode.appendChild(linkNode);
            }
          }
        }
      }
      this.appConfig = appConfig;
    },
  });
});
