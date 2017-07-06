package au.org.ala.bie

import grails.converters.JSON

class PlutofController {
    def index() {
    }

    def doGet(String path) {
        // Yep, this is the shortest way to proxy a json get...
        def url = 'https://api.plutof.ut.ee/v1/' + path + '?' + request.queryString;
        def urlObj = new java.net.URL(url)

        def connection = urlObj.openConnection();
        connection.setRequestProperty('Accept', 'application/json')
        connection.connect()

        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line+"\n");
        }

        br.close();

        def content = sb.toString()

        render(contentType: 'text/json', text: content)
    }
}