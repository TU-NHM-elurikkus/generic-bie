<%@ page contentType="text/html;charset=UTF-8" %>

<g:set var="alaUrl" value="${grailsApplication.config.ala.baseURL}" />
<g:set var="biocacheUrl" value="${grailsApplication.config.biocache.baseURL}" />
<g:set var="speciesListUrl" value="${grailsApplication.config.speciesList.baseURL}" />
<g:set var="spatialPortalUrl" value="${grailsApplication.config.spatial.baseURL}" />
<g:set var="collectoryUrl" value="${grailsApplication.config.collectory.baseURL}" />
<g:set var="citizenSciUrl" value="${grailsApplication.config.sightings.guidUrl}" />
<g:set var="alertsUrl" value="${grailsApplication.config.alerts.url}" />
<g:set var="guid" value="${tc?.previousGuid ?: tc?.taxonConcept?.guid ?: ''}" />

<g:set var="sciNameFormatted">
    <bie:formatSciName
        rankId="${tc?.taxonConcept?.rankID}"
        nameFormatted="${tc?.taxonConcept?.nameString}"
        nameComplete="${tc?.taxonConcept?.nameComplete}"
        name="${tc?.taxonConcept?.name}"
        taxonomicStatus="${tc?.taxonConcept?.taxonomicStatus}"
        acceptedName="${tc?.taxonConcept?.acceptedConceptName}"
    />
