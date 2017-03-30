modules = {
    bie {
        dependsOn 'bootstrap', 'ekko'
        resource url: [dir: 'js', file: 'atlas.js', plugin:'bie-plugin'], disposition: 'head', exclude: '*'
        // TODO: Replace.
        resource url: [dir: 'css', file: 'atlas.css'], attrs: [media: 'screen, print']
    }

    application {
        resource url: [dir: 'js', file: 'application.js', plugin:'bie-plugin']
    }

    search {
        resource url: [dir: 'js', file: 'jquery.sortElemets.js', plugin:'bie-plugin']
        resource url: [dir: 'js', file: 'search.js', plugin:'bie-plugin']
    }

    show {
        dependsOn 'cleanHtml, ekko'

        resource url:[dir:'js/leaflet', file:'leaflet.css', plugin:'bie-plugin'], attrs: [ media: 'all' ]
        resource url:[dir:'js/leaflet', file:'leaflet.js', plugin:'bie-plugin']

        resource url: [dir: 'css', file: 'species.css', plugin:'bie-plugin']
        resource url: [dir: 'css', file: 'jquery.qtip.min.css', plugin:'bie-plugin']

        resource url: [dir: 'js', file: 'jquery.sortElemets.js', plugin:'bie-plugin', disposition: 'head']
        resource url: [dir: 'js', file: 'jquery.jsonp-2.3.1.min.js', plugin:'bie-plugin', disposition: 'head']
        resource url: [dir: 'js', file: 'trove.js', plugin:'bie-plugin', disposition: 'head']

        resource url: [dir: 'js', file: 'species.show.js', plugin:'bie-plugin', disposition: 'head']
        resource url: [dir: 'js', file: 'audio.min.js', plugin:'bie-plugin', disposition: 'head']
        resource url: [dir: 'js', file: 'jquery.qtip.min.js', plugin:'bie-plugin', disposition: 'head']
        resource url: [dir: 'js', file: 'moment.min.js', plugin:'bie-plugin', disposition: 'head']
    }

    cleanHtml {
        resource url: [dir: 'js', file: 'jquery.htmlClean.js', plugin:'bie-plugin', disposition: 'head']
    }

    ekko {
        resource url: [dir: 'css', file: 'ekko-lightbox.css', plugin:'bie-plugin']
        resource url: [dir: 'js', file: 'ekko-lightbox.min.js', plugin:'bie-plugin']
    }
}