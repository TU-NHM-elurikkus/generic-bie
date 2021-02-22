<%@ page contentType="text/html;charset=UTF-8" %>

<g:set var="alaUrl" value="${grailsApplication.config.serverRoot}" />
<g:set var="biocacheUrl" value="${grailsApplication.config.occurrences.ui.url}" />
<g:set var="speciesListUrl" value="${grailsApplication.config.lists.ui.url}" />
<g:set var="spatialPortalUrl" value="${grailsApplication.config.spatial.ui.url}" />
<g:set var="collectoryUrl" value="${grailsApplication.config.collectory.ui.url}" />
<g:set var="alertsUrl" value="${grailsApplication.config.alerts.ui.url}" />
<g:set var="guid" value="${tc?.previousGuid ?: tc?.taxonConcept?.guid ?: ''}" />

<g:set var="synonymsQuery">
    <g:each in="${tc?.synonyms}" var="synonym" status="i">
        \"${synonym.nameString}\"
        <g:if test="${i < tc.synonyms.size() - 1}">
            OR
        </g:if>
    </g:each>
</g:set>

<g:set var="locale" value="${org.springframework.web.servlet.support.RequestContextUtils.getLocale(request)}" />
<g:set bean="authService" var="authService" />
<g:set var="imageViewerType" value="${grailsApplication.config.imageViewerType ?: 'LEAFLET'}" />

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="layout" content="${grailsApplication.config.skin.layout}" />
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>
            ${tc?.taxonConcept?.nameString} ${(tc?.commonNames) ? ' : ' + tc?.commonNames?.get(0)?.nameString : ''}
        </title>

        <g:if test="${grailsApplication.config.google.apikey}">
            <script src="https://maps.googleapis.com/maps/api/js?v=3.5&key=${grailsApplication.config.google.apikey}" type="text/javascript"></script>
        </g:if>
        <g:else>
            <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        </g:else>

        <script type="text/javascript">
            <g:if test="${!grailsApplication.config.google.apikey}">
                google.load('maps','3.5',{ other_params: "sensor=false" });
            </g:if>
        </script>

        <asset:stylesheet src="show.css" />
        <asset:javascript src="show.js" />
    </head>

    <body>
        <div class="page-taxon">
            <header class="page-header">
                <h1 class="page-header__title">
                    ${raw(tc.taxonConcept.nameFormatted)}
                </h1>

                <div class="page-header__subtitle">
                    <g:if test="${commonNameDisplay}">
                        ${raw(commonNameDisplay)}
                    </g:if>

                    <g:set var="commonNameDisplay" value="${(tc?.commonNames) ? tc?.commonNames?.opt(0)?.nameString : ''}" />

                    <span>
                        <g:message code="show.details.rank" />:
                        <g:message code="taxonomy.rank.${tc.taxonConcept.rankString}" default="${tc.taxonConcept.rankString}" />.
                    </span>

                    <g:set var="taxonStatus" value="${tc.taxonConcept.taxonomicStatus}" />
                    <g:if test="${taxonStatus}">
                        <span title="${message(code: 'taxonomicStatus.' + taxonStatus + '.detail')}">
                            <g:message code="taxonomicStatus.${taxonStatus}" default="${taxonStatus}" />.
                        </span>
                    </g:if>

                    <span>
                        <g:message code="taxonomicStatus.nameAuthority" />:
                        ${tc?.taxonConcept.nameAuthority}
                    </span>
                </div>

                <div class="page-header-links">
                    <a href="/bie-hub/search" class="page-header-links__link">
                        <span class="fa fa-search"></span>
                        <g:message code="general.btn.search" />
                    </a>
                </div>
            </header>

            <div id="main-content">
                <div class="taxon-tabs">
                    <ul class="nav nav-tabs tab-links">
                        <li class="nav-item">
                            <a href="#tab-overview" data-toggle="tab" class="nav-link active">
                                <g:message code="show.overview.title" />
                            </a>
                        </li>

                        <li id="conservationTabContainer" class="nav-item" style="display:none">
                            <a href="#tab-conservation" data-toggle="tab" class="nav-link">
                                <g:message code="show.conservation.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-gallery" data-toggle="tab" class="nav-link">
                                <g:message code="show.gallery.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-names" data-toggle="tab" class="nav-link">
                                <g:message code="show.names.label" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-classification" data-toggle="tab" class="nav-link">
                                <g:message code="show.classification.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-records" data-toggle="tab" class="nav-link">
                                <g:message code="show.records.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-literature" data-toggle="tab" class="nav-link">
                                <g:message code="show.literature.label" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-sequences" data-toggle="tab" class="nav-link">
                                <g:message code="show.sequences.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#tab-datasets" data-toggle="tab" class="nav-link">
                                <g:message code="show.datasets.title" />
                            </a>
                        </li>

                        <li id="redlistTabContainer" class="nav-item" style="display:none">
                            <a href="#tab-redlist" data-toggle="tab" class="nav-link">
                                <g:message code="show.redlist.title" />
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <g:render template="tabs/overview" />

                        <g:render template="tabs/conservation" />

                        <g:render template="tabs/gallery" />

                        <g:render template="tabs/names" />

                        <g:render template="tabs/classification" />

                        <g:render template="tabs/records" />

                        <g:render template="tabs/literature" />

                        <g:render template="tabs/sequences" />

                        <g:render template="tabs/datasets" />

                        <g:render template="tabs/redlist" />

                        <section class="tab-pane" id="indigenous-info" role="tabpanel"></section>
                    </div>
                </div>
            </div>  <%-- end main-content --%>
        </div>

        <%-- description template --%>
        <div id="descriptionTemplate" class="card detached-card panel-description" style="display:none;">
            <div class="card-header">
                <h3 class="title">
                    <g:message code="show.overview.field.description" />
                </h3>
            </div>

            <div class="card-body">
                <p class="content"></p>
            </div>

            <div class="card-footer">
                <p class="source">
                    <g:message code="show.names.field.source" />:
                    <span class="sourceText"></span>
                </p>

                <p class="rights">
                    <g:message code="show.overview.field.rightsHolder" />:
                    <span class="rightsText"></span>
                </p>

                <p class="provider">
                    <g:message code="show.overview.field.providedBy" />:
                    <a href="#" class="providedBy" target="_blank"></a>
                </p>
            </div>
        </div>

        <%-- indigenous-profile-summary template --%>
        <div id="indigenous-profile-summary-template" class="hidden-node padding-bottom-2">
            <div class="indigenous-profile-summary row">
                <div class="col-md-2">
                    <div class="collection-logo embed-responsive embed-responsive-16by9 col-xs-11"></div>

                    <div class="collection-logo-caption small"></div>
                </div>

                <div class="col-md-10 profile-summary">
                    <h3 class="profile-name"></h3>

                    <span class="collection-name"></span>

                    <div class="profile-link pull-right"></div>

                    <h3 class="other-names"></h3>

                    <div class="summary-text"></div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2 ">
                </div>

                <div class="col-md-5 hidden-node main-image padding-bottom-2">
                    <div class="row">
                        <div class="col-md-8 panel-heading">
                            <h3 class="panel-title">
                                <g:message code="show.overview.media.image" />
                            </h3>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 ">
                            <div class="image-embedded"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-1">
                </div>

                <div class="col-md-3 hidden-node main-audio padding-bottom-2">
                    <div class="row">
                        <div class="col-md-8 panel-heading">
                            <h3 class="panel-title">
                                <g:message code="show.overview.media.audio" />
                            </h3>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="audio-embedded embed-responsive embed-responsive-16by9 col-xs-12 text-center">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 small">
                            <div class="row">
                                <div class="col-md-5 ">
                                    <strong>
                                        <g:message code="show.names.field.name" />
                                    </strong>
                                </div>

                                <div class="col-md-7 audio-name"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-5 ">
                                    <strong>
                                        <g:message code="show.datasets.attribution" />
                                    </strong>
                                </div>

                                <div class="col-md-7 audio-attribution"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-5 ">
                                    <strong>
                                        <g:message code="show.datasets.licence" />
                                    </strong>
                                </div>

                                <div class="col-md-7 audio-license"></div>
                            </div>

                        </div>

                        <div class="col-md-2 "></div>
                    </div>
                </div>

                <div class="col-md-1">
                </div>
            </div>

            <div class="hidden-node main-video padding-bottom-2">
                <div class="row">
                    <div class="col-md-2 ">
                    </div>

                    <div class="col-md-8 panel-heading">
                        <h3 class="panel-title">
                            <g:message code="show.overview.media.video" />
                        </h3>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2 ">
                    </div>

                    <div class="col-md-7 ">
                        <div class="video-embedded embed-responsive embed-responsive-16by9 col-xs-12 text-center"></div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2 "></div>

                    <div class="col-md-7 small">
                        <div class="row">
                            <div class="col-md-2 ">
                                <strong>
                                    <g:message code="show.names.field.name" />
                                </strong>
                            </div>

                            <div class="col-md-10 video-name"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-2 ">
                                <strong>
                                    <g:message code="show.datasets.attribution" />
                                </strong>
                            </div>

                            <div class="col-md-10 video-attribution"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-2 ">
                                <strong>
                                    <g:message code="show.datasets.licence" />
                                </strong>
                            </div>

                            <div class="col-md-10 video-license"></div>
                        </div>
                    </div>

                    <div class="col-md-2 "></div>
                </div>
            </div>

            <hr />
        </div>

        <div id="imageDialog" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div id="viewerContainerId"></div>
                    </div>
                </div>  <%-- /.modal-content --%>
            </div>  <%-- /.modal-dialog --%>
        </div>

        <div id="alertModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div id="alertContent"></div>
                        <%-- dialog buttons --%>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">
                                <g:message code="general.btn.close" />
                            </button>
                        </div>
                    </div>
                </div>  <%-- /.modal-content --%>
            </div>  <%-- /.modal-dialog --%>
        </div>

        <g:javascript>
            // Global var to pass GSP vars into JS file
            // @TODO replace bhl and trove with literatureSource list
            var SHOW_CONF = {
                biocacheUrl:        "${grailsApplication.config.occurrences.ui.url}",
                biocacheServiceUrl: "${grailsApplication.config.biocacheService.ui.url}",
                layersServiceUrl:   "${grailsApplication.config.layersService.ui.url}",
                collectoryUrl:      "${grailsApplication.config.collectory.ui.url}",
                profileServiceUrl:  "${grailsApplication.config.profileService.baseURL}",
                imageServiceBaseUrl:"${grailsApplication.config.image.baseURL}",
                guid:               "${guid}",
                scientificName:     "${tc?.taxonConcept?.nameString ?: ''}",
                rankString:         "${tc?.taxonConcept?.rankString ?: ''}",
                taxonRankID:        "${tc?.taxonConcept?.rankID ?: ''}",
                synonymsQuery:      "${synonymsQuery.replaceAll('\"\"','\"').encodeAsJavaScript()}",
                preferredImageId:   "${tc?.imageIdentifier?: ''}",
                serverName:         "${grailsApplication.config.bie.ui.url}",
                speciesListUrl:     "${grailsApplication.config.lists.ui.url}",
                bieUrl:             "${grailsApplication.config.bie.ui.url}",
                bieServiceUrl:      "${grailsApplication.config.bie.index.url}",
                alertsUrl:          "${grailsApplication.config.alerts.ui.url}",
                remoteUser:         "${request.remoteUser ?: ''}",
                eolUrl:             "${raw(createLink(controller: 'externalSite', action: 'eol', params: [s: tc?.taxonConcept?.nameString ?: '', f:tc?.classification?.class ?: tc?.classification?.phylum ?: '']))}",
                soundUrl:           "${createLink(controller: 'species', action: 'soundSearch', params: [s: tc?.taxonConcept?.nameString ?: ''])}",  // FixMe: do somthing so that it starts working
                eolLanguage:        "${grailsApplication.config.eol.lang}",
                defaultDecimalLatitude: ${grailsApplication.config.defaultDecimalLatitude},
                defaultDecimalLongitude: ${grailsApplication.config.defaultDecimalLongitude},
                defaultZoomLevel: ${grailsApplication.config.defaultZoomLevel},
                mapAttribution: "${raw(grailsApplication.config.skin.orgNameLong)}",
                defaultMapUrl: "${grailsApplication.config.map.default.url}",
                defaultMapAttr: "${raw(grailsApplication.config.map.default.attr)}",
                defaultMapDomain: "${grailsApplication.config.map.default.domain}",
                defaultMapId: "${grailsApplication.config.map.default.id}",
                defaultMapToken: "${grailsApplication.config.map.default.token}",
                recordsMapColour: "${grailsApplication.config.map.records.colour}",
                mapQueryContext: "${grailsApplication.config.biocacheService.queryContext}",
                noImage100Url: "${resource(dir: 'images', file: 'noImage100.jpg')}",
                map: null,
                imageDialog: '${imageViewerType}',
                likeUrl: "${createLink(controller: 'imageClient', action: 'likeImage')}",
                dislikeUrl: "${createLink(controller: 'imageClient', action: 'dislikeImage')}",
                userRatingUrl: "${createLink(controller: 'imageClient', action: 'userRating')}",
                disableLikeDislikeButton: "${authService.getUserId() ? false : true}",
                userRatingHelpText: '<div><b>Up vote (<span class="fa fa-thumbs-o-up" aria-hidden="true"></span>) an image:</b>' +
                ' Image supports the identification of the species or is representative of the species.  Subject is clearly visible including identifying features.<br /><br />' +
                '<b>Down vote (<span class="fa fa-thumbs-o-down" aria-hidden="true"></span>) an image:</b>'+
                ' Image does not support the identification of the species, subject is unclear and identifying features are difficult to see or not visible.<br /><br /></div>',
                savePreferredSpeciesListUrl: "${createLink(controller: 'imageClient', action: 'saveImageToSpeciesList')}",
                getPreferredSpeciesListUrl: "${grailsApplication.config.lists.ui.url}",
                addPreferenceButton: "${authService?.getUserId() ? (authService.getUserForUserId(authService.getUserId())?.roles?.contains('ROLE_ADMIN') ? true : false) : false}",
                mapOutline: "${grailsApplication.config.map.outline ?: 'false'}",
                mapEnvOptions: "${grailsApplication.config.map.env?.options ?: 'color:' + grailsApplication.config.map.records.colour+ ';name:circle;size:4;opacity:0.8'}",
                locale: "${locale}"
            };

            function openTab(anchor) {
                $('a[href="' + anchor + '"]').tab('show');
            }

            $(function() {
                showSpeciesPage();

                $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                    var target = $(e.target).attr('href').replace('tab-', '');

                    if(window.history) {
                        window.history.replaceState({}, '', target);
                    } else {
                        window.location.hash = target;
                    }

                    if(target == '#records') {
                        $('#charts').html('');  //prevent multiple loads

                        <charts:biocache
                            biocacheServiceUrl="${grailsApplication.config.biocacheService.ui.url}"
                            biocacheWebappUrl="${grailsApplication.config.occurrences.ui.url}"
                            q="lsid:${guid}"
                            qc="${grailsApplication.config.biocacheService.queryContext ?: ''}"
                            fq=""
                        />
                    }

                    if(target === '#overview') {
                        loadMap();
                    }
                });

                if(window.location.hash) {
                    openTab(window.location.hash.replace('#', '#tab-'));
                }
            });
        </g:javascript>
    </body>
</html>
