class UrlMappings {

	static mappings = {
        "/proxy/biocache-service/$path**" (controller: "proxy") {
            action = [GET:'doGet']
        }

        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
