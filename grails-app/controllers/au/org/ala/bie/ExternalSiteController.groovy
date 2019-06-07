package au.org.ala.bie

import grails.converters.JSON
import groovy.json.JsonSlurper
import org.springframework.web.servlet.support.RequestContextUtils
/**
 * Controller that proxies external webservice calls to get around cross domain issues
 * and to make consumption of services easier from javascript.
 */
class ExternalSiteController {

    def grailsApplication

    def index() {}

    def eolBase = "http://eol.org/api"

    def eol = {
        def searchString = params.s ?: ""
        def filterString  = java.net.URLEncoder.encode(params.f ?: "", "UTF-8")
        def nameEncoded = java.net.URLEncoder.encode(searchString, "UTF-8")

        def js = new JsonSlurper()
        def searchURL = "${eolBase}/search/1.0.json?q=${nameEncoded}&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=${filterString}&cache_ttl="
        def locale = RequestContextUtils.getLocale(request)

        response.setContentType("application/json")
        try {
            def jsonText = new java.net.URL(searchURL).getText("UTF-8")
            if(jsonText) {
                def json = js.parseText(jsonText)

                // get first pageId
                if(json.results) {
                    def pageId = json.results[0].id
                    def pageUrl = "${eolBase}/pages/1.0/${pageId}.json?images=00&videos=0&sounds=0&maps=0&text=2&iucn=false&subjects=overview&licenses=all&details=true&taxonomy=false&vetted=0&language=${locale}&cache_ttl="

                    def pageText = new java.net.URL(pageUrl).getText("UTF-8")
                    render pageText
                } else {
                    render ([:] as JSON)
                }
            }
        } catch (IOException | FileNotFoundException err) {
            render (["Error": err.getMessage()] as JSON)
        }
    }
}
