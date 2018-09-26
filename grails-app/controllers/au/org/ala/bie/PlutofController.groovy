package au.org.ala.bie

import org.apache.commons.httpclient.HttpClient
import org.apache.commons.httpclient.HttpException
import org.apache.commons.httpclient.HttpMethod
import org.apache.commons.httpclient.methods.GetMethod


class PlutofController {
    static final HTTP_USER_AGENT = "Elurikkus/bie-hub"

    def index() {
    }

    def doGet(String path) {
        def url = "https://api.plutof.ut.ee/v1/${path}?${request.queryString}"

        HttpClient client = new HttpClient()

        HttpMethod method = new GetMethod(url)
        method.setRequestHeader("User-Agent", HTTP_USER_AGENT)
        method.setRequestHeader("Accept", "application/json,application/vnd.api+json")

        String result = "{}"
        String contentType = "text/json"

        try {
            // Execute the method.
            client.executeMethod(method)
            contentType = method.getResponseHeader("Content-Type").getValue()

            // Read the response body.
            byte[] responseBody = method.getResponseBody()
            result = new String(responseBody)

            // Deal with the response.
            // Use caution: ensure correct character encoding and is not binary data
            } catch (HttpException e) {
                log.warn "Fatal protocol violation: ${e.getMessage()}"
                e.printStackTrace()
            } catch (IOException e) {
                log.warn "Fatal transport error: ${e.getMessage()}"
                e.printStackTrace();
            } finally {
                // Release the connection.
                method.releaseConnection();
            }

            render(contentType: contentType, text: result)
        }

}
