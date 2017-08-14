modules = {
    bie {
        dependsOn 'bootstrap', 'ekko'
        resource url: [dir: 'js', file: 'atlas.js', plugin:'elurikkus-bie'], disposition: 'head', exclude: '*'
        // TODO: Replace.
        resource url: [dir: 'css', file: 'atlas.css'], attrs: [media: 'screen, print']
    }

    biefixed {
        dependsOn 'bootstrap', 'ekko'
        resource url: [dir: 'js', file: 'atlas.js', plugin:'elurikkus-bie'], disposition: 'head', exclude: '*'
        // TODO: Replace.
        resource url: [dir: 'css', file: 'atlas.css'], attrs: [media: 'screen, print']
    }

    application {
        resource url: [dir: 'js', file: 'application.js', plugin:'elurikkus-bie']
    }

    search {
        resource url: [dir: 'js', file: 'jquery.sortElemets.js', plugin:'elurikkus-bie']
        resource url: [dir: 'js', file: 'search.js']
    }

    showDependencies {
        dependsOn 'cleanHtml, ekko'

        resource url:[dir:'js/leaflet', file:'leaflet.css', plugin:'elurikkus-bie'], attrs: [ media: 'all' ]
        resource url:[dir:'js/leaflet', file:'leaflet.js', plugin:'elurikkus-bie']

        resource url: [dir: 'css', file: 'jquery.qtip.min.css', plugin:'elurikkus-bie']

        resource url: [dir: 'js', file: 'jquery.sortElemets.js', plugin:'elurikkus-bie', disposition: 'head']
        resource url: [dir: 'css', file: 'species.css', plugin:'elurikkus-bie']
        resource url: [dir: 'js', file: 'jquery.qtip.min.js', plugin:'elurikkus-bie', disposition: 'head']
        resource url: [dir: 'js', file: 'moment.min.js', plugin:'elurikkus-bie', disposition: 'head']
        resource url: [dir: 'js', file: 'audio.min.js', plugin:'elurikkus-bie', disposition: 'head']
        // Note: this should be last, because it doesn't end with color or newline. Grails resource
        // plugin just smacks everything together, leading to the return value of jquery.json module
        // (which is undefined probably) be applied to the next module...
        resource url: [dir: 'js', file: 'jquery.jsonp-2.3.1.min.js', plugin:'elurikkus-bie', disposition: 'head']
    }

    showOverride {
        dependsOn 'showDependencies'

        resource url: [dir: 'js', file: 'species.show.js', disposition: 'head']
    }

    cleanHtml {
        resource url: [dir: 'js', file: 'jquery.htmlClean.js', plugin:'elurikkus-bie', disposition: 'head']
    }

    ekko {
        resource url: [dir: 'css', file: 'ekko-lightbox.css', plugin:'elurikkus-bie']
        resource url: [dir: 'js', file: 'ekko-lightbox.min.js', plugin:'elurikkus-bie']
    }
}