</g:set>

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
<g:set var="imageViewerType" value="${grailsApplication.config.imageViewerType?:'LEAFLET'}" />

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>
            ${tc?.taxonConcept?.nameString} ${(tc?.commonNames) ? ' : ' + tc?.commonNames?.get(0)?.nameString : ''} | ${raw(grailsApplication.config.skin.orgNameLong)}
        </title>
        <meta name="layout" content="${grailsApplication.config.skin.layout}" />
        <r:require modules="show, charts, image-viewer" />
    </head>

    <body>
        <div class="page-taxon">
            <header class="page-header">
                <h1 class="page-header__title">
                    ${raw(sciNameFormatted)}
                </h1>

                <div class="page-header__subtitle row subtitle-row">
                    <g:if test="${commonNameDisplay}">
                        <div class="col-md-2">
                            ${raw(commonNameDisplay)}
                        </div>
                    </g:if>

                    <g:set var="commonNameDisplay" value="${(tc?.commonNames) ? tc?.commonNames?.opt(0)?.nameString : ''}" />

                    <div class="col-md-1">
                        ${tc.taxonConcept.rankString}
                    </div>

                    <g:if test="${tc.taxonConcept.taxonomicStatus}">
                        <div
                            class="inline-head taxonomic-status col-md-1"
                            title="${message(code: 'taxonomicStatus.' + tc.taxonConcept.taxonomicStatus + '.detail', default: '')}"
                        >
                            <g:message code="taxonomicStatus.${tc.taxonConcept.taxonomicStatus}" default="${tc.taxonConcept.taxonomicStatus}" />
                        </div>
                    </g:if>

                    <div class="inline-head name-authority col-md-2">
                        <g:message code="show.details.nameAuthority" />:
                        <span class="name-authority">
                            ${tc?.taxonConcept.nameAuthority ?: grailsApplication.config.defaultNameAuthority}
                        </span>
                    </div>
                </div>

                <div class="page-header-links">
                    <a href="/bie-hub" class="page-header-links__link">
                        <g:message code="search.head.title" />
                    </a>

                    <g:if test="${taxonHierarchy && taxonHierarchy.size() > 1}">
                        <g:each in="${taxonHierarchy}" var="taxon">
                            <g:link controller="species" action="show" params="[guid: taxon.guid]" class="page-header-links__link">
                                <bie:formatSciName
                                    rankId="${taxon.rankID}"
                                    name="${taxon.scientificName}"
                                    simpleName="${true}"
                                />
                            </g:link>
                        </g:each>
                    </g:if>
                </div>
            </header>

            <div id="main-content">
                <div class="taxon-tabs">
                    <ul class="nav nav-tabs tab-links">
                        <li class="nav-item">
                            <a href="#overview" data-toggle="tab" class="nav-link active" role="tab">
                                <g:message code="show.overview.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#gallery" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.gallery.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#names" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.names.label" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#classification" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.classification.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#records" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.records.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#literature" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.literature.label" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#sequences" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.sequences.title" />
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="#data-partners" data-toggle="tab" class="nav-link" role="tab">
                                <g:message code="show.datasets.title" />
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <section class="tab-pane active" id="overview" role="tabpanel">
                            <div class="row taxon-row">
                                <div class="col-md-5">
                                    <div class="taxon-summary-gallery">
                                        <div class="main-img hidden-node">
                                            <a
                                                class="lightbox-img"
                                                data-toggle="lightbox"
                                                data-gallery="taxon-summary-gallery"
                                                data-parent=".taxon-summary-gallery"
                                                data-footer=""
                                                href=""
                                            >
                                                <img class="mainOverviewImage img-responsive" src="" />
                                            </a>

                                            <div class="caption mainOverviewImageInfo"></div>
                                        </div>

                                        <div class="thumb-row hidden-node">
                                            <div id="overview-thumbs"></div>

                                            <div id="more-photo-thumb-link" class="taxon-summary-thumb" style="">
                                                <a
                                                    class="more-photos tab-link"
                                                    href="#gallery"
                                                    title="${message(code: 'show.gallery.showMore')}"
                                                    onclick="openTab('#gallery')"
                                                >
                                                   <span>
                                                       +
                                                   </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <g:if test="${tc.conservationStatuses}">
                                        <div class="card">
                                            <div class="card-header">
                                                <h3 class="card-title">
                                                    <g:message code="show.overview.conservationStatus" />
                                                </h3>
                                            </div>

                                            <div class="card-body">
                                                <ul class="conservationList">
                                                    <g:each in="${tc.conservationStatuses.entrySet().sort { it.key }}" var="cs">
                                                        <li>
                                                            <g:if test="${cs.value.dr}">
                                                                <a href="${collectoryUrl}/public/show/${cs.value.dr}">
                                                                    <span class="iucn <bie:colourForStatus status="${cs.value.status}" />">
                                                                        ${cs.key}
                                                                    </span>

                                                                    ${cs.value.status}
                                                                </a>
                                                            </g:if>
                                                            <g:else>
                                                                <span class="iucn <bie:colourForStatus status="${cs.value.status}" />">
                                                                    ${cs.key}
                                                                </span>

                                                                ${cs.value.status}
                                                            </g:else>
                                                        </li>
                                                    </g:each>
                                                </ul>
                                            </div>
                                        </div>
                                    </g:if>

                                    <div id="descriptiveContent"></div>

                                    <div id="sounds"></div>

                                    <div class="card bie-card">
                                        <div class="card-header">
                                            <h3 class="card-title">
                                                <g:message code="show.overview.onlineResources" />
                                            </h3>
                                        </div>

                                        <div class="card-block">
                                            <g:render template="onlineResources" plugin="bie-plugin" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-7">
                                    <div id="expertDistroDiv" style="display:none;margin-bottom: 20px;">
                                        <h3>
                                            <g:message code="show.map.distroMap.title" />
                                        </h3>

                                        <img
                                            id="distroMapImage"
                                            src="${resource(dir: 'images', file: 'noImage.jpg')}"
                                            class="distroImg"
                                            style="width:316px;"
                                            alt="occurrence map"
                                            onerror="this.style.display='none'"
                                        />

                                        <p class="mapAttribution">
                                            <g:message code="show.map.distroMap.providedBy" />

                                            <span id="dataResource">
                                                [<g:message code="show.map.distroMap.dataResource.unknown" />]
                                            </span>
                                        </p>
                                    </div>

                                    <div class="taxon-map">
                                        <h3>
                                            <g:message code="show.map.occurrencesMap.title" />
                                            (<span class="occurrenceRecordCount">0</span>
                                            <g:message code="show.map.occurrencesMap.nrRecords" />)
                                        </h3>

                                        <div id="leafletMap"></div>

                                        <div class="map-buttons row">
                                            <g:set
                                                var="recordSearchUrl"
                                                value="${biocacheUrl}/occurrences/search?q=lsid:${tc?.taxonConcept?.guid}"
                                            />

                                            <a
                                                class="col-md-6"
                                                href="${recordSearchUrl}#tab-map"
                                                title="${message(code: 'show.map.btn.viewMap')}"
                                                role="button"
                                            >
                                                <g:message code="show.map.btn.viewMap" />
                                            </a>
                                            <a
                                                class="col-md-6"
                                                href="${recordSearchUrl}#tab-records"
                                                title="${message(code: 'show.map.btn.viewRecords')}"
                                                role="button"
                                            >
                                                <span class="fa fa-list"></span>
                                                <g:message code="show.map.btn.viewRecords" />
                                            </a>
                                        </div>
                                    </div>

                                    <div class="card bie-card panel-data-providers bie-vertical-space">
                                        <div class="card-header">
                                            <h3 class="card-title">
                                                <g:message code="show.datasets.title" />
                                            </h3>
                                        </div>

                                        <div class="card-block">
                                            <p>
                                                <strong>
                                                    <span class="datasetCount">0</span>
                                                </strong>
                                                <g:message
                                                    code="show.datasets.summary"
                                                    args="${[grailsApplication.config.skin.orgNameShort, tc.taxonConcept.rankString]}"
                                                />
                                            </p>

                                            <p>
                                                <a class="tab-link" href="#data-partners">
                                                    <g:message code="show.datasets.desc.01" />
                                                </a>
                                                <g:message code="show.datasets.desc.02" />
                                                <g:if test="${tc.taxonConcept?.rankID > 6000}">
                                                    <g:message code="show.datasets.desc.03" args="${[raw(sciNameFormatted)]}" />
                                                </g:if>
                                                <g:else>
                                                    <g:message code="show.datasets.desc.04" args="${[raw(sciNameFormatted)]}" />
                                                </g:else>
                                            </p>
                                        </div>
                                    </div>

                                    <div id="listContent"></div>
                                </div>
                            </div>
                        </section>

                        <section class="tab-pane" id="gallery" role="tabpanel">
                            <g:each in="${["type", "specimen", "other", "uncertain"]}" var="cat">
                                <div id="cat_${cat}" class="hidden-node image-section">
                                    <h2>
                                        <g:message code="images.heading.${cat}" default="${cat}" />

                                        <span class="fa fa-caret-square-o-up" onclick="toggleImageGallery(this)" ></span>
                                    </h2>

                                    <div class="taxon-gallery"></div>
                                </div>
                            </g:each>

                            <div id="cat_nonavailable">
                                <h2>
                                    <g:message code="show.gallery.noImages" />
                                </h2>

                                <p>
                                    <g:message
                                        code="show.gallery.upload.desc"
                                        args="${[raw(grailsApplication.config.skin.orgNameLong)]}"
                                    />
                                </p>
                            </div>

                            <img
                                id="gallerySpinner"
                                src="${resource(dir: 'images', file: 'spinner.gif', plugin: 'biePlugin')}"
                                class="hidden-node"
                                alt="spinner icon"
                            />
                        </section>

                        <section class="tab-pane" id="names" rol="tabpanel">
                            <g:set var="acceptedName" value="${tc.taxonConcept.taxonomicStatus == 'accepted'}" />

                            <h2>
                                <g:message code="show.names.title" />
                            </h2>

                            <div class="table-responsive">
                                <table class="table name-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <g:if test="${acceptedName}">
                                                    <g:message code="show.names.field.acceptedName" />
                                                </g:if>
                                                <g:else>
                                                    <g:message code="show.names.field.name" />
                                                </g:else>
                                            </th>

                                            <th>
                                                <g:message code="show.names.field.source" />
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <g:set var="baseNameFormatted">
                                                    <bie:formatSciName
                                                        rankId="${tc?.taxonConcept?.rankID}"
                                                        nameFormatted="${tc?.taxonConcept?.nameFormatted}"
                                                        nameComplete="${tc?.taxonConcept?.nameComplete}"
                                                        name="${tc?.taxonConcept?.name}"
                                                        taxonomicStatus="name"
                                                        acceptedName="${tc?.taxonConcept?.acceptedConceptName}" />
                                                </g:set>

                                                <g:if test="${tc.taxonConcept.infoSourceURL && tc.taxonConcept.infoSourceURL != tc.taxonConcept.datasetURL}">
                                                    <a href="${tc.taxonConcept.infoSourceURL}" target="_blank" class="external">
                                                        ${raw(baseNameFormatted)}
                                                    </a>
                                                </g:if>
                                                <g:else>
                                                    ${raw(baseNameFormatted)}
                                                </g:else>
                                            </td>

                                            <td class="source">
                                                <ul>
                                                    <li>
                                                        <g:if test="${tc.taxonConcept.datasetURL}">
                                                            <a href="${tc.taxonConcept.datasetURL}" target="_blank" class="external">
                                                                ${tc.taxonConcept.nameAuthority ?: tc.taxonConcept.infoSourceName}
                                                            </a>
                                                        </g:if>
                                                        <g:else>
                                                            ${tc.taxonConcept.nameAuthority ?: tc.taxonConcept.infoSourceName}
                                                        </g:else>

                                                        <g:if test="${!acceptedName}">
                                                            <span class="annotation annotation-taxonomic-status" title="${message(code: 'taxonomicStatus.' + tc.taxonConcept.taxonomicStatus + '.detail', default: '')}">
                                                                <%-- FIXME: This seems to have no value. --%>
                                                                <g:message code="taxonomicStatus.${tc.taxonConcept.taxonomicStatus}.annotation" default="${tc.taxonConcept.taxonomicStatus}" />
                                                            </span>
                                                        </g:if>

                                                        <g:if test="${tc.taxonConcept.nomenclaturalStatus && tc.taxonConcept.nomenclaturalStatus != tc.taxonConcept.taxonomicStatus}">
                                                            <span class="annotation annotation-nomenclatural-status">
                                                                ${tc.taxonConcept.nomenclaturalStatus}
                                                            </span>
                                                        </g:if>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>

                                        <g:if test="${(tc.taxonName && tc.taxonName.namePublishedIn) || tc.taxonConcept.namePublishedIn}">
                                            <tr class="cite">
                                                <td colspan="2">
                                                    <cite>
                                                        <g:message code="show.names.field.publishedIn" />:
                                                        <span class="publishedIn">
                                                            ${tc.taxonName?.namePublishedIn ?: tc.taxonConcept.namePublishedIn}
                                                        </span>
                                                    </cite>
                                                </td>
                                            </tr>
                                        </g:if>
                                    </tbody>
                                </table>

                                <g:if test="${tc.synonyms}">
                                    <table class="table name-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <g:message code="show.names.field.synonyms" />
                                                </th>

                                                <th>
                                                    <g:message code="show.names.field.source" />
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <g:each in="${tc.synonyms}" var="synonym">
                                                <tr>
                                                    <td>
                                                        <g:set var="synonymNameFormatted">
                                                            <bie:formatSciName
                                                                rankId="${tc?.taxonConcept?.rankID}"
                                                                nameFormatted="${synonym.nameFormatted}"
                                                                nameComplete="${synonym.nameComplete}"
                                                                taxonomicStatus="name"
                                                                name="${synonym.nameString}"
                                                            />
                                                        </g:set>

                                                        <g:if test="${synonym.infoSourceURL && synonym.infoSourceURL != synonym.datasetURL}">
                                                            <a href="${synonym.infoSourceURL}" target="_blank" class="external">
                                                                ${raw(synonymNameFormatted)}
                                                            </a>
                                                        </g:if>
                                                        <g:else>
                                                            ${raw(synonymNameFormatted)}
                                                        </g:else>
                                                    </td>

                                                    <td class="source">
                                                        <ul>
                                                            <li>
                                                                <g:if test="${synonym.datasetURL}">
                                                                    <a href="${synonym.datasetURL}" target="_blank" class="external">
                                                                        ${synonym.nameAuthority ?: synonym.infoSourceName}
                                                                    </a>
                                                                </g:if>
                                                                <g:else>
                                                                    ${synonym.nameAuthority ?: synonym.infoSourceName}
                                                                </g:else>

                                                                <span class="annotation annotation-taxonomic-status" title="${message(code: 'taxonomicStatus.' + synonym.taxonomicStatus + '.detail', default: '')}">
                                                                    <g:message code="taxonomicStatus.${synonym.taxonomicStatus}.annotation" default="${synonym.taxonomicStatus}" />
                                                                </span>

                                                                <g:if test="${synonym.nomenclaturalStatus && synonym.nomenclaturalStatus != synonym.taxonomicStatus}">
                                                                    <span class="annotation annotation-nomenclatural-status">
                                                                        ${synonym.nomenclaturalStatus}
                                                                    </span>
                                                                </g:if>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>

                                                <g:if test="${synonym.namePublishedIn && synonym.namePublishedIn != tc?.taxonConcept?.namePublishedIn}">
                                                    <tr class="cite">
                                                        <td colspan="2">
                                                            <cite>
                                                                <g:message code="show.names.field.publishedIn" />:
                                                                <span class="publishedIn">
                                                                    ${synonym.namePublishedIn}
                                                                </span>
                                                            </cite>
                                                        </td>
                                                    </tr>
                                                </g:if>

                                                <g:if test="${synonym.referencedIn }">
                                                    <tr class="cite">
                                                        <td colspan="2">
                                                            <cite>
                                                                <g:message code="show.names.field.referencedIn" />:
                                                                <span class="publishedIn">
                                                                    ${synonym.referencedIn}
                                                                </span>
                                                            </cite>
                                                        </td>
                                                    </tr>
                                                </g:if>
                                            </g:each>
                                        </tbody>
                                    </table>
                                </g:if>

                                <g:if test="${tc.commonNames}">
                                    <table class="table name-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <g:message code="show.names.field.commonName" />
                                                </th>

                                                <th>
                                                    <g:message code="show.names.field.source" />
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <g:each in="${sortCommonNameSources}" var="cn">
                                                <g:set var="cNames" value="${cn.value}" />
                                                <g:set var="nkey" value="${cn.key}" />
                                                <g:set var="fName" value="${nkey?.trim()?.hashCode()}" />
                                                <g:set var="enKey" value="${nkey?.encodeAsJavaScript()}" />
                                                <g:set var="language" value="${sortCommonNameSources?.get(nkey)?.get(0)?.language}" />
                                                <g:set var="infoSourceURL" value="${sortCommonNameSources?.get(nkey)?.get(0)?.infoSourceURL}" />
                                                <g:set var="datasetURL" value="${sortCommonNameSources?.get(nkey)?.get(0)?.datasetURL}" />

                                                <tr>
                                                    <td>
                                                        <g:if test="${infoSourceURL && infoSourceURL != datasetURL}">
                                                            <a href="${infoSourceURL}" target="_blank" class="external">
                                                                <bie:markLanguage text="${nkey}" lang="${language}" />
                                                            </a>
                                                        </g:if>
                                                        <g:else>
                                                            <bie:markLanguage text="${nkey}" lang="${language}" />
                                                        </g:else>
                                                    </td>

                                                    <td class="source">
                                                        <ul>
                                                            <g:each in="${sortCommonNameSources?.get(nkey)}" var="commonName">
                                                                <li>
                                                                    <g:if test="${commonName.datasetURL}">
                                                                        <a href="${commonName.datasetURL}" onclick="window.open(this.href); return false;">
                                                                            ${commonName.infoSourceName}
                                                                        </a>
                                                                    </g:if>
                                                                    <g:else>
                                                                        ${commonName.infoSourceName}
                                                                    </g:else>

                                                                    <g:if test="${commonName.status && commonName.status != 'common'}">
                                                                        <span title="${message(code: 'identifierStatus.' + commonName.status + '.detail', default: '')}" class="annotation annotation-status">
                                                                            ${commonName.status}
                                                                        </span>
                                                                    </g:if>
                                                                </li>
                                                            </g:each>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </g:each>
                                        </tbody>
                                    </table>
                                </g:if>

                                <table class="table name-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <g:message code="show.names.field.identifier" />
                                            </th>

                                            <th>
                                                <g:message code="show.names.field.source" />
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <g:if test="${tc.taxonConcept.infoSourceURL && tc.taxonConcept.infoSourceURL != tc.taxonConcept.datasetURL}">
                                                    <a href="${tc.taxonConcept.infoSourceURL}" target="_blank" class="external">
                                                        ${tc.taxonConcept.guid}
                                                    </a>
                                                </g:if>
                                                <g:else>
                                                    ${tc.taxonConcept.guid}
                                                </g:else>
                                            </td>

                                            <td class="source">
                                                <ul>
                                                    <li>
                                                        <g:if test="${tc.taxonConcept.datasetURL}">
                                                            <a href="${tc.taxonConcept.datasetURL}" onclick="window.open(this.href); return false;">
                                                                ${tc.taxonConcept.nameAuthority}
                                                            </a>
                                                        </g:if>
                                                        <g:else>
                                                            ${tc.taxonConcept.nameAuthority}
                                                        </g:else>

                                                        <span class="annotation annotation-type" title="${message(code: 'identifierType.taxon.detail', default: '')}">
                                                            <g:message code="identifierType.taxon" />
                                                        </span>

                                                        <span class="annotation annotation-status" title="${message(code: 'identifierStatus.current.detail', default: '')}">
                                                            <g:message code="identifierStatus.current" />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>

                                        <g:if test="${tc.taxonConcept.taxonConceptID && tc.taxonConcept.taxonConceptID != tc.taxonConcept.guid}">
                                            <tr>
                                                <td>
                                                    <g:if test="${tc.taxonConcept.taxonConceptSourceURL && tc.taxonConcept.taxonConceptSourceURL != tc.taxonConcept.datasetURL}">
                                                        <a href="${tc.taxonConcept.taxonConceptSourceURL}" target="_blank" class="external">
                                                            ${tc.taxonConcept.taxonConceptID}
                                                        </a>
                                                    </g:if>
                                                    <g:else>
                                                        ${tc.taxonConcept.taxonConceptID}
                                                    </g:else>
                                                </td>

                                                <td class="source">
                                                    <ul>
                                                        <li>
                                                            <g:if test="${tc.taxonConcept.datasetURL}">
                                                                <a href="${tc.taxonConcept.datasetURL}" onclick="window.open(this.href); return false;">
                                                                    ${tc.taxonConcept.nameAuthority}
                                                                </a>
                                                            </g:if>
                                                            <g:else>
                                                                ${tc.taxonConcept.nameAuthority}
                                                            </g:else>

                                                            <span class="annotation annotation-type" title="${message(code: 'identifierType.taxonConcept.detail', default: '')}">
                                                                <g:message code="identifierType.taxonConcept" />
                                                            </span>

                                                            <span class="annotation annotation-status" title="${message(code: 'identifierStatus.current.detail', default: '')}">
                                                                <g:message code="identifierStatus.current" />
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </g:if>

                                        <g:if test="${tc.taxonConcept.scientificNameID && tc.taxonConcept.scientificNameID != tc.taxonConcept.guid && tc.taxonConcept.scientificNameID != tc.taxonConcept.taxonConceptID}">
                                            <tr>
                                                <td>
                                                    <g:if test="${tc.taxonConcept.scientificNameSourceURL && tc.taxonConcept.scientificNameSourceURL != tc.taxonConcept.datasetURL}">
                                                        <a href="${tc.taxonConcept.scientificNameSourceURL}" target="_blank" class="external">
                                                            ${tc.taxonConcept.scientificNameID}
                                                        </a>
                                                    </g:if>
                                                    <g:else>
                                                        ${tc.taxonConcept.scientificNameID}
                                                    </g:else>
                                                </td>

                                                <td class="source">
                                                    <ul>
                                                        <li>
                                                            <g:if test="${tc.taxonConcept.datasetURL}">
                                                                <a href="${tc.taxonConcept.datasetURL}" onclick="window.open(this.href); return false;">
                                                                    ${tc.taxonConcept.nameAuthority}
                                                                </a
                                                            </g:if>
                                                            <g:else>
                                                                ${tc.taxonConcept.nameAuthority}
                                                            </g:else>

                                                            <span class="annotation annotation-type" title="${message(code: 'identifierType.name.detail', default: '')}">
                                                                <g:message code="identifierType.name" />
                                                            </span>

                                                            <span class="annotation annotation-status" title="${message(code: 'identifierStatus.current.detail', default: '')}">
                                                                <g:message code="identifierStatus.current" />
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </g:if>

                                        <g:if test="${tc.identifiers && !tc.identifiers.isEmpty()}">
                                            <g:each in="${tc.identifiers}" var="identifier">
                                                <tr>
                                                    <td>
                                                        <g:if test="${identifier.infoSourceURL && identifier.infoSourceURL != identifier.datasetURL}">
                                                            <a href="${identifier.infoSourceURL}" target="_blank" class="external">
                                                                ${identifier.identifier}
                                                            </a>
                                                        </g:if>
                                                        <g:else>
                                                            ${identifier.identifier}
                                                        </g:else>
                                                    </td>

                                                    <td class="source">
                                                        <ul>
                                                            <li>
                                                                <g:if test="${identifier.datasetURL}">
                                                                    <a href="${identifier.datasetURL}" onclick="window.open(this.href); return false;">
                                                                        ${identifier.nameString ?: identifier.infoSourceName}
                                                                    </a>
                                                                </g:if>
                                                                <g:else>
                                                                    ${identifier.nameString ?: identifier.infoSourceName}
                                                                </g:else>

                                                                <g:if test="${identifier.format}">
                                                                    <span title="${message(code: 'identifierFormat.' + identifier.format + '.detail', default: '')}" class="annotation annotation-format">
                                                                        <g:message code="identifierFormat.${identifier.format}" default="${identifier.format}" />
                                                                    </span>
                                                                </g:if>

                                                                <g:if test="${identifier.status}">
                                                                    <span title="${message(code: 'identifierStatus.' + identifier.status + '.detail', default: '')}" class="annotation annotation-status">
                                                                        <g:message code="identifierFormat.${identifier.status}" default="${identifier.status}" />
                                                                    </span>
                                                                </g:if>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </g:each>
                                        </g:if>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section class="tab-pane" id="classification" role="tabpanel">
                            <h2>
                                <g:if test="${grailsApplication.config.classificationSupplier}">
                                    <g:message
                                        code="show.classification.field.classificationSupplier"
                                        args="${[grailsApplication.config.classificationSupplier]}"
                                    />

                                </g:if>
                                <g:else>
                                    <g:message code="show.classification.title" />
                                </g:else>
                            </h2>

                            <div class="row">
                                <div class="col-sm-6 col-xs-12">
                                    <g:each in="${taxonHierarchy}" var="taxon">
                                        <!-- taxon = ${taxon} -->
                                        <g:if test="${taxon.guid != tc.taxonConcept.guid}">
                                            <%-- XXX Intentional unclosed tag. --%>
                                            <dl>
                                                <dt>
                                                    <g:if test="${taxon.rankID ?: 0 != 0}">
                                                        ${taxon.rank}
                                                    </g:if>
                                                </dt>

                                                <dd>
                                                    <a
                                                        href="${request?.contextPath}/species/${taxon.guid}#classification"
                                                        title="${message(code: 'rank.' + taxon.rank, default: taxon.rank)}"
                                                    >
                                                        <bie:formatSciName
                                                            rankId="${taxon.rankID}"
                                                            name="${taxon.scientificName}"
                                                            simpleName="${true}"
                                                        />

                                                        <g:if test="${taxon.commonNameSingle}">
                                                            : ${taxon.commonNameSingle}
                                                        </g:if>
                                                    </a>
                                                </dd>
                                            <%-- XXX The dl is left open on purpose --%>
                                        </g:if>
                                        <g:else>
                                            <%-- XXX Intentional unclosed tag. --%>
                                            <dl>
                                                <dt id="currentTaxonConcept">
                                                    ${taxon.rank}
                                                </dt>

                                                <dd>
                                                    <span>
                                                        <bie:formatSciName
                                                            rankId="${taxon.rankID}"
                                                            name="${taxon.scientificName}"
                                                            simpleName="${true}"
                                                        />

                                                        <g:if test="${taxon.commonNameSingle}">
                                                            : ${taxon.commonNameSingle}
                                                        </g:if>
                                                    </span>

                                                    <g:if test="${taxon.isAustralian || tc.isAustralian}">
                                                        <%-- XXX: I do not think span does anything. --%>
                                                        <span>
                                                            <%-- TODO: Not Australia. --%>
                                                            <img
                                                                src="${grailsApplication.config.ala.baseURL}/wp-content/themes/ala2011/images/status_native-sm.png"
                                                                alt="Recorded in Australia"
                                                                title="Recorded in Australia"
                                                                width="21"
                                                                height="21"
                                                            />
                                                        </span>
                                                    </g:if>
                                                </dd>
                                            <%-- XXX The dl is left open on purpose --%>
                                        </g:else>
                                    </g:each>

                                    <dl class="child-taxa">
                                        <g:set var="currentRank" value="" />

                                        <g:each in="${childConcepts}" var="child" status="i">
                                            <g:set var="currentRank" value="${child.rank}" />

                                            <dt>
                                                ${child.rank}
                                            </dt>

                                            <g:set var="taxonLabel">
                                                <bie:formatSciName
                                                    rankId="${child.rankID}"
                                                    name="${child.name}"
                                                    simpleName="${true}"
                                                />
                                                <g:if test="${child.commonNameSingle}">
                                                    : ${child.commonNameSingle}
                                                </g:if>
                                            </g:set>

                                            <dd>
                                                <a href="${request?.contextPath}/species/${child.guid}#classification">
                                                    ${raw(taxonLabel.trim())}
                                                </a>
                                            </dd>
                                        </g:each>
                                    </dl>

                                    <%-- XXX Close tags previously left open. --%>
                                    <g:each in="${taxonHierarchy}" var="taxon">
                                        </dl>
                                    </g:each>
                                </div>

                                <g:if test="${tc.taxonConcept.rankID < 7000}">
                                    <div class="col-sm-6 col-xs-12 classification-actions">
                                        <div class="btn-group btn-group-vertical">
                                            <a
                                                href="${grailsApplication.config.bie.index.url}/download?q=rkid_${tc.taxonConcept.rankString}:${tc.taxonConcept.guid}&${grailsApplication.config.bieService.queryContext}"
                                            >
                                                <button class="erk-button erk-button--light">
                                                    <span class="fa fa-download"></span>
                                                    <g:message
                                                        code="show.classification.btn.download.childTaxa"
                                                        args="${[tc.taxonConcept.nameString]}"
                                                    />
                                                </button>
                                            </a>

                                            <a href="${grailsApplication.config.bie.index.url}/download?q=rkid_${tc.taxonConcept.rankString}:${tc.taxonConcept.guid}&fq=rank:species&${grailsApplication.config.bieService.queryContext}"
                                            >
                                                <button class="erk-button erk-button--light">
                                                    <span class="fa fa-download"></span>
                                                    <g:message
                                                        code="show.classification.btn.download.species"
                                                        args="${[tc.taxonConcept.nameString]}"
                                                    />
                                                </button>
                                            </a>

                                            <a
                                                href="${createLink(controller: 'species', action: 'search')}?q=${'rkid_' + tc.taxonConcept.rankString + ':' + tc.taxonConcept.guid}"
                                            >
                                                <button class="erk-button erk-button--light">
                                                    <span class="fa fa-search"></span>
                                                    <g:message
                                                        code="show.classification.btn.search.childTaxa"
                                                        args="${[tc.taxonConcept.nameString]}"
                                                    />
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </g:if>
                            </div>
                        </section>

                        <section class="tab-pane" id="records" role="tabpanel">
                            <div id="occurrenceRecords">
                                <div id="recordBreakdowns">
                                    <h2>
                                        <g:message code="show.records.chart.title" />
                                        <g:message code="show.records.recordCount.title" />
                                    </h2>

                                    <%-- This is not page header but we can use its classes to lay out links in the same way. --%>
                                    <div class="page-header-links">
                                        <a
                                            href="${biocacheUrl}/occurrences/search?q=lsid:${tc?.taxonConcept?.guid ?: ''}#tab-records"
                                            class="page-header-links__link"
                                        >
                                            <g:message code="show.records.list.title" />
                                            <g:message code="show.records.recordCount.title" />
                                        </a>

                                        <a
                                            href="${biocacheUrl}/occurrences/search?q=lsid:${tc?.taxonConcept?.guid ?: ''}#tab-map"
                                            class="page-header-links__link"
                                        >
                                            <g:message code="show.records.map.title" />
                                            <g:message code="show.records.recordCount.title" />
                                        </a>
                                    </div>

                                    <%--<div id="chartsHint">Hint: click on chart elements to view that subset of records</div>--%>

                                    <div id="charts"></div>
                                </div>
                            </div>
                        </section>

                        <section class="tab-pane" id="literature" role="tabpanel">
                            <div id="plutof-references">
                                <h2>
                                    <g:message code="show.literature.title" />
                                    <span class="plutof-references__count"></span>
                                </h2>

                                <ol class="plutof-references__list"></ol>

                                <nav class="plutof-references__pagination"></nav>
                            </div>
                        </section>

                        <section class="tab-pane" id="sequences" role="tabpanel">
                            <div id="sequences-plutof">
                                <h2>
                                    PlutoF
                                    <span class="sequences__count"></span>
                                </h2>

                                <div id="sequences-plutof-body">
                                    <div class="sequences__list result-list"></div>

                                    <div class="sequences__pagination"></div>
                                </div>
                            </div>
                        </section>

                        <section class="tab-pane" id="data-partners" role="tabpanel">
                            <div class="table-responsive">
                                <table id="data-providers-list" class="table name-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <g:message code="show.datasets.label" />
                                            </th>

                                            <th>
                                                <g:message code="show.datasets.licence" />
                                            </th>

                                            <th>
                                                <g:message code="show.map.occurrencesMap.nrRecords" />
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody></tbody>
                                </table>
                            </div>
                        </section>

                        <section class="tab-pane" id="indigenous-info" roles="tabpanel"></section>
                    </div>
                </div>
            </div><!-- end main-content -->
        </div>

        <!-- taxon-summary-thumb template -->
        <div id="taxon-summary-thumb-template" class="taxon-summary-thumb hidden-node" style="">
            <a data-toggle="lightbox"
               data-gallery="taxon-summary-gallery"
               data-parent=".taxon-summary-gallery"
               data-footer=""
               href="">
            </a>
        </div>

        <!-- thumbnail template -->
        <a
            id="taxon-thumb-template"
            class="taxon-thumb hidden-node"
            data-toggle="lightbox"
            data-gallery="main-image-gallery"
            data-footer=""
            href=""
        >
            <img src="" alt="" />
            <div class="thumb-caption caption-brief"></div>
            <div class="thumb-caption caption-detail"></div>
        </a>

        <!-- description template -->
        <div id="descriptionTemplate" class="card bie-card panel-description bie-vertical-space" style="display:none;">
            <div class="card-header">
                <h3 class="card-title title"></h3>
            </div>

            <div class="card-block">
                <p class="content"></p>
            </div>

            <div class="card-footer">
                <p class="source">
                    <g:message code="show.names.field.source" />: <span class="sourceText"></span>
                </p>

                <p class="rights">
                    <g:message code="show.overview.field.rightsHolder" />: <span class="rightsText"></span>
                </p>

                <p class="provider">
                    <g:message code="show.overview.field.providedBy" />: <a href="#" class="providedBy"></a>
                </p>
            </div>
        </div>

        <!-- sequence template -->
        <div id="sequenceTemplate" class="result hidden-node">
            <h3>
                <a href="" class="externalLink"></a>
            </h3>

            <p class="description"></p>
        </div>

        <!-- indigenous-profile-summary template -->
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

        <r:script>
            // Global var to pass GSP vars into JS file
            // @TODO replace bhl and trove with literatureSource list
            var SHOW_CONF = {
                biocacheUrl:        "${grailsApplication.config.biocache.baseURL}",
                biocacheServiceUrl: "${grailsApplication.config.contextPath}/proxy/biocache-service",
                layersServiceUrl:   "${grailsApplication.config.layersService.baseURL}",
                collectoryUrl:      "${grailsApplication.config.collectory.baseURL}",
                profileServiceUrl:  "${grailsApplication.config.profileService.baseURL}",
                imageServiceBaseUrl:"${grailsApplication.config.image.baseURL}",
                guid:               "${guid}",
                scientificName:     "${tc?.taxonConcept?.nameString ?: ''}",
                rankString:         "${tc?.taxonConcept?.rankString ?: ''}",
                taxonRankID:        "${tc?.taxonConcept?.rankID ?: ''}",
                synonymsQuery:      "${synonymsQuery.replaceAll('""','"').encodeAsJavaScript()}",
                preferredImageId:   "${tc?.imageIdentifier?: ''}",
                citizenSciUrl:      "${citizenSciUrl}",
                serverName:         "${grailsApplication.config.grails.serverURL}",
                speciesListUrl:     "${grailsApplication.config.speciesList.baseURL}",
                bieUrl:             "${grailsApplication.config.bie.baseURL}",
                alertsUrl:          "${grailsApplication.config.alerts.baseUrl}",
                remoteUser:         "${request.remoteUser ?: ''}",
                eolUrl:             "${raw(createLink(controller: 'externalSite', action: 'eol', params: [s: tc?.taxonConcept?.nameString ?: '', f:tc?.classification?.class?:tc?.classification?.phylum?:'']))}",
                genbankUrl:         "${createLink(controller: 'externalSite', action: 'genbank', params: [s: tc?.taxonConcept?.nameString ?: ''])}",
                scholarUrl:         "${createLink(controller: 'externalSite', action: 'scholar', params: [s: tc?.taxonConcept?.nameString ?: ''])}",
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
                disableLikeDislikeButton: ${authService.getUserId() ? false : true},
                userRatingHelpText: '<div><b>Up vote (<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>) an image:</b>'+
                ' Image supports the identification of the species or is representative of the species.  Subject is clearly visible including identifying features.<br /><br />'+
                '<b>Down vote (<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>) an image:</b>'+
                ' Image does not support the identification of the species, subject is unclear and identifying features are difficult to see or not visible.<br /><br /></div>',
                savePreferredSpeciesListUrl: "${createLink(controller: 'imageClient', action: 'saveImageToSpeciesList')}",
                getPreferredSpeciesListUrl: "${grailsApplication.config.speciesList.baseURL}",
                addPreferenceButton: ${authService?.getUserId() ? (authService.getUserForUserId(authService.getUserId())?.roles?.contains("ROLE_ADMIN") ? true : false) : false},
                mapOutline: ${grailsApplication.config.map.outline ?: 'false'},
                mapEnvOptions: "${grailsApplication.config.map.env?.options?:'color:' + grailsApplication.config.map.records.colour+ ';name:circle;size:4;opacity:0.8'}"
            };

            function openTab(anchor) {
                $('a[href="' + anchor + '"]').tab('show');
            }

            $(function(){
                showSpeciesPage();

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var target = $(e.target).attr("href");

                    window.location.hash = target;

                    if(target == "#records") {
                        $('#charts').html('');  //prevent multiple loads

                        <charts:biocache
                            biocacheServiceUrl="${grailsApplication.config.biocacheService.baseURL}"
                            biocacheWebappUrl="${grailsApplication.config.biocache.baseURL}"
                            q="lsid:${guid}"
                            qc="${grailsApplication.config.biocacheService.queryContext ?: ''}"
                            fq=""
                        />
                    }

                    if(target == '#overview'){
                        loadMap();
                    }
                });

                if(window.location.hash) {
                    openTab(window.location.hash);
                }
            });
        </r:script>
    </body>
</html>
