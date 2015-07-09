/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){

    var sort = [].sort;

    return function(comparator, getSortable) {

        getSortable = getSortable || function(){return this;};

        var placements = this.map(function(){

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

            // Since the element itself will change position, we have
            // to have some way of storing its original position in
            // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function() {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });

    };

})();
/*
 * Copyright (C) 2012 Atlas of Living Australia
 * All Rights Reserved.
 *
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 */

// jquery.jsonp 2.3.1 (c)2012 Julian Aubourg | MIT License
// https://github.com/jaubourg/jquery-jsonp
(function(a){function b(){}function c(a){A=[a]}function d(a,b,c,d){try{d=a&&a.apply(b.context||b,c)}catch(e){d=!1}return d}function e(a){return/\?/.test(a)?"&":"?"}function D(l){function Y(a){Q++||(R(),K&&(y[M]={s:[a]}),G&&(a=G.apply(l,[a])),d(D,l,[a,t]),d(F,l,[l,t]))}function Z(a){Q++||(R(),K&&a!=u&&(y[M]=a),d(E,l,[l,a]),d(F,l,[l,a]))}l=a.extend({},B,l);var D=l.success,E=l.error,F=l.complete,G=l.dataFilter,H=l.callbackParameter,I=l.callback,J=l.cache,K=l.pageCache,L=l.charset,M=l.url,N=l.data,O=l.timeout,P,Q=0,R=b,S,T,U,V,W,X;return w&&w(function(a){a.done(D).fail(E),D=a.resolve,E=a.reject}).promise(l),l.abort=function(){!(Q++)&&R()},d(l.beforeSend,l,[l])===!1||Q?l:(M=M||h,N=N?typeof N=="string"?N:a.param(N,l.traditional):h,M+=N?e(M)+N:h,H&&(M+=e(M)+encodeURIComponent(H)+"=?"),!J&&!K&&(M+=e(M)+"_"+(new Date).getTime()+"="),M=M.replace(/=\?(&|$)/,"="+I+"$1"),K&&(P=y[M])?P.s?Y(P.s[0]):Z(P):(v[I]=c,V=a(s)[0],V.id=k+z++,L&&(V[g]=L),C&&C.version()<11.6?(W=a(s)[0]).text="document.getElementById('"+V.id+"')."+n+"()":V[f]=f,p in V&&(V.htmlFor=V.id,V.event=m),V[o]=V[n]=V[p]=function(a){if(!V[q]||!/i/.test(V[q])){try{V[m]&&V[m]()}catch(b){}a=A,A=0,a?Y(a[0]):Z(i)}},V.src=M,R=function(a){X&&clearTimeout(X),V[p]=V[o]=V[n]=null,x[r](V),W&&x[r](W)},x[j](V,U=x.firstChild),W&&x[j](W,U),X=O>0&&setTimeout(function(){Z(u)},O)),l)}var f="async",g="charset",h="",i="error",j="insertBefore",k="_jqjsp",l="on",m=l+"click",n=l+i,o=l+"load",p=l+"readystatechange",q="readyState",r="removeChild",s="<script>",t="success",u="timeout",v=window,w=a.Deferred,x=a("head")[0]||document.documentElement,y={},z=0,A,B={callback:k,url:location.href},C=v.opera;D.setup=function(b){a.extend(B,b)},a.jsonp=D})(jQuery)
/*
 * Copyright (C) 2012 Atlas of Living Australia
 * All Rights Reserved.
 *
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 */

var TROVE = {
  s: 0,
  n: 10,
  url: "http://api.trove.nla.gov.au/result?key=fvt2q0qinduian5d&zone=book&encoding=json",
  q: "",
  totalResults: 0,
  divId: '',
  nextButtonId:'',
  previousButtonId:'',
    containerDivId:''
}

function getTroveUrl(){
  return TROVE.url + '&q=' + TROVE.q + '&s=' + TROVE.s + '&n=' + TROVE.n;
}

function loadTrove(query, containerDivId, resultsDivId, previousButtonId, nextButtonId){
    TROVE.q = query;
    TROVE.containerDivId = containerDivId
    TROVE.divId = resultsDivId
    TROVE.nextButtonId =  nextButtonId;
    TROVE.previousButtonId =  previousButtonId;
    $('#'+TROVE.nextButtonId).click(function(){ troveNextPage();});
    $('#'+TROVE.previousButtonId).click(function(){ trovePreviousPage();});
    queryTrove();
}

function troveNextPage(){
    if( (TROVE.s + TROVE.n) < TROVE.totalResults){
        TROVE.s += TROVE.n;
        queryTrove();
    }
}

function trovePreviousPage(){
    if(TROVE.s > 0){
        TROVE.s -= TROVE.n;
        queryTrove();
    }
}

function queryTrove(){
    $.ajax({
        url: getTroveUrl(),
        dataType: 'jsonp',
        data: null,
        jsonp: "callback",
        success:  function(data) {
           // console.log("Success....results: " + data.response.zone[0].records.total);
            TROVE.totalResults = data.response.zone[0].records.total;
            if(TROVE.totalResults == 0){
                $('#'+TROVE.containerDivId).css({display:'none'});
            } else {
                var buff = '<div class="results-summary">Number of matches in TROVE: ' + TROVE.totalResults +'</div>'
                $.each(data.response.zone[0].records.work, function(index, value){
                    //console.log(value.title);
                    buff += '<div class="result-box">';
                    //buff +=  '<a href="' + value.troveUrl + '">';
                    buff += '<p class="titleInfo">';
                    buff += '<span class="troveIdx">';
                    buff += '<b>'+ (index + TROVE.s + 1) +'</b>.&nbsp;';
                    buff += '</span>';
                    buff += '<span class="title"><a href="' + value.troveUrl + '">' + value.title + '</a></span>';
                    buff += '</p>';
                    if(value.contributor != null){
                        buff +=  '<p class="contributors">Contributors: ';
                        var contribIdx = 0;
                        $.each(value.contributor, function(ci, cv){
                          //console.log('contributor: ' + cv);
                          if(contribIdx>0){
                            buff += '; ';
                          }
                          buff += '<span class="contributor">' + cv + '</span>';
                          contribIdx = contribIdx+1;
                        });
                        buff +=  '</p>';
                    }
                    if(value.issued != null){
                       buff +=  '<p class="dateIssued">Date issued: ' + value.issued + '</p>';
                    }
                    buff +=  '</div>';
                });
                $('#'+TROVE.divId).html(buff);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //console.log("Error....");
        }
    });
}
/*
 * Copyright (C) 2011 Atlas of Living Australia
 * All Rights Reserved.
 *
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 */

/*------------------------------------------------------------------------------------------*
 *---------------- FACET BREAKDOWN CHARTS USING THE MODULE PATTERN -------------------------*
 *------------------------------------------------------------------------------------------*/
// define a base object with the major defaults that we can inherit from (prototypically)
var baseFacetChart = {
    collectionsUrl: "http://no-default-collectory",
    biocacheServicesUrl: "http://no-default-biocache/ws",
    biocacheWebappUrl: "http://no-default-biocache",
    chartsDiv: null,  // the container for the chart
    chart: null,    // the google chart object
    width: 480,
    height: 350,
    chartArea: {left:0, top:30, width:"90%", height: "70%"},
    is3D: false,
    titleTextStyle: {color: "#555", fontName: 'Arial', fontSize: 15},
    sliceVisibilityThreshold: 0,
    legend: {position: "right"},
    chartType: "pie",
    column1DataType: 'string',
    datasets: 1,
    backgroundColor: {fill:'transparent'},
    // defaults for individual facet charts
    individualChartOptions: {
        state_conservation: {chartArea: {left:60, height: "58%"}, title: 'By state conservation status'},
        occurrence_year: {chartArea: {left:60, height: "55%"}, requestFacetName: 'decade'},
        decade: {chartArea: {left:60, height: "55%"}, responseFacetName: 'occurrence_year'},
        year: {width: 600},
        month: {width: 600},
        institution_uid: {chartArea: {left: 0, width: "100%"}},
        collection_uid: {chartArea: {left: 0, width: "100%"}},
        species_group: {title: 'By higher-level group', ignore: ['Animals'], chartType: 'column',
            width: 450, chartArea: {left:60, height:"58%"},
            vAxis: {minValue: 0, textPosition:'in', gridlines:{color: '#ddd', count: 4}},
            colors: ['#108628'], reverseCategories:true, hAxis:{slantedTextAngle:60}},
        state: {ignore: ['Unknown1']},
        type_status: {title: 'By type status (as % of all type specimens)', ignore: ['notatype']},
        el895: {hAxis: {title:'Moisture Index'}},
        el882: {hAxis: {title:'mm'}, chartArea: {width: "65%"}},
        el889: {hAxis: {title:'mm'}},
        el887: {hAxis: {title:'MJ/m2/day'}},
        el865: {hAxis: {title:'Moisture Index'}},
        el894: {hAxis: {title:'MJ/m2/day'}},
        el895Outliers: {hAxis: {title:'Moisture Index'}, chartArea: {width: "65%"}, facets: ['el895'], facetLabels: ['Precipitation'], singleFacetName : 'el895', avoidTitlePrefix:true},
        el882Outliers: {hAxis: {title:'mm'}, chartType: "scatter", chartArea: {width: "65%"}, facets: ['el882'], facetLabels: ['Precipitation'], singleFacetName : 'el882', avoidTitlePrefix:true},
        el889Outliers: {hAxis: {title:'mm'}, chartArea: {width: "65%"}, facets: ['el889'], facetLabels: ['Precipitation'], singleFacetName : 'el889', avoidTitlePrefix:true},
        el887Outliers: {hAxis: {title:'MJ/m2/day'}, chartArea: {width: "65%"}, facets: ['el887'], facetLabels: ['Precipitation'], singleFacetName : 'el887', avoidTitlePrefix:true},
        el865Outliers: {hAxis: {title:'Moisture Index'}, chartArea: {width: "65%"}, facets: ['el865'], facetLabels: ['Precipitation'], singleFacetName : 'el865', avoidTitlePrefix:true},
        el894Outliers: {hAxis: {title:'MJ/m2/day'}, chartArea: {width: "65%"}, facets: ['el894'], facetLabels: ['Precipitation'], singleFacetName : 'el894', avoidTitlePrefix:true},
        el895OutliersCumm: {hAxis: {title:'Moisture Index'}, chartArea: {width: "65%"}, facets: ['el895'], facetLabels: ['Precipitation'], singleFacetName : 'el895', avoidTitlePrefix:true},
        el882OutliersCumm: {hAxis: {title:'mm'}, chartArea: {width: "65%"}, facets: ['el882'], facetLabels: ['Precipitation'], singleFacetName : 'el882', avoidTitlePrefix:true},
        el889OutliersCumm: {hAxis: {title:'mm'}, chartArea: {width: "65%"}, facets: ['el889'], facetLabels: ['Precipitation'], singleFacetName : 'el889', avoidTitlePrefix:true},
        el887OutliersCumm: {hAxis: {title:'MJ/m2/day'}, chartArea: {width: "65%"}, facets: ['el887'], facetLabels: ['Precipitation'], singleFacetName : 'el887', avoidTitlePrefix:true},
        el865OutliersCumm: {hAxis: {title:'Moisture Index'}, chartArea: {width: "65%"}, facets: ['el865'], facetLabels: ['Precipitation'], singleFacetName : 'el865', avoidTitlePrefix:true},
        el894OutliersCumm: {hAxis: {title:'MJ/m2/day'}, chartArea: {width: "65%"}, facets: ['el894'], facetLabels: ['Precipitation'], singleFacetName : 'el894', avoidTitlePrefix:true},
        radiation: {hAxis: {title:'MJ/m2/day'}, chartArea: {width: "65%"}, facets: ['el887','el894'],
            facetLabels: ['seasonality (Bio23)','warmest quarter (Bio26)']},
        precipitation: {hAxis: {title:'mm'}, chartArea: {width: "65%"}, facets: ['el882','el889'],
            facetLabels: ['seasonality (Bio15)','driest quarter (Bio17)']},
        moisture: {hAxis: {title:'Moisture Index'}, chartArea: {width: "65%"}, facets: ['el895','el865'],
            facetLabels: ['lowest period (Bio30)','highest quarter mean (Bio32)']}
    },
    getChartTypeOptions: function (name) {
        if (this.individualChartOptions[name] !== undefined) {
            return this.individualChartOptions[name];
        } else {
            return {};
        }
    },
    // these override the facet names in chart titles
    chartLabels: {
        institution_uid: 'institution',
        data_resource_uid: 'data set',
        assertions: 'data assertion',
        biogeographic_region: 'biogeographic region',
        occurrence_year: 'decade',
        el895: 'Moisture Index - lowest period (Bio30)',
        el895Outliers: 'Moisture Index - lowest period (Bio30)',
        el895OutliersCumm: 'Moisture Index - lowest period (Bio30)',
        el882: 'Precipitation - seasonality (Bio15)',
        el882Outliers: 'Precipitation - seasonality (Bio15) - Outliers',
        el882OutliersCumm: 'Precipitation - seasonality (Bio15) - Outliers (Cumulative)',
        el889: 'Precipitation - driest quarter (Bio17)',
        el889Outliers: 'Precipitation - driest quarter (Bio17) - Outliers',
        el889OutliersCumm: 'Precipitation - driest quarter (Bio17) - Outliers (Cumulative)',
        el887: 'Radiation - seasonality (Bio23)',
        el887Outliers: 'Radiation - seasonality (Bio23) - Outliers',
        el887OutliersCumm: 'Radiation - seasonality (Bio23) - Outliers (Cumulative)',
        el865: 'Moisture Index - highest quarter mean (Bio32)',
        el865Outliers: 'Moisture Index - highest quarter mean (Bio32) - Outliers',
        el865OutliersCumm: 'Moisture Index - highest quarter mean (Bio32) - Outliers (Cumulative)',
        el894: 'Radiation - warmest quarter (Bio26)',
        el894Outliers: 'Radiation - warmest quarter (Bio26) - Outliers',
        el894OutliersCumm: 'Radiation - warmest quarter (Bio26) - Outliers (Cumulative)',
        radiation: 'Radiation',
        precipitation: 'Precipitation',
        moisture: 'Moisture'
    },
    // select the properties that need to be passed to the chart library
    googleChartOptions: function() {
        var gChartOptions = {},
            that = this;
        $.each(['width','height','chartArea','is3D','titleTextStyle','sliceVisibilityThreshold','legend',
            'hAxis','vAxis','title','colors','reverseCategories','fontSize','backgroundColor','axisTitlesPosition',
            'fontName','focusTarget','titlePosition','tooltip'], function (i,prop) {
            if (that[prop] != undefined) {
                gChartOptions[prop] = that[prop];
            }
        });
        return gChartOptions;
    },
    name: '',
    chartLabel: function () { return this.chartLabels[this.name] ? this.chartLabels[this.name] : this.name;},
    title: function () { return "By " + this.chartLabel();},
    transformData: function (data) {
        if (this.syncTransforms[this.name]) {
            return this.syncTransforms[this.name].apply(null, [data]);
        }
        return data;
    },
    syncTransforms: {
        occurrence_year: function (data) {
            var firstDecade;
            var transformedData = [];
            $.each(data, function(i,obj) {
                if (obj.label === 'before') {
                    transformedData.splice(0,0,{label: "before " + firstDecade, count: obj.count});
                }
                else {
                    var decade = obj.label.substr(0,4);
                    if (i === 0) { firstDecade = decade; }
                    transformedData.push({label: decade + "s", count: obj.count});
                }
            });
            /*// sort
             transformedData.sort(function (a,b) {
             return b.label - a.label;
             });*/
            return transformedData;
        },
        decade: function (data) {
            var firstDecade;
            var transformedData = [];
            $.each(data, function(i,obj) {
                if (obj.label === 'before') {
                    transformedData.splice(0,0,{label: "before " + firstDecade, count: obj.count});
                }
                else {
                    var decade = obj.label.substr(0,4);
                    if (i === 0) { firstDecade = decade; }
                    transformedData.push({label: decade + "s", count: obj.count});
                }
            });
            /*// sort
             transformedData.sort(function (a,b) {
             return b.label - a.label;
             });*/
            return transformedData;
        },
        year: function (data) {
            var year, firstYear = 3000, lastYear = 0, dataMap = {}, transformedData = [];
            $.each(data, function(i,obj) {
                year = obj.label;
                if (Number(year) < firstYear) { firstYear = Number(year); }
                if (Number(year) > lastYear) { lastYear = Number(year); }
                dataMap[year] = obj.count;
            });
            if (firstYear > lastYear) { return [] }  // no data
            for (y = firstYear; y <= lastYear; y++) {
                transformedData.push({label: "" + y, count: dataMap["" + y] || 0});
            }
            return transformedData;
        }
    },
    formatLabel: function (data) {
        if (this.labelFormatters[this.name]) {
            return this.labelFormatters[this.name].apply(null, [data]);
        }
        return data;
    },
    labelFormatters: {
        month: function (data) {
            return transformMonthData(data);
        }
    },
    transformDataAfter: function (dataTable, opts) {
        var ts = this.asyncTransforms[this.name];
        if (ts) {
            ts.method.apply(null, [this.chart, dataTable, opts, ts.param]);
        }
    },
    asyncTransforms: {
        collection_uid: {method: lookupEntityNameFromUids, param: 'collection'},
        institution_uid: {method: lookupEntityNameFromUids, param: 'institution'},
        data_resource_uid: {method: lookupEntityNameFromUids, param: 'dataResource'}
    },
    setType: function (type) {
        this.chartType = type;
    },
    // create the chart
    init: function (data, options) {
        var name = this.name,
            specificOptions = options[name];

        // add the default title
        if(options.avoidTitlePrefix !== "undefined" && options.avoidTitlePrefix){
            this.title =  this.chartLabel();
        } else {
            this.title = "By " + this.chartLabel();
        }

        // apply chart-specific and user-defined options and user-defined individual chart options
        var opts = $.extend(true, {}, this.getChartTypeOptions(name), options, options[name] || {});
        for (var prop in opts) {
            if (opts.hasOwnProperty(prop)) {
                //alert(typeof opts[prop]);
                if (typeof opts[prop] === 'object' && !$.isArray(opts[prop])) {
                    // deep copy first nested level preserving existing values that are not explicitly overridden
                    for (var p in opts[prop]) {
                        if (opts[prop].hasOwnProperty(p)) {
                            // create the object if it doesn't exist
                            if (this[prop] === undefined) {
                                this[prop] = {};
                            }
                            this[prop][p] = opts[prop][p];
                        }
                    }
                } else {
                    this[prop] = opts[prop];
                }
            }
        }
        this.chartsDiv = $('#' + (this.chartsDiv || 'charts'));

        // preserve context for callback
        var that = this;

        // build the table
        var dataTable = this.buildDataTable(name, data, options);

        // reject the chart if there is only one facet value (after filtering)
        if (dataTable.getNumberOfRows() < 2) {
            return;
        }

        // create the container
        var $container = $('#' + name);
        if ($container.length == 0) {
            $container = $("<div id='" + name + "'></div>");
            this.chartsDiv.append($container);
        }

        // specify the type (for css tweaking)
        $container.addClass('chart-' + this.chartType);

        // create the chart
        switch (this.chartType) {
            case 'column': this.chart = new google.visualization.ColumnChart($container[0]); break;
            case 'bar': this.chart = new google.visualization.BarChart($container[0]); break;
            case 'line': this.chart = new google.visualization.LineChart($container[0]); break;
            case 'scatter': this.chart = new google.visualization.ScatterChart($container[0]); break;
            default: this.chart = new google.visualization.PieChart($container[0]); break;
        }

        // show the chart state
        this.chart.draw(dataTable, this.googleChartOptions());

        // kick off post-draw asynch actions (clone the opts as these objects are not as independent as they are meant to be)
        this.transformDataAfter(dataTable, $.extend(true, {}, this.googleChartOptions()));

        // setup a click handler - if requested
        if (this.clickThru != false) {  // defaults to true
            google.visualization.events.addListener(this.chart, 'select', function() {

                // default facet value is the name selected
                var id = dataTable.getValue(that.chart.getSelection()[0].row,0);

                // build the facet query
                var facetQuery = name + ":" + id;

                // the facet query can be overridden for date ranges
                if (name == 'occurrence_year' || name == 'decade') {
                    if (id.match("^before") == 'before') { // startWith
                        facetQuery = "occurrence_year:[*%20TO%20" + "1849-12-31T23:59:59Z]";
                    }
                    else {
                        var decade = id.substr(0,4);
                        var dateTo = parseInt(decade) + 9;
                        facetQuery = "occurrence_year:[" + decade + "-01-01T00:00:00Z%20TO%20" +
                            dateTo + "-12-31T23:59:59Z]";
                    }
                }

                // show the records
                document.location = urlConcat(biocacheWebappUrl,"/occurrences/search?q=") + that.query +
                    "&fq=" + facetQuery;
            });
        }
    },
    buildDataTable: function (name, data, options) {
        this.column1DataType = this.column1 || 'string';

        // preserve context for callback
        var that = this;

        // deduce the fieldName used in the data
        //var fieldName = this.getChartTypeOptions(name).responseFacetName || name;

        // optionally transform the data
        var facetData = data[name];
        if(that.singleFacetName !== "undefined" && that.singleFacetName != null){
            //console.log('########Transform data using singleFacetName : ' + that.singleFacetName );
            facetData = data[that.singleFacetName];
        }

        var xformedData = this.transformData(facetData);

        // optionally format the labels
        xformedData = this.formatLabel(xformedData);

        // create the data table
        var dataTable = new google.visualization.DataTable(), dataOptions = this.getChartTypeOptions(name);
        if (dataOptions && dataOptions.facets && options.outlierValues == "undefined") {
            // add a y-value column for each facet
            dataTable.addColumn(this.column1DataType, this.chartLabel());
            for (var i = 0; i < dataOptions.facets.length; i++) {
                dataTable.addColumn('number', dataOptions.facetLabels ? dataOptions.facetLabels[i] : this.chartLabel());
            }
        } else if (options.outlierValues !== undefined) {
            dataTable.addColumn('number', this.chartLabel());
            dataTable.addColumn('number','records');
            dataTable.addColumn('number','outliers');
            dataTable.addColumn('number','this record (outlier)');

        } else if (this.column1DataType == 'number') {
            //console.log('building datatable "number" ');
            dataTable.addColumn('number', this.chartLabel());
            dataTable.addColumn('number','records');

        } else {
            //console.log('building datatable else ');
            dataTable.addColumn('string', this.chartLabel());
            dataTable.addColumn('number','records');
        }

        if (dataOptions && dataOptions.facets && dataOptions.facets.length > 1) {
            // munge data from 2 facets TODO: only handles 2 facets here
            var facet1 = data[dataOptions.facets[0]],
                facet2 = data[dataOptions.facets[1]],
                xValue,
                rowIndexes;

            $.each(facet1, function (i,obj) {
                dataTable.addRow([parseFloat(obj.label), obj.count, null]);
            });
            $.each(facet2, function (i,obj) {
                xValue = parseFloat(obj.label);
                // see if this x value already has a row in the table
                rowIndexes = dataTable.getFilteredRows([{column: 1, value: xValue}]);
                if (rowIndexes.length > 0) {
                    // if so just set the second value
                    dataTable.setCell(rowIndexes[0], 3, obj.count);
                } else {
                    // create a new row with null as the first value
                    dataTable.addRow([parseFloat(obj.label), null, obj.count]);
                }
            });

        } else if(options.outlierValues !== undefined) {

            //console.log('building datatable -  handle each data item');
            // handle each data item
            // //console.log('xformedData : ' + xformedData);

            $.each(xformedData, function(i,obj) {
                // filter any crap
                //console.log('building datatable -  obj.label: ' + obj.label);
                if (that.ignore !== "undefined" || $.inArray(obj.label, that.ignore) == -1) {
                    //console.log('building datatable -  crap filtered');

                    if (detectCamelCase(obj.label)) {
                        dataTable.addRow([{v: obj.label, f: capitalise(expandCamelCase(obj.label))}, obj.count, null,null]);
                    } else if (that.column1DataType === 'number') {

                        ////console.log('inArray: ' + $.inArray(obj.label, options.outlierValues));

                        if (options.highlightedValue !== undefined && obj.label == options.highlightedValue){
                            dataTable.addRow([parseFloat(obj.label), null, null, obj.count]);
                        } else if($.inArray(parseFloat(obj.label), options.outlierValues) >= 0){
                            dataTable.addRow([parseFloat(obj.label), null, obj.count, null]);
                        } else {
                            dataTable.addRow([parseFloat(obj.label), obj.count, null,null])
                        }
                    } else {
                        dataTable.addRow([parseFloat(obj.label), obj.count, null,null]);
                    }
                }
            });

        } else {
            // handle each data item
            $.each(xformedData, function(i,obj) {
                var labelObj, label, formattedLabel, value;
                // filter any crap
                if (that.ignore == undefined || $.inArray(obj.label, that.ignore) == -1) {
                    // set std values
                    label = obj.label;
                    formattedLabel = obj.formattedLabel;
                    value = obj.count;

                    // handle camelCase labels
                    if (detectCamelCase(label)) {
                        formattedLabel = capitalise(expandCamelCase(label));
                    }

                    // handle numeric labels
                    if (that.column1DataType === 'number') {
                        label = parseFloat(label);
                    }

                    // inject formatted labels if available
                    if (formattedLabel !== undefined) {
                        labelObj = {v: label, f: formattedLabel};
                    } else {
                        labelObj = label;
                    }

                    // add the row
                    dataTable.addRow([labelObj, value]);
                }
            });
        }

        return dataTable;
    },
    newChart: function(options) {
        if(typeof Object.create !== 'function'){
            Object.create = function(o){
                var F = function(){};
                F.prototype = o;
                return new F();
            };
        }
        var that = Object.create(this);
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                that[prop] = options[prop];
            }
        }
        return that;
    }

};
// create charts specific for a chart type - by differential inheritance
// NOTE a new object is created and returned each time these are referenced
var facetChartTypes = {
    pie: function () { return baseFacetChart.newChart({chartType: 'pie'}); },
    bar: function () {
        var chartArea = baseFacetChart.chartArea;
        chartArea.left = 170;
        return baseFacetChart.newChart({chartType: 'bar', chartArea: chartArea});
    },
    column: function () {
        var chartArea = baseFacetChart.chartArea;
        chartArea.left = 60;
        chartArea.height = "58%";
        return baseFacetChart.newChart({chartType: 'column', width: 450, chartArea: chartArea,
            hAxis: {slantedText: true}, legend: 'none'});
    },
    scatter: function () {
        var chartArea = baseFacetChart.chartArea;
        chartArea.left = 60;
        chartArea.height = "65%";
        return baseFacetChart.newChart({chartType: 'scatter', vAxis: {title:'count'}, chartArea: chartArea,
            column1: 'number'})
    }
}

var defaultChartTypes = {
    state: 'pie',
    institution: 'pie',
    data_resource_uid: 'pie',
    type_status: 'pie',
    species_group: 'pie',
    assertions: 'bar',
    occurrence_year: 'column',
    decade: 'column',
    year: 'column',
    month: 'column',
    biogeographic_region: 'pie',
    state_conservation: 'column',
    el895: 'scatter',
    el882: 'scatter',
    el882OutliersCumm: 'scatter',
    el882Outliers: 'scatter',
    el887: 'scatter',
    el887Outliers: 'scatter',
    el887OutliersCumm: 'scatter',
    el889: 'scatter',
    el889Outliers: 'scatter',
    el889OutliersCumm: 'scatter',
    el865: 'scatter',
    el865Outliers: 'scatter',
    el865OutliersCumm: 'scatter',
    el894: 'scatter',
    el894Outliers: 'scatter',
    el894OutliersCumm: 'scatter',
    radiation: 'scatter',
    precipitation: 'scatter',
    moisture: 'scatter'
}

// object to handle multiple facets charts from the same data request
var facetChartGroup = {
    // define a constructor for facet charts
    createChart: function (name, options, data) {
        // choose a chart type to instantiate
        var baseChart = (options[name] && options[name].chartType) ?
            options[name].chartType :
            (defaultChartTypes[name] || 'pie');

        var that = facetChartTypes[baseChart]();

        that.name = name;

        that.init(data, options);

        // return the new chart
        return that;
    },
    // this handles substitution of facet names where they are different to the chart name
    // and where charts require more than one facet
    buildFacetsFromChartName: function (name) {
        var facetNames = [name];

        // handle multiple and transformed facets
        var dataOptions = baseFacetChart.individualChartOptions[name];
        if (dataOptions && dataOptions.facets) {
            facetNames = dataOptions.facets;
        }

        return '&facets=' + facetNames.join('&facets=');
    },
    // create a set of facets charts - requesting the data
    loadAndDrawFacetCharts: function (options) {
        // the base url for getting the facet data
        var url = (options.biocacheServicesUrl == undefined) ? baseFacetChart.biocacheServicesUrl : options.biocacheServicesUrl,

            facets = "",

        // calc the target div
            chartsDiv = $('#' + (options.chartsDiv ? options.chartsDiv : baseFacetChart.chartsDiv)),

        // reference to this that we can use in callbacks
            that = this;

        // build facets list
        $.each(options.charts, function(i,name) {
            facets += that.buildFacetsFromChartName(name)
        });

        // show a message while requesting data
        chartsDiv.append($("<span>Loading charts...</span>"));

        // make request
        $.ajax({
            url: urlConcat(url, "/occurrences/search.json?pageSize=0&flimit=200&q=") + options.query + facets,
            dataType: 'jsonp',
            error: function() {
                cleanUp(); // TODO:
            },
            success: function(data) {

                // clear loading message
                chartsDiv.find('span').remove();

                // draw all charts
                that.drawFacetCharts(data, options);

            }
        });
    },
    // create a set of facets charts - given the data
    drawFacetCharts: function (data, options) {
        // check that we have results
        if (data.length == 0 || data.totalRecords == undefined || data.totalRecords == 0) {
            return;
        }

        // update total if requested
        if (options.totalRecordsSelector) {
            $(options.totalRecordsSelector).html(addCommas(data.totalRecords));
        }

        //if the chart is Cumulative, keep a running total
        if(options.cumulative !== undefined && options.cumulative){
            var runningTotal = 0;
            for(var i = 0; i < data.facetResults[0].fieldResult.length; i++){

                runningTotal += data.facetResults[0].fieldResult[i].count;
                data.facetResults[0].fieldResult[i].count = runningTotal;

                //console.log(data.facetResults[0].fieldResult[i].label +": total, " + runningTotal);
            }
        }

        // transform facet results list into map keyed on facet name
        var facetMap = {};
        $.each(data.facetResults, function(idx, obj) {
            facetMap[obj.fieldName] = obj.fieldResult;
        });

        // draw the charts
        var chartsDiv = $('#' + (options.targetDivId ? options.targetDivId : 'charts')),
            query = options.query,
            that = this;
        $.each(options.charts, function(index, name) {
            that.createChart(name, options, facetMap);
        });
    }
};

// create a set of facets charts - requesting the data
var loadAndDrawFacetCharts = function (options) {
    // the base url for getting the facet data
    var url = (options.biocacheServicesUrl == undefined) ? baseFacetChart.biocacheServicesUrl : options.biocacheServicesUrl,

    // build the required facet set
        facets = options.charts.join('&facets='),

    // calc the target div
        chartsDiv = $('#' + (options.chartsDiv ? options.chartsDiv : baseFacetChart.chartsDiv));

    // show a message while requesting data
    chartsDiv.append($("<span>Loading charts...</span>"));

    // make request
    $.ajax({
        url: urlConcat(url, "/occurrences/search.json?pageSize=0&q=") + options.query + "&facets=" + facets,
        dataType: 'jsonp',
        error: function() {
            cleanUp(); // TODO:
        },
        success: function(data) {

            // clear loading message
            chartsDiv.find('span').remove();

            // draw all charts
            drawFacetCharts(data, options);

        }
    });
};

//function
/*------------------------- RECORD BREAKDOWN CHARTS ------------------------------*/

/***** external services & links *****/
// an instance of the collections app - used for name lookup services
var collectionsUrl = "http://collections.ala.org.au";  // should be overridden from config by the calling page
// an instance of the biocache web services app - used for facet and taxonomic breakdowns
var biocacheServicesUrl = "http://biocache.ala.org.au/ws";  // should be overridden from config by the calling page
// an instance of a web app - used to display search results
var biocacheWebappUrl = "http://biocache.ala.org.au";  // should be overridden from config by the calling page

// defaults for taxa chart
var taxonomyPieChartOptions = {
    width: 480,
    height: 350,
    chartArea: {left:0, top:30, width:"100%", height: "70%"},
    is3D: false,
    titleTextStyle: {color: "#555", fontName: 'Arial', fontSize: 15},
    sliceVisibilityThreshold: 0,
    legend: "right",
    backgroundColor: {fill :'transparent'}
};

// defaults for facet charts
var genericChartOptions = {
    width: 480,
    height: 350,
    chartArea: {left:0, top:30, width:"100%", height: "70%"},
    is3D: false,
    titleTextStyle: {color: "#555", fontName: 'Arial', fontSize: 15},
    sliceVisibilityThreshold: 0,
    legend: "right",
    chartType: "pie",
    backgroundColor: {fill :'transparent'}
};

// defaults for individual facet charts
var individualChartOptions = {
    state_conservation: {chartType: 'column', width: 450, chartArea: {left:60, height: "58%"},
        title: 'By state conservation status', hAxis: {slantedText: true}},
    occurrence_year: {chartType: 'column', width: 450, chartArea: {left:60, height: "65%"}, hAxis: {slantedText: true}},
    species_group: {title: 'By higher-level group', ignore: ['Animals']},
    state: {ignore: ['Unknown1']},
    type_status: {title: 'By type status (as % of all type specimens)', ignore: ['notatype']},
    assertions: {chartType: 'bar', chartArea: {left:170}}
};

/*----------------- FACET-BASED CHARTS USING DIRECT CALLS TO BIO-CACHE SERVICES ---------------------*/
// these override the facet names in chart titles
var chartLabels = {
    institution_uid: 'institution',
    data_resource_uid: 'data set',
    assertions: 'data assertion',
    biogeographic_region: 'biogeographic region',
    occurrence_year: 'decade'
}
// asynchronous transforms are applied after the chart is drawn, ie the chart is drawn with the original values
// then redrawn when the ajax call for transform data returns
var asyncTransforms = {
// facet data now has entitiy names in label
//    collection_uid: {method: 'lookupEntityName', param: 'collection'},
//    institution_uid: {method: 'lookupEntityName', param: 'institution'},
//    data_resource_uid: {method: 'lookupEntityName', param: 'dataResource'}
}
// synchronous transforms are applied to the json data before the data table is built
var syncTransforms = {
    collection_uid: {method: 'transformFqData'},
    institution_uid: {method: 'transformFqData'},
    data_resource_uid: {method: 'transformFqData'},
    occurrence_year: {method: 'transformDecadeData'},
    month: {method: 'transformMonthData'}/*,
     assertions: {method: 'expandCamelCase'}*/
}

/********************************************************************************\
 * Ajax request for charts based on the facets available in the biocache breakdown.
 \********************************************************************************/
function loadFacetCharts(chartOptions) {
    if (chartOptions.collectionsUrl != undefined) { collectionsUrl = chartOptions.collectionsUrl; }
    if (chartOptions.biocacheServicesUrl != undefined) { biocacheServicesUrl = chartOptions.biocacheServicesUrl; }
    if (chartOptions.biocacheWebappUrl != undefined) { biocacheWebappUrl = chartOptions.biocacheWebappUrl; }
    if (chartOptions.displayRecordsUrl != undefined) { biocacheWebappUrl = chartOptions.displayRecordsUrl; }

    var chartsDiv = $('#' + (chartOptions.targetDivId ? chartOptions.targetDivId : 'charts'));
    chartsDiv.append($("<span>Loading charts...</span>"));
    var query = chartOptions.query ? chartOptions.query : buildQueryString(chartOptions.instanceUid);
    $.ajax({
        url: urlConcat(biocacheServicesUrl, "/occurrences/search.json?pageSize=0&q=") + query,
        dataType: 'jsonp',
        error: function() {
            cleanUp();
        },
        success: function(data) {

            // clear loading message
            chartsDiv.find('span').remove();

            // draw all charts
            drawFacetCharts(data, chartOptions);

        }
    });
}
function cleanUp(chartOptions) {
    $('img.loading').remove();
    if (chartOptions != undefined && chartOptions.error) {
        window[chartOptions.error]();
    }
}
/*********************************************************************\
 * Loads charts based on the facets declared in the config object.
 * - does not require any markup other than div#charts element
 \*********************************************************************/
function drawFacetCharts(data, chartOptions) {
    // check that we have results
    if (data.length == 0 || data.totalRecords == undefined || data.totalRecords == 0) {
        return;
    }

    // update total if requested
    if (chartOptions.totalRecordsSelector) {
        $(chartOptions.totalRecordsSelector).html(addCommas(data.totalRecords));
    }

    // transform facet results into map
    var facetMap = {};
    $.each(data.facetResults, function(idx, obj) {
        facetMap[obj.fieldName] = obj.fieldResult;
    });

    // draw the charts
    var chartsDiv = $('#' + (chartOptions.targetDivId ? chartOptions.targetDivId : 'charts'));
    var query = chartOptions.query ? chartOptions.query : buildQueryString(chartOptions.instanceUid);
    $.each(chartOptions.charts, function(index, name) {
        if (facetMap[name] != undefined) {
            buildGenericFacetChart(name, facetMap[name], query, chartsDiv, chartOptions);
        }
    });
}
/************************************************************\
 * Create and show a generic facet chart
 \************************************************************/
function buildGenericFacetChart(name, data, query, chartsDiv, chartOptions) {

    // resolve chart label
    var chartLabel = chartLabels[name] ? chartLabels[name] : name;

    // resolve the chart options
    var opts = $.extend({}, genericChartOptions);
    opts.title = "By " + chartLabel;  // default title
    var individualOptions = individualChartOptions[name] ? individualChartOptions[name] : {};
    // merge generic, individual and user options
    opts = $.extend(true, {}, opts, individualOptions, chartOptions[name]);
    //Dumper.alert(opts);

    // optionally transform the data
    var xformedData = data;
    if (syncTransforms[name]) {
        xformedData = window[syncTransforms[name].method](data);
    }

    // create the data table
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', chartLabel);
    dataTable.addColumn('number','records');
    $.each(xformedData, function(i,obj) {
        // filter any crap
        if (opts == undefined || opts.ignore == undefined || $.inArray(obj.label, opts.ignore) == -1) {
            if (detectCamelCase(obj.label)) {
                dataTable.addRow([{v: obj.label, f: capitalise(expandCamelCase(obj.label))}, obj.count]);
            }
            else if (obj.formattedLabel) {
                dataTable.addRow([{v: obj.label, f: obj.formattedLabel}, obj.count]);
            }
            else {
                dataTable.addRow([obj.label, obj.count]);
            }
        }
    });

    // reject the chart if there is only one facet value (after filtering)
    if (dataTable.getNumberOfRows() < 2) {
        return;
    }

    // create the container
    var $container = $('#' + name);
    if ($container.length == 0) {
        $container = $("<div id='" + name + "'></div>");
        chartsDiv.append($container);
    }

    // specify the type (for css tweaking)
    $container.addClass('chart-' + opts.chartType);

    // create the chart
    var chart;
    switch (opts.chartType) {
        case 'column': chart = new google.visualization.ColumnChart(document.getElementById(name)); break;
        case 'bar': chart = new google.visualization.BarChart(document.getElementById(name)); break;
        default: chart = new google.visualization.PieChart(document.getElementById(name)); break;
    }

    chart.draw(dataTable, opts);

    // kick off post-draw asynch actions
    if (asyncTransforms[name]) {
        window[asyncTransforms[name].method](chart, dataTable, opts, asyncTransforms[name].param);
    }

    // setup a click handler - if requested
    if (chartOptions.clickThru != false) {  // defaults to true
        google.visualization.events.addListener(chart, 'select', function() {

            // default facet value is the name selected
            var id = dataTable.getValue(chart.getSelection()[0].row,0);

            // build the facet query
            //var facetQuery = name + ":" + id;
            var facetQuery;

            if (id.indexOf(name) != -1) {
                // fq provided in facet results
                facetQuery = id;
            } else {
                facetQuery = name + ":" + id;
            }

            // the facet query can be overridden for date ranges
            if (name == 'occurrence_year') {
                if (id.match("^before") == 'before') { // startWith
                    facetQuery = "occurrence_year:[*%20TO%20" + "1850" + "-01-01T12:00:00Z]";
                }
                else {
                    var decade = id.substr(0,4);
                    var dateTo = parseInt(decade) + 10;
                    facetQuery = "occurrence_year:[" + decade + "-01-01T12:00:00Z%20TO%20" + dateTo + "-01-01T12:00:00Z]";
                }
            }

            // show the records
            document.location = urlConcat(biocacheWebappUrl,"/occurrences/search?q=") + query +
                "&fq=" + facetQuery;
        });
    }
}

/*---------------------- DATA TRANSFORMATION METHODS ----------------------*/
function transformDecadeData(data) {
    var firstDecade;
    var transformedData = [];
    $.each(data, function(i,obj) {
        if (obj.label == 'before') {
            transformedData.splice(0,0,{label: "before " + firstDecade, count: obj.count});
        }
        else {
            var decade = obj.label.substr(0,4);
            if (i == 0) { firstDecade = decade; }
            transformedData.push({label: decade + "s", count: obj.count});
        }
    });
    return transformedData;
}
function transformMonthData(data) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        monthIdx;
    $.each(data, function(i,obj) {
        monthIdx = parseInt(obj.label, 10); // months values "01" need parsing to int
        obj.formattedLabel = months[monthIdx - 1];
    });
    return data;
}
function transformFqData(data) {
    $.each(data, function(i,obj) {
        // substitute label for fq data if present
        if (obj.fq) {
            obj.formattedLabel = obj.label;
            obj.label = obj.fq;
        }
    });
    return data;
}
/*--------------------- LABEL TRANSFORMATION METHODS ----------------------*/
function detectCamelCase(name) {
    return /[a-z][A-Z]/.test(name);
}
function expandCamelCase(name) {
    return name.replace(/([a-z])([A-Z])/g, function(s, str1, str2){return str1 + " " + str2.toLowerCase();});
}
/* capitalises the first letter of the passed string */
function capitalise(item) {
    return item.replace(/^./, function(str){ return str.toUpperCase(); })
}
function lookupEntityName(chart, table, opts, entity) {
    var uidList = [];
    for (var i = 0; j = table.getNumberOfRows(), i < j; i++) {
        uidList.push(table.getValue(i,0));
    }
    $.jsonp({
        url: collectionsUrl + "/ws/resolveNames/" + uidList.join(',') + "?callback=?",
        cache: true,
        success: function(data) {
            for (var i = 0;j + table.getNumberOfRows(), i < j; i++) {
                var uid = table.getValue(i,0);
                table.setCell(i, 0, uid, data[uid]);
            }
            chart.draw(table, opts);
        },
        error: function(d,msg) {
            alert(msg);
        }
    });
}
// does name lookup from uids and transforms data table
function lookupEntityNameFromUids (chart, table, opts) {
    var uidList = [];
    for (var i = 0; j = table.getNumberOfRows(), i < j; i++) {
        uidList.push(table.getValue(i,0));
    }
    $.jsonp({
        url: collectionsUrl + "/ws/resolveNames/" + uidList.join(',') + "?callback=?",
        cache: true,
        success: function(data) {
            for (var i = 0;j + table.getNumberOfRows(), i < j; i++) {
                var uid = table.getValue(i,0);
                table.setCell(i, 0, uid, data[uid]);
            }
            chart.draw(table, opts);
        },
        error: function(d,msg) {
            alert(msg);
        }
    });
}


/*------------------------------------------------------------------------------------------*
 *----------- TAXONOMY BREAKDOWN CHARTS USING DIRECT CALLS TO BIO-CACHE SERVICES -----------*
 *------------------------------------------------------------------------------------------*/
// works for uid-based queries or q/fq general queries

var taxonomyChart = {
    // the base query that defines the full set of records being analysed
    baseQuery: "",
    // the active query - base plus any non-taxonomic restrictions such as date range
    query: "",
    // the rank of the current subset being displayed
    rank: undefined,
    // the name of the current subset being displayed
    name: undefined,
    // threshold - used when no rank+name given
    threshold: undefined,
    // chart configuration
    chartOptions: {},
    // history of chart state
    historyState: [],
    hasState: function () { return this.historyState.length > 0; },
    pushState: function () {
        this.historyState.push({rank:this.rank, name:this.name});
    },
    popState: function () {
        return this.hasState() ? this.historyState.pop() : {};
    },
    cleanUp: function () {
        $('img.loading').remove();
        if (this.chartOptions != undefined && this.chartOptions.error) {
            window[this.chartOptions.error]();
        }
    },
    // loads a new chart with the passed configuration
    load: function (chartOptions) {
        var thisChart = this;

        if (chartOptions) {
            this.chartOptions = chartOptions;

            if (chartOptions.collectionsUrl != undefined) { collectionsUrl = chartOptions.collectionsUrl; }
            if (chartOptions.biocacheServicesUrl != undefined) { biocacheServicesUrl = chartOptions.biocacheServicesUrl; }
            if (chartOptions.displayRecordsUrl != undefined) { biocacheWebappUrl = chartOptions.displayRecordsUrl; }

            this.baseQuery = chartOptions.query ? chartOptions.query : buildQueryString(chartOptions.instanceUid);
            this.query = this.baseQuery + (chartOptions.subquery ? chartOptions.subquery : '');

            this.rank = chartOptions.rank;
            this.name = chartOptions.name;
            this.threshold = chartOptions.threshold;
        }

        var url = urlConcat(biocacheServicesUrl, "/breakdown.json?q=") + this.query;

        // add url params to set state
        if (this.rank) {
            url += "&rank=" + this.rank + (this.name ? "&name=" + this.name: "");
        }
        else {
            url += "&max=" + (this.threshold ? this.threshold : '55');
        }

        $.ajax({
            url: url,
            dataType: 'jsonp',
            timeout: 30000,
            complete: function(jqXHR, textStatus) {
                if (textStatus == 'timeout') {
                    alert('Sorry - the request was taking too long so it has been cancelled.');
                }
                if (textStatus == 'error') {
                    alert('Sorry - the chart cannot be redrawn due to an error.');
                }
                if (textStatus != 'success') {
                    thisChart.cleanUp();
                }
            },
            success: function(data) {
                // check for errors
                if (data != undefined && data.taxa.length > 0) {
                    // draw the chart
                    thisChart.draw(data);
                }
            }
        });
    },
    draw: function (data) {
        var thisChart = this;

        // create the data table
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', chartLabels[name] ? chartLabels[name] : name);
        dataTable.addColumn('number','records');
        $.each(data.taxa, function(i,obj) {
            dataTable.addRow([obj.label, obj.count]);
        });

        // resolve the chart options
        var opts = $.extend({}, taxonomyPieChartOptions);
        opts = $.extend(true, opts, this.chartOptions);
        opts.title = opts.name ? opts.name + " records by " + data.rank : "By " + data.rank;

        // create the outer div that will contain the chart and the additional links
        var $outerContainer = $('#taxa');
        if ($outerContainer.length == 0) {
            $outerContainer = $('<div id="taxa"></div>'); // create it
            $outerContainer.css('margin-bottom','-50px');
            var chartsDiv = $('div#' + (this.chartOptions.targetDivId ? this.chartOptions.targetDivId : 'charts'));
            // append it
            chartsDiv.prepend($outerContainer);
        }

        // create the chart container if not already there
        var $container = $('#taxaChart');
        if ($container.length == 0) {
            $container = $("<div id='taxaChart' class='chart-pie'></div>");
            $outerContainer.append($container);
        }

        // create the chart
        var chart = new google.visualization.PieChart(document.getElementById('taxaChart'));

        // notify any listeners
        if (this.chartOptions.notifyChange) {
            window[this.chartOptions.notifyChange](this.rank, this.name);
        }

        // draw the chart
        chart.draw(dataTable, opts);

        // draw the back button / instructions
        var $backLink = $('#backLink');
        if ($backLink.length == 0) {
            $backLink = $('<div class="link" id="backLink">&laquo; Previous rank</div>').appendTo($outerContainer);  // create it
            $backLink.css('position','relative').css('top','-75px');
            $backLink.click(function() {
                // only act if link was real
                if (!$backLink.hasClass('link')) return;

                // show spinner while loading
                $container.append($('<img class="loading" style="position:absolute;left:130px;top:220px;z-index:2000" ' +
                    'alt="loading..." src="' + collectionsUrl + '/images/ala/ajax-loader.gif"/>'));

                // get state from history
                var previous = thisChart.popState();

                // set new chart state
                taxonomyChart.rank = previous.rank;
                taxonomyChart.name = previous.name;

                // redraw chart
                thisChart.load();
            });
        }
        if (this.hasState()) {
            // show the prev link
            $backLink.html("&laquo; Previous rank").addClass('link');
        }
        else {
            // show the instruction
            $backLink.html("Click a slice to drill into the next taxonomic level.").removeClass('link');
        }

        // draw records link
        var $recordsLink = $('#recordsLink');
        if ($recordsLink.length == 0) {
            $recordsLink = $('<div class="link under" id="recordsLink">View records</div>').appendTo($outerContainer);  // create it
            $recordsLink.css('position','relative').css('top','-75px');
            $recordsLink.click(function () {
                thisChart.showRecords();  // called explicitly so we have the correct 'this' context
            });
        }

        // set link text
        if (this.hasState()) {
            $recordsLink.html('View records for ' + this.rank + ' ' + this.name);
        }
        else {
            $recordsLink.html('View all records');
        }

        // setup a click handler - if requested
        var clickThru = this.chartOptions.clickThru == undefined ? true : this.chartOptions.clickThru;  // default to true
        var drillDown = this.chartOptions.drillDown == undefined ? true : this.chartOptions.drillDown;  // default to true
        if (clickThru || drillDown) {
            google.visualization.events.addListener(chart, 'select', function() {

                // find out what they clicked
                var name = dataTable.getValue(chart.getSelection()[0].row,0);

                /* DRILL DOWN */
                if (drillDown && data.rank != "species") {
                    // show spinner while loading
                    $container.append($('<img class="loading" style="position:absolute;left:130px;top:220px;z-index:2000" ' +
                        'alt="loading..." src="' + collectionsUrl + '/images/ala/ajax-loader.gif"/>'));

                    // save current state as history - for back-tracking
                    thisChart.pushState();

                    // set new chart state
                    thisChart.rank = data.rank;
                    thisChart.name = name;

                    // redraw chart
                    thisChart.load();
                }

                /* SHOW RECORDS */
                else if (clickThru) {
                    // show occurrence records
                    document.location = urlConcat(biocacheWebappUrl, "/occurrences/search?q=") + query +
                        "&fq=" + data.rank + ":" + name;
                }
            });
        }
    },
    showRecords: function () {
        // show occurrence records
        var fq = "";
        if (this.rank != undefined && this.name != undefined) {
            fq = "&fq=" + this.rank + ":" + this.name;
        }
        document.location = urlConcat(biocacheWebappUrl, "/occurrences/search?q=") +
            this.query + fq;
    },
    reset: function () {
        if (this.hasState()) {
            var firstState = this.historyState[0];

            // this is a bit rubbish - the common code should be pulled out
            // set new chart state
            this.rank = firstState.rank;
            this.name = firstState.name;
        }

        // remove any non-taxonomic restrictions
        this.query = this.baseQuery;

        // redraw chart
        this.load();
    },
    updateQuery: function (query) {
        this.query = query;
        this.load();
    }
};

/*------------------------- TAXON TREE -----------------------------*/
function initTaxonTree(treeOptions) {
    var query = treeOptions.query ? treeOptions.query : buildQueryString(treeOptions.instanceUid);

    var targetDivId = treeOptions.targetDivId ? treeOptions.targetDivId : 'tree';
    var $container = $('#' + targetDivId);
    var title = treeOptions.title || 'Explore records by taxonomy';
    if (treeOptions.title !== "") {
        $container.append($('<h4>' + title + '</h4>'));
    }
    var $treeContainer = $('<div id="treeContainer"></div>').appendTo($container);
    $treeContainer.resizable({
        maxHeight: 900,
        minHeight: 100,
        maxWidth: 900,
        minWidth: 500
    });
    var $tree = $('<div id="taxaTree"></div>').appendTo($treeContainer);
    $tree
        .bind("after_open.jstree", function(event, data) {
            var children = $.jstree._reference(data.rslt.obj)._get_children(data.rslt.obj);
            // automatically open if only one child node
            if (children.length == 1) {
                $tree.jstree("open_node",children[0]);
            }
            // adjust container size
            var fullHeight = $tree[0].scrollHeight;
            if (fullHeight > $tree.height()) {
                fullHeight = Math.min(fullHeight, 700);
                $treeContainer.animate({height:fullHeight});
            }
        })
        .bind("select_node.jstree", function (event, data) {
            // click will show the context menu
            $tree.jstree("show_contextmenu", data.rslt.obj);
        })
        .bind("loaded.jstree", function (event, data) {
            // get rid of the anchor click handler because it hides the context menu (which we are 'binding' to click)
            //$tree.undelegate("a", "click.jstree");
            $tree.jstree("open_node","#top");
        })
        .jstree({
            json_data: {
                data: {"data":"Kingdoms", "state":"closed", "attr":{"rank":"kingdoms", "id":"top"}},
                ajax: {
                    url: function(node) {
                        var rank = $(node).attr("rank");
                        var u = urlConcat(biocacheServicesUrl, "/breakdown.json?q=") + query + "&rank=";
                        if (rank == 'kingdoms') {
                            u += 'kingdom';  // starting node
                        }
                        else {
                            u += rank + "&name=" + $(node).attr('id');
                        }
                        return u;
                    },
                    dataType: 'jsonp',
                    success: function(data) {
                        var nodes = [];
                        var rank = data.rank;
                        $.each(data.taxa, function(i, obj) {
                            var label = obj.label + " - " + obj.count;
                            if (rank == 'species') {
                                nodes.push({"data":label, "attr":{"rank":rank, "id":obj.label}});
                            }
                            else {
                                nodes.push({"data":label, "state":"closed", "attr":{"rank":rank, "id":obj.label}});
                            }
                        });
                        return nodes;
                    },
                    error: function(xhr, text_status) {
                        //alert(text_status);
                    }
                }
            },
            core: { animation: 200, open_parents: true },
            themes:{
                theme: treeOptions.theme || 'default',
                icons: treeOptions.icons || false,
                url: treeOptions.serverUrl + "/js/themes/" + (treeOptions.theme || 'default') + "/style.css"
            },
            checkbox: {override_ui:true},
            contextmenu: {select_node: false, show_at_node: false, items: {
                records: {label: "Show records", action: function(obj) {showRecords(obj, query);}},
                bie: {label: "Show information", action: function(obj) {showBie(obj);}},
                create: false,
                rename: false,
                remove: false,
                ccp: false }
            },
            plugins: ['json_data','themes','ui','contextmenu']
        });
}
/************************************************************\
 * Go to occurrence records for selected node
 \************************************************************/
function showRecords(node, query) {
    var rank = node.attr('rank');
    if (rank == 'kingdoms') return;
    var name = node.attr('id');
    // url for records list
    var recordsUrl = urlConcat(biocacheWebappUrl, "/occurrences/search?q=") + query +
        "&fq=" + rank + ":" + name;
    document.location.href = recordsUrl;
}
/************************************************************\
 * Go to 'species' page for selected node
 \************************************************************/
function showBie(node) {
    var rank = node.attr('rank');
    if (rank == 'kingdoms') return;
    var name = node.attr('id');
    var sppUrl = "http://bie.ala.org.au/species/" + name;
    if (rank != 'species') { sppUrl += "_(" + rank + ")"; }
    document.location.href = sppUrl;
}

/*------------------------- UTILITIES ------------------------------*/
/************************************************************\
 * build records query handling multiple uids
 * uidSet can be a comma-separated string or an array
 \************************************************************/
function buildQueryString(uidSet) {
    var uids = (typeof uidSet == "string") ? uidSet.split(',') : uidSet;
    var str = "";
    $.each(uids, function(index, value) {
        str += solrFieldNameForUid(value) + ":" + value + " OR ";
    });
    return str.substring(0, str.length - 4);
}
/************************************************************\
 * returns the appropriate facet name for the uid - to build
 * biocache occurrence searches
 \************************************************************/
function solrFieldNameForUid(uid) {
    switch(uid.substring(0,2)) {
        case 'co': return "collection_uid";
        case 'in': return "institution_uid";
        case 'dp': return "data_provider_uid";
        case 'dr': return "data_resource_uid";
        case 'dh': return "data_hub_uid";
        default: return "";
    }
}
/************************************************************\
 * returns the appropriate context for the uid - to build
 * biocache webservice urls
 \************************************************************/
function wsEntityForBreakdown(uid) {
    switch (uid.substr(0,2)) {
        case 'co': return 'collections';
        case 'in': return 'institutions';
        case 'dr': return 'dataResources';
        case 'dp': return 'dataProviders';
        case 'dh': return 'dataHubs';
        default: return "";
    }
}
/************************************************************\
 * Concatenate url fragments handling stray slashes
 \************************************************************/
function urlConcat(base, context) {
    // remove any trailing slash from base
    base = base.replace(/\/$/, '');
    // remove any leading slash from context
    context = context.replace(/^\//, '');
    // join
    return base + "/" + context;
}

/************************************************************\
 * Add commas to number strings
 \************************************************************/
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/*
 * Copyright (C) 2012 Atlas of Living Australia
 * All Rights Reserved.
 *
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 */
/**
 * jQuery page onload callback
 */
function showSpeciesPage() {

    console.log("Starting show species page");

    //load content
    loadOverviewImages();
    loadMap();
    loadGalleries();
    loadBhl(0, 10, false);
    loadCharts();
    loadExpertDistroMap();
    loadExternalSources();
    loadTrove(SHOW_CONF.scientificName,'trove-container','trove-results-home','previousTrove','nextTrove');
    loadDataProviders();

    //setup controls
    addAlerts();
}

function addAlerts(){
    // alerts button
    $("#alertsButton").click(function(e) {
        e.preventDefault();
        //console.log("alertsButton");
        var query = "Species: " + SHOW_CONF.scientificName;
        var searchString = "?q=" + SHOW_CONF.guid;
        //console.log("fqueries",fqueries, query);
        var url = SHOW_CONF.alertsUrl + "createBiocacheNewRecordsAlert?";
        url += "queryDisplayName=" + encodeURIComponent(query);
        url += "&baseUrlForWS=" + encodeURIComponent(SHOW_CONF.biocacheUrl);
        url += "&baseUrlForUI=" + encodeURIComponent(SHOW_CONF.serverName);
        url += "&webserviceQuery=%2Fws%2Foccurrences%2Fsearch" + encodeURIComponent(searchString);
        url += "&uiQuery=%2Foccurrences%2Fsearch%3Fq%3D*%3A*";
        url += "&resourceName=" + encodeURIComponent("Atlas of Living Australia");
        window.location.href = url;
    });
}

function loadMap() {
    //add an occurrence layer for this taxon
    var taxonLayer = L.tileLayer.wms(SHOW_CONF.biocacheServiceUrl + "/mapping/wms/reflect?q=" + SHOW_CONF.scientificName, {
        layers: 'ALA:occurrences',
        format: 'image/png',
        transparent: true,
        attribution: SHOW_CONF.mapAttribution,
        bgcolor: "0x000000",
        outline: "true",
        ENV: "color:5574a6;name:circle;size:4;opacity:1"
    });

    var speciesLayers = new L.LayerGroup();
    taxonLayer.addTo(speciesLayers);

    var map = L.map('leafletMap', {
        center: [SHOW_CONF.defaultDecimalLatitude,SHOW_CONF.defaultDecimalLongitude],
        zoom: SHOW_CONF.defaultZoomLevel,
        layers: [speciesLayers]
    });

    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';
    var mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    var defaultBaseLayer = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', attribution: mbAttr});

    defaultBaseLayer.addTo(map);

    var baseLayers = {
        "Default": defaultBaseLayer
    };

    var overlays = {
        "${sciNameFormatted}": taxonLayer
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    map.on('click', onMapClick);
    map.invalidateSize(false);
}

function onMapClick(e) {
    $.ajax({
        url: SHOW_CONF.biocacheServiceUrl + "/occurrences/info",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: SHOW_CONF.scientificName,
            zoom: "6",
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            radius: 20,
            format: "json"
        },
        success: function (response) {
            var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent("Occurrences at this point: " + response.count)
                .openOn(map);
        }
    });
}

function loadDataProviders(){

    var url = SHOW_CONF.biocacheServiceUrl  +
        '/occurrences/search.json?q=' +
        SHOW_CONF.scientificName +
        '&pageSize=0&flimit=-1' +
        '&facet=on&facets=data_resource_uid&callback=?';

    var uiUrl = SHOW_CONF.biocacheUrl  +
        '/occurrences/search?q=' +
        SHOW_CONF.scientificName;

    $.getJSON(url, function(data){
        $('.datasetCount').html(data.facetResults[0].fieldResult.length);
        $.each(data.facetResults[0].fieldResult, function(idx, facetValue){

            var queryUrl = uiUrl + "&fq=" + facetValue.fq;

            $('#data-providers-list tbody').append("<tr><td><a href='" + queryUrl + "'><span class='data-provider-name'>" + facetValue.label + "</span></a></td><td><a href='" + queryUrl + "'><span class='record-count'>" + facetValue.count +  "</span></a></td></tr>");
        });
    });
}

function loadExternalSources(){
    //load EOL content
    console.log('####### Loading EOL content - ' + SHOW_CONF.eolUrl);
    $.ajax({url: SHOW_CONF.eolUrl}).done(function ( data ) {
        console.log(data);
        console.log('Loading EOL content - ' + data.dataObjects.length);
        //clone a description template...
        if(data.dataObjects){
            console.log('Loading EOL content - ' + data.dataObjects.length);
            $.each(data.dataObjects, function(idx, dataObject){
                if(dataObject.language == SHOW_CONF.eolLanguage){
                    var $description = $('#descriptionTemplate').clone()
                    $description.css({'display':'block'});
                    $description.attr('id', dataObject.id);
                    $description.find(".title").html(dataObject.title ?  dataObject.title : 'Description');
                    $description.find(".content").html(dataObject.description);
                    $description.find(".sourceLink").attr('href',dataObject.source);
                    $description.find(".sourceLink").html(dataObject.rightsHolder)
                    $description.find(".rights").html(dataObject.rights)
                    $description.find(".providedBy").attr('href', 'http://eol.org/pages/' + data.identifier);
                    $description.find(".providedBy").html("Encyclopedia of Life")
                    $description.appendTo('#descriptiveContent');
                }
            });
        }
    });

    //load Genbank content
    $.ajax({url: SHOW_CONF.genbankUrl}).done(function ( data ) {
        if(data.total){
            $('.genbankResultCount').html('<a href="' + data.resultsUrl + '">View all results - ' + data.total + '</a>');
            if(data.results){
                $.each(data.results, function(idx, result){
                    var $genbank =  $('#genbankTemplate').clone();
                    $genbank.removeClass('hide');
                    $genbank.find('.externalLink').attr('href', result.link);
                    $genbank.find('.externalLink').html(result.title);
                    $genbank.find('.description').html(result.description);
                    $genbank.find('.furtherDescription').html(result.furtherDescription);
                    $('.genbank-results').append($genbank);
                });
            }
        }
    });

    //load sound content
    $.ajax({url: SHOW_CONF.soundUrl}).done(function ( data ) {
        if(data.sounds){
            $('#sounds').append('<h3 style="clear:left;">Sounds</h3>');
            $('#sounds').append('<audio src="' + data.sounds[0].alternativeFormats['audio/mpeg'] + '" preload="auto" />' );
            audiojs.events.ready(function() {
                var as = audiojs.createAll();
            });
            var source = "";
            if(data.processed.attribution.collectionName){
                source = data.processed.attribution.collectionName
            } else {
                source = data.processed.attribution.dataResourceName
            }
            $('#sounds').append('<span>Source: ' + source + '</span><br/>' );
            $('#sounds').append('<span><a href="${biocacheUrl}/occurrence/'+ data.raw.uuid +'">View more details of this audio</a></span>' );
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        //alert( "error" + errorThrown);
    });
}


function loadCharts(){
    // Charts via collectory charts.js
    var chartOptions = {
        query: SHOW_CONF.scientificName,
        biocacheServicesUrl: SHOW_CONF.biocacheServiceUrl,
        biocacheWebappUrl: SHOW_CONF.biocacheUrl,
        collectionsUrl: SHOW_CONF.collectoryUrl,
        totalRecordsSelector: ".occurenceCount",
        chartsDiv: "recordBreakdowns",
        error: chartsError,
        width: 540,
        charts: ['collection_uid','state','month','occurrence_year'],
        collection_uid: {title: 'By collection'},
        state: {title: 'By state & territory'},
        month: {chartType: "column"},
        occurrence_year: {chartType: "column"},
        is3D:false
    };

    console.log("Charts showSpeciesPage");
    console.log(SHOW_CONF);
    console.log("chartOptions");
    console.log(chartOptions);

    loadFacetCharts(chartOptions);
}

function chartsError() {
    $("#chartsError").html("An error occurred and charts cannot be displayed at this time.");
}

/**
 * Trigger loading of the 3 gallery sections
 */
function loadGalleries() {
    console.log('loading galleries');
    $('#gallerySpinner').show();
    loadGalleryType('type', 0)
    loadGalleryType('specimen', 0)
    loadGalleryType('other', 0)
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

/**
 * Load overview images on the species page. This is separate from the main galleries.
 */
function loadOverviewImages(){

    var url = SHOW_CONF.biocacheServiceUrl  +
        '/occurrences/search.json?q=' +
        SHOW_CONF.scientificName +
        '&fq=multimedia:"Image"&facet=off&pageSize=5&start=0&callback=?';

    console.log('Loading images from: ' + url);

    $.getJSON(url, function(data){
        if (data && data.totalRecords > 0) {

            $('#noOverviewImages').addClass('hide');
            $('.thumb-row').removeClass('hide');
            var $categoryTmpl = $('#overviewImages');
            $categoryTmpl.removeClass('hide');

            var $mainOverviewImage = $('.mainOverviewImage');
            $mainOverviewImage.attr('src', data.occurrences[0].largeImageUrl);
            $mainOverviewImage.parent().attr('href', data.occurrences[0].largeImageUrl);
            $mainOverviewImage.parent().attr('data-title', data.occurrences[0].dataResourceName);
            $mainOverviewImage.parent().attr('data-footer', data.occurrences[0].dataResourceName);

            $('.mainOverviewImageInfo').html(data.occurrences[0].dataResourceName);

            if(data.occurrences.length >= 2){
                var $thumb = generateOverviewThumb(data.occurrences[1], "1");
                $('#overview-thumbs').append($thumb);
            }
            if(data.occurrences.length >= 3){
                var $thumb = generateOverviewThumb(data.occurrences[2], "2");
                $('#overview-thumbs').append($thumb);
            }
            if(data.occurrences.length >= 4){
                var $thumb = generateOverviewThumb(data.occurrences[3], "3");
                $('#overview-thumbs').append($thumb);
            }
            if(data.occurrences.length >= 5){
                var occurrence  = data.occurrences[4];
                $('#more-photo-thumb-link').attr('style', 'background-image:url(' + occurrence.smallImageUrl + ')');
            }
        }
    }).fail(function(jqxhr, textStatus, error) {
        alert('Error loading gallery: ' + textStatus + ', ' + error);
    }).always(function() {
        $('#gallerySpinner').hide();
    });
}

function generateOverviewThumb(occurrence, id){
    var $taxonSummaryThumb = $('#taxon-summary-thumb-template').clone();
    var $taxonSummaryThumbLink = $taxonSummaryThumb.find('a');
    $taxonSummaryThumb.removeClass('hide');
    $taxonSummaryThumb.attr('id', 'taxon-summary-thumb-'+id);
    $taxonSummaryThumb.attr('style', 'background-image:url(' + occurrence.smallImageUrl + ')');
    $taxonSummaryThumbLink.attr('data-title', getImageTitleFromOccurrence(occurrence));
    $taxonSummaryThumbLink.attr('data-footer', getImageFooterFromOccurrence(occurrence));
    $taxonSummaryThumbLink.attr('href', occurrence.largeImageUrl);
    return $taxonSummaryThumb;

}

/**
 * AJAX loading of gallery images from biocache-service
 *
 * @param category
 * @param start
 */
function loadGalleryType(category, start) {

    console.log("Loading images category: " + category);

    var imageCategoryParams = {
        type: '&fq=type_status:*',
        specimen: '&fq=basis_of_record:PreservedSpecimen&fq=-type_status:*',
        other: '&fq=-type_status:*&fq=-basis_of_record:PreservedSpecimen'
    };

    var pageSize = 20;

    if (start > 0) {
        $('.loadMore.' + category + ' button').addClass('disabled');
        $('.loadMore.' + category + ' img').removeClass('hide');
    }

    //TODO a toggle between LSID based searches and names searches
    var url = SHOW_CONF.biocacheServiceUrl  +
        '/occurrences/search.json?q=' +
        SHOW_CONF.scientificName +
        '&fq=multimedia:"Image"&pageSize=' + pageSize +
        '&facet=off&start=' + start + imageCategoryParams[category] + '&callback=?';

    console.log("URL: " + url);

    $.getJSON(url, function(data){

        console.log('Total images: ' + data.totalRecords + ", category: " + category);

        if (data && data.totalRecords > 0) {
            var br = "<br>";
            var $categoryTmpl = $('#cat_' + category);
            $categoryTmpl.removeClass('hide');
            $('#cat_nonavailable').addClass('hide');

            $.each(data.occurrences, function(i, el) {
                // clone template div & populate with metadata
                var $taxonThumb = $('#taxon-thumb-template').clone();
                $taxonThumb.removeClass('hide');
                $taxonThumb.attr('id','thumb_' + category + i);
                $taxonThumb.attr('href', el.largeImageUrl);
                $taxonThumb.find('img').attr('src', el.smallImageUrl);

                // brief metadata
                var briefHtml = getImageTitleFromOccurrence(el)
                $taxonThumb.find('.caption-brief').html(briefHtml);
                $taxonThumb.attr('data-title', briefHtml);
                $taxonThumb.find('.caption-detail').html(briefHtml);

                // write to DOM
                $taxonThumb.attr('data-footer', getImageFooterFromOccurrence(el));
                $categoryTmpl.find('.taxon-gallery').append($taxonThumb);
            });

            $('.loadMore.' + category).remove(); // remove 'load more images' button that was just clicked

            if (data.totalRecords > (start + pageSize)) {
                // add new 'load more images' button if required
                var spinnerLink = $('#gallerySpinner img').attr('src');
                var btn = '<div class="loadMore ' + category + '"><br><button class="btn" onCLick="loadGalleryType(\'' + category + '\','
                    + (start + pageSize)  + ');">Load more images <img src="' + spinnerLink + '" class="hide"/></button></div>';
                $categoryTmpl.find('.taxon-gallery').append(btn);
            }
        }
    }).fail(function(jqxhr, textStatus, error) {
        alert('Error loading gallery: ' + textStatus + ', ' + error);
    }).always(function() {
        $('#gallerySpinner').hide();
    });
}

function getImageTitleFromOccurrence(el){
    var br = "<br/>";
    var briefHtml = el.raw_scientificName;
    if (el.typeStatus) briefHtml += br + el.typeStatus;
    if (el.institutionName) briefHtml += ((el.typeStatus) ? ' | ' : br) + el.institutionName;
    return briefHtml;
}

function getImageFooterFromOccurrence(el){
    var br = "<br/>";
    var detailHtml = el.raw_scientificName;
    if (el.typeStatus) detailHtml += br + 'Type: ' + el.typeStatus;
    if (el.collector) detailHtml += br + 'By: ' + el.collector;
    if (el.eventDate) detailHtml += br + 'Date: ' + moment(el.eventDate).format('YYYY-MM-DD');
    if (el.institutionName) {
        detailHtml += br + el.institutionName;
    } else {
        detailHtml += br + el.dataResourceName;
    }
    // write to DOM
    detailHtml += '<div class="recordLink"><a href="' + SHOW_CONF.biocacheUrl + '/occurrences/' + el.uuid + '">View details of this record</a></div>';
    return detailHtml;
}


/**
 * BHL search to populate literature tab
 *
 * @param start
 * @param rows
 * @param scroll
 */
function loadBhl(start, rows, scroll) {
    if (!start) {
        start = 0;
    }
    if (!rows) {
        rows = 10;
    }
    // var url = "http://localhost:8080/bhl-ftindex-demo/search/ajaxSearch?q=" + $("#tbSearchTerm").val();
    var taxonName = SHOW_CONF.scientificName ;
    var synonyms = SHOW_CONF.synonymsQuery;
    var query = ""; // = taxonName.split(/\s+/).join(" AND ") + synonyms;
    if (taxonName) {
        var terms = taxonName.split(/\s+/).length;
        if (terms > 2) {
            query += taxonName.split(/\s+/).join(" AND ");
        } else if (terms == 2) {
            query += '"' + taxonName + '"';
        } else {
            query += taxonName;
        }
    }
    if (synonyms) {
        //synonyms = "  " + ((synonyms.indexOf("OR") != -1) ? "(" + synonyms + ")" : synonyms);
        query += (taxonName) ? ' OR ' + synonyms : synonyms;
    }

    if (!query) {
        return cancelSearch("No names were found to search BHL");
    }

    var url = "http://bhlidx.ala.org.au/select?q=" + query + '&start=' + start + "&rows=" + rows +
        "&wt=json&fl=name%2CpageId%2CitemId%2Cscore&hl=on&hl.fl=text&hl.fragsize=200&" +
        "group=true&group.field=itemId&group.limit=7&group.ngroups=true&taxa=false";
    var buf = "";
    $("#status-box").css("display", "block");
    $("#synonyms").html("").css("display", "none")
    $(".result-list").html("");

    $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: "json.wrf",
        success:  function(data) {
            var itemNumber = parseInt(data.responseHeader.params.start, 10) + 1;
            var maxItems = parseInt(data.grouped.itemId.ngroups, 10);
            if (maxItems == 0) {
                return cancelSearch("No references were found for <pre>" + query + "</pre>");
            }
            var startItem = parseInt(start, 10);
            var pageSize = parseInt(rows, 10);
            var showingFrom = startItem + 1;
            var showingTo = (startItem + pageSize <= maxItems) ? startItem + pageSize : maxItems ;
            //console.log(startItem, pageSize, showingTo);
            var pageSize = parseInt(rows, 10);
            buf += '<div class="results-summary">Showing ' + showingFrom + " to " + showingTo + " of " + maxItems +
                ' results for the query <pre>' + query + '</pre></div>'
            // grab highlight text and store in map/hash
            var highlights = {};
            $.each(data.highlighting, function(idx, hl) {
                highlights[idx] = hl.text[0];
            });
            //console.log("highlighting", highlights, itemNumber);
            $.each(data.grouped.itemId.groups, function(idx, obj) {
                buf += '<div class="result">';
                buf += '<h3><b>' + itemNumber++;
                buf += '.</b> <a target="item" href="http://biodiversitylibrary.org/item/' + obj.groupValue + '">' + obj.doclist.docs[0].name + '</a> ';
                var suffix = '';
                if (obj.doclist.numFound > 1) {
                    suffix = 's';
                }
                buf += '(' + obj.doclist.numFound + '</b> matching page' + suffix + ')</h3><div class="thumbnail-container">';

                $.each(obj.doclist.docs, function(idx, page) {
                    var highlightText = $('<div>'+highlights[page.pageId]+'</div>').htmlClean({allowedTags: ["em"]}).html();
                    buf += '<div class="page-thumbnail"><a target="page image" href="http://biodiversitylibrary.org/page/' +
                        page.pageId + '"><img src="http://biodiversitylibrary.org/pagethumb/' + page.pageId +
                        '" alt="' + escapeHtml(highlightText) + '"  width="60px" height="100px"/></a></div>';
                })
                buf += "</div><!--end .thumbnail-container -->";
                buf += "</div>";
            })

            var prevStart = start - rows;
            var nextStart = start + rows;
            //console.log("nav buttons", prevStart, nextStart);

            buf += '<div id="button-bar">';
            if (prevStart >= 0) {
                buf += '<input type="button" class="btn" value="Previous page" onclick="loadBhl(' + prevStart + ',' + rows + ', true)">';
            }
            buf += '&nbsp;&nbsp;&nbsp;';
            if (nextStart <= maxItems) {
                buf += '<input type="button" class="btn" value="Next page" onclick="loadBhl(' + nextStart + ',' + rows + ', true)">';
            }

            buf += '</div>';

            $("#bhl-results-list").html(buf);
            if (data.synonyms) {
                buf = "<b>Synonyms used:</b>&nbsp;";
                buf += data.synonyms.join(", ");
                $("#synonyms").html(buf).css("display", "block");
            } else {
                $("#synonyms").html("").css("display", "none");
            }
            $("#status-box").css("display", "none");

            if (scroll) {
                $('html, body').animate({scrollTop: '300px'}, 300);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#status-box").css("display", "none");
            $("#solr-results").html('An error has occurred, probably due to invalid query syntax');
        }
    });
} // end doSearch

function cancelSearch(msg) {
    $("#status-box").css("display", "none");
    $("#solr-results").html(msg);
    return true;
}

function loadExpertDistroMap() {
    var url = "http://spatial.ala.org.au/layers-service/distribution/map/" + SHOW_CONF.guid + "?callback=?";
    $.getJSON(url, function(data){
        if (data.available) {
            $("#expertDistroDiv img").attr("src", data.url);
            if (data.dataResourceName && data.dataResourceUrl) {
                var attr = $('<a>').attr('href', data.dataResourceUrl).text(data.dataResourceName)
                $("#expertDistroDiv #dataResource").html(attr);
            }
            $("#expertDistroDiv").show();
        }
    })
}
(function(h,o,g){var p=function(){for(var b=/audio(.min)?.js.*/,a=document.getElementsByTagName("script"),c=0,d=a.length;c<d;c++){var e=a[c].getAttribute("src");if(b.test(e))return e.replace(b,"")}}();g[h]={instanceCount:0,instances:{},flashSource:'      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance='+h+'.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance='+
h+'.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',settings:{autoplay:false,loop:false,preload:true,imageLocation:"http://bie.ala.org.au/js/player-graphics.gif",swfLocation:"http://bie.ala.org.au/js/audiojs.swf",useFlash:function(){var b=document.createElement("audio");return!(b.canPlayType&&b.canPlayType("audio/mpeg;").replace(/no/,""))}(),hasFlash:function(){if(navigator.plugins&&navigator.plugins.length&&navigator.plugins["Shockwave Flash"])return true;else if(navigator.mimeTypes&&navigator.mimeTypes.length){var b=
navigator.mimeTypes["application/x-shockwave-flash"];return b&&b.enabledPlugin}else try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash");return true}catch(a){}return false}(),createPlayer:{markup:'          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em>/<strong class="duration">00:00</strong>           </div>           <div class="error-message"></div>',
playPauseClass:"play-pause",scrubberClass:"scrubber",progressClass:"progress",loaderClass:"loaded",timeClass:"time",durationClass:"duration",playedClass:"played",errorMessageClass:"error-message",playingClass:"playing",loadingClass:"loading",errorClass:"error"},css:'        .audiojs audio { position: absolute; left: -1px; }         .audiojs { width: 290px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444));           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%);           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); }         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; }         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; }         .audiojs .play { display: block; }         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); }         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url("$1") -2px -1px no-repeat; }         .audiojs .loading { background: url("$1") -2px -31px no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url("$1") -2px -91px no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',
trackEnded:function(){},flashError:function(){var b=this.settings.createPlayer,a=j(b.errorMessageClass,this.wrapper),c='Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';if(this.mp3)c+=' <a href="'+this.mp3+'">Download audio file</a>.';g[h].helpers.removeClass(this.wrapper,b.loadingClass);g[h].helpers.addClass(this.wrapper,b.errorClass);a.innerHTML=c},loadError:function(){var b=this.settings.createPlayer,a=j(b.errorMessageClass,this.wrapper);g[h].helpers.removeClass(this.wrapper,
b.loadingClass);g[h].helpers.addClass(this.wrapper,b.errorClass);a.innerHTML='Error loading: "'+this.mp3+'"'},init:function(){g[h].helpers.addClass(this.wrapper,this.settings.createPlayer.loadingClass)},loadStarted:function(){var b=this.settings.createPlayer,a=j(b.durationClass,this.wrapper),c=Math.floor(this.duration/60),d=Math.floor(this.duration%60);g[h].helpers.removeClass(this.wrapper,b.loadingClass);a.innerHTML=(c<10?"0":"")+c+":"+(d<10?"0":"")+d},loadProgress:function(b){var a=this.settings.createPlayer,
c=j(a.scrubberClass,this.wrapper);j(a.loaderClass,this.wrapper).style.width=c.offsetWidth*b+"px"},playPause:function(){this.playing?this.settings.play():this.settings.pause()},play:function(){g[h].helpers.addClass(this.wrapper,this.settings.createPlayer.playingClass)},pause:function(){g[h].helpers.removeClass(this.wrapper,this.settings.createPlayer.playingClass)},updatePlayhead:function(b){var a=this.settings.createPlayer,c=j(a.scrubberClass,this.wrapper);j(a.progressClass,this.wrapper).style.width=
c.offsetWidth*b+"px";a=j(a.playedClass,this.wrapper);c=this.duration*b;b=Math.floor(c/60);c=Math.floor(c%60);a.innerHTML=(b<10?"0":"")+b+":"+(c<10?"0":"")+c}},create:function(b,a){a=a||{};return b.length?this.createAll(a,b):this.newInstance(b,a)},createAll:function(b,a){var c=a||document.getElementsByTagName("audio"),d=[];b=b||{};for(var e=0,i=c.length;e<i;e++)d.push(this.newInstance(c[e],b));return d},newInstance:function(b,a){var c=this.helpers.clone(this.settings),d="audiojs"+this.instanceCount,
e="audiojs_wrapper"+this.instanceCount;this.instanceCount++;if(b.getAttribute("autoplay")!=null)c.autoplay=true;if(b.getAttribute("loop")!=null)c.loop=true;if(b.getAttribute("preload")=="none")c.preload=false;a&&this.helpers.merge(c,a);if(c.createPlayer.markup)b=this.createPlayer(b,c.createPlayer,e);else b.parentNode.setAttribute("id",e);e=new g[o](b,c);c.css&&this.helpers.injectCss(e,c.css);if(c.useFlash&&c.hasFlash){this.injectFlash(e,d);this.attachFlashEvents(e.wrapper,e)}else c.useFlash&&!c.hasFlash&&
this.settings.flashError.apply(e);if(!c.useFlash||c.useFlash&&c.hasFlash)this.attachEvents(e.wrapper,e);return this.instances[d]=e},createPlayer:function(b,a,c){var d=document.createElement("div"),e=b.cloneNode(true);d.setAttribute("class","audiojs");d.setAttribute("className","audiojs");d.setAttribute("id",c);if(e.outerHTML&&!document.createElement("audio").canPlayType){e=this.helpers.cloneHtml5Node(b);d.innerHTML=a.markup;d.appendChild(e);b.outerHTML=d.outerHTML;d=document.getElementById(c)}else{d.appendChild(e);
d.innerHTML+=a.markup;b.parentNode.replaceChild(d,b)}return d.getElementsByTagName("audio")[0]},attachEvents:function(b,a){if(a.settings.createPlayer){var c=a.settings.createPlayer,d=j(c.playPauseClass,b),e=j(c.scrubberClass,b);g[h].events.addListener(d,"click",function(){a.playPause.apply(a)});g[h].events.addListener(e,"click",function(i){i=i.clientX;var f=this,k=0;if(f.offsetParent){do k+=f.offsetLeft;while(f=f.offsetParent)}a.skipTo((i-k)/e.offsetWidth)});if(!a.settings.useFlash){g[h].events.trackLoadProgress(a);
g[h].events.addListener(a.element,"timeupdate",function(){a.updatePlayhead.apply(a)});g[h].events.addListener(a.element,"ended",function(){a.trackEnded.apply(a)});g[h].events.addListener(a.source,"error",function(){clearInterval(a.readyTimer);clearInterval(a.loadTimer);a.settings.loadError.apply(a)})}}},attachFlashEvents:function(b,a){a.swfReady=false;a.load=function(c){a.mp3=c;a.swfReady&&a.element.load(c)};a.loadProgress=function(c,d){a.loadedPercent=c;a.duration=d;a.settings.loadStarted.apply(a);
a.settings.loadProgress.apply(a,[c])};a.skipTo=function(c){if(!(c>a.loadedPercent)){a.updatePlayhead.call(a,[c]);a.element.skipTo(c)}};a.updatePlayhead=function(c){a.settings.updatePlayhead.apply(a,[c])};a.play=function(){if(!a.settings.preload){a.settings.preload=true;a.element.init(a.mp3)}a.playing=true;a.element.pplay();a.settings.play.apply(a)};a.pause=function(){a.playing=false;a.element.ppause();a.settings.pause.apply(a)};a.setVolume=function(c){a.element.setVolume(c)};a.loadStarted=function(){a.swfReady=
true;a.settings.preload&&a.element.init(a.mp3);a.settings.autoplay&&a.play.apply(a)}},injectFlash:function(b,a){var c=this.flashSource.replace(/\$1/g,a);c=c.replace(/\$2/g,b.settings.swfLocation);c=c.replace(/\$3/g,+new Date+Math.random());var d=b.wrapper.innerHTML,e=document.createElement("div");e.innerHTML=c+d;b.wrapper.innerHTML=e.innerHTML;b.element=this.helpers.getSwf(a)},helpers:{merge:function(b,a){for(attr in a)if(b.hasOwnProperty(attr)||a.hasOwnProperty(attr))b[attr]=a[attr]},clone:function(b){if(b==
null||typeof b!=="object")return b;var a=new b.constructor,c;for(c in b)a[c]=arguments.callee(b[c]);return a},addClass:function(b,a){RegExp("(\\s|^)"+a+"(\\s|$)").test(b.className)||(b.className+=" "+a)},removeClass:function(b,a){b.className=b.className.replace(RegExp("(\\s|^)"+a+"(\\s|$)")," ")},injectCss:function(b,a){for(var c="",d=document.getElementsByTagName("style"),e=a.replace(/\$1/g,b.settings.imageLocation),i=0,f=d.length;i<f;i++){var k=d[i].getAttribute("title");if(k&&~k.indexOf("audiojs")){f=
d[i];if(f.innerHTML===e)return;c=f.innerHTML;break}}d=document.getElementsByTagName("head")[0];i=d.firstChild;f=document.createElement("style");if(d){f.setAttribute("type","text/css");f.setAttribute("title","audiojs");if(f.styleSheet)f.styleSheet.cssText=c+e;else f.appendChild(document.createTextNode(c+e));i?d.insertBefore(f,i):d.appendChild(styleElement)}},cloneHtml5Node:function(b){var a=document.createDocumentFragment(),c=a.createElement?a:document;c.createElement("audio");c=c.createElement("div");
a.appendChild(c);c.innerHTML=b.outerHTML;return c.firstChild},getSwf:function(b){b=document[b]||window[b];return b.length>1?b[b.length-1]:b}},events:{memoryLeaking:false,listeners:[],addListener:function(b,a,c){if(b.addEventListener)b.addEventListener(a,c,false);else if(b.attachEvent){this.listeners.push(b);if(!this.memoryLeaking){window.attachEvent("onunload",function(){if(this.listeners)for(var d=0,e=this.listeners.length;d<e;d++)g[h].events.purge(this.listeners[d])});this.memoryLeaking=true}b.attachEvent("on"+
a,function(){c.call(b,window.event)})}},trackLoadProgress:function(b){if(b.settings.preload){var a,c;b=b;var d=/(ipod|iphone|ipad)/i.test(navigator.userAgent);a=setInterval(function(){if(b.element.readyState>-1)d||b.init.apply(b);if(b.element.readyState>1){b.settings.autoplay&&b.play.apply(b);clearInterval(a);c=setInterval(function(){b.loadProgress.apply(b);b.loadedPercent>=1&&clearInterval(c)})}},10);b.readyTimer=a;b.loadTimer=c}},purge:function(b){var a=b.attributes,c;if(a)for(c=0;c<a.length;c+=
1)if(typeof b[a[c].name]==="function")b[a[c].name]=null;if(a=b.childNodes)for(c=0;c<a.length;c+=1)purge(b.childNodes[c])},ready:function(){return function(b){var a=window,c=false,d=true,e=a.document,i=e.documentElement,f=e.addEventListener?"addEventListener":"attachEvent",k=e.addEventListener?"removeEventListener":"detachEvent",n=e.addEventListener?"":"on",m=function(l){if(!(l.type=="readystatechange"&&e.readyState!="complete")){(l.type=="load"?a:e)[k](n+l.type,m,false);if(!c&&(c=true))b.call(a,l.type||
l)}},q=function(){try{i.doScroll("left")}catch(l){setTimeout(q,50);return}m("poll")};if(e.readyState=="complete")b.call(a,"lazy");else{if(e.createEventObject&&i.doScroll){try{d=!a.frameElement}catch(r){}d&&q()}e[f](n+"DOMContentLoaded",m,false);e[f](n+"readystatechange",m,false);a[f](n+"load",m,false)}}}()}};g[o]=function(b,a){this.element=b;this.wrapper=b.parentNode;this.source=b.getElementsByTagName("source")[0]||b;this.mp3=function(c){var d=c.getElementsByTagName("source")[0];return c.getAttribute("src")||
(d?d.getAttribute("src"):null)}(b);this.settings=a;this.loadStartedCalled=false;this.loadedPercent=0;this.duration=1;this.playing=false};g[o].prototype={updatePlayhead:function(){this.settings.updatePlayhead.apply(this,[this.element.currentTime/this.duration])},skipTo:function(b){if(!(b>this.loadedPercent)){this.element.currentTime=this.duration*b;this.updatePlayhead()}},load:function(b){this.loadStartedCalled=false;this.source.setAttribute("src",b);this.element.load();this.mp3=b;g[h].events.trackLoadProgress(this)},
loadError:function(){this.settings.loadError.apply(this)},init:function(){this.settings.init.apply(this)},loadStarted:function(){if(!this.element.duration)return false;this.duration=this.element.duration;this.updatePlayhead();this.settings.loadStarted.apply(this)},loadProgress:function(){if(this.element.buffered!=null&&this.element.buffered.length){if(!this.loadStartedCalled)this.loadStartedCalled=this.loadStarted();this.loadedPercent=this.element.buffered.end(this.element.buffered.length-1)/this.duration;
this.settings.loadProgress.apply(this,[this.loadedPercent])}},playPause:function(){this.playing?this.pause():this.play()},play:function(){/(ipod|iphone|ipad)/i.test(navigator.userAgent)&&this.element.readyState==0&&this.init.apply(this);if(!this.settings.preload){this.settings.preload=true;this.element.setAttribute("preload","auto");g[h].events.trackLoadProgress(this)}this.playing=true;this.element.play();this.settings.play.apply(this)},pause:function(){this.playing=false;this.element.pause();this.settings.pause.apply(this)},
setVolume:function(b){this.element.volume=b},trackEnded:function(){this.skipTo.apply(this,[0]);this.settings.loop||this.pause.apply(this);this.settings.trackEnded.apply(this)}};var j=function(b,a){var c=[];a=a||document;if(a.getElementsByClassName)c=a.getElementsByClassName(b);else{var d,e,i=a.getElementsByTagName("*"),f=RegExp("(^|\\s)"+b+"(\\s|$)");d=0;for(e=i.length;d<e;d++)f.test(i[d].className)&&c.push(i[d])}return c.length>1?c:c[0]}})("audiojs","audiojsInstance",this);

/* qTip2 v2.2.0 tips modal viewport svg imagemap ie6 | qtip2.com | Licensed MIT, GPL | Thu Nov 21 2013 20:34:59 */
(function(t,e,i){(function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):jQuery&&!jQuery.fn.qtip&&t(jQuery)})(function(s){"use strict";function o(t,e,i,o){this.id=i,this.target=t,this.tooltip=E,this.elements={target:t},this._id=X+"-"+i,this.timers={img:{}},this.options=e,this.plugins={},this.cache={event:{},target:s(),disabled:k,attr:o,onTooltip:k,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=k}function n(t){return t===E||"object"!==s.type(t)}function r(t){return!(s.isFunction(t)||t&&t.attr||t.length||"object"===s.type(t)&&(t.jquery||t.then))}function a(t){var e,i,o,a;return n(t)?k:(n(t.metadata)&&(t.metadata={type:t.metadata}),"content"in t&&(e=t.content,n(e)||e.jquery||e.done?e=t.content={text:i=r(e)?k:e}:i=e.text,"ajax"in e&&(o=e.ajax,a=o&&o.once!==k,delete e.ajax,e.text=function(t,e){var n=i||s(this).attr(e.options.content.attr)||"Loading...",r=s.ajax(s.extend({},o,{context:e})).then(o.success,E,o.error).then(function(t){return t&&a&&e.set("content.text",t),t},function(t,i,s){e.destroyed||0===t.status||e.set("content.text",i+": "+s)});return a?n:(e.set("content.text",n),r)}),"title"in e&&(n(e.title)||(e.button=e.title.button,e.title=e.title.text),r(e.title||k)&&(e.title=k))),"position"in t&&n(t.position)&&(t.position={my:t.position,at:t.position}),"show"in t&&n(t.show)&&(t.show=t.show.jquery?{target:t.show}:t.show===W?{ready:W}:{event:t.show}),"hide"in t&&n(t.hide)&&(t.hide=t.hide.jquery?{target:t.hide}:{event:t.hide}),"style"in t&&n(t.style)&&(t.style={classes:t.style}),s.each(R,function(){this.sanitize&&this.sanitize(t)}),t)}function h(t,e){for(var i,s=0,o=t,n=e.split(".");o=o[n[s++]];)n.length>s&&(i=o);return[i||t,n.pop()]}function l(t,e){var i,s,o;for(i in this.checks)for(s in this.checks[i])(o=RegExp(s,"i").exec(t))&&(e.push(o),("builtin"===i||this.plugins[i])&&this.checks[i][s].apply(this.plugins[i]||this,e))}function c(t){return G.concat("").join(t?"-"+t+" ":" ")}function d(i){return i&&{type:i.type,pageX:i.pageX,pageY:i.pageY,target:i.target,relatedTarget:i.relatedTarget,scrollX:i.scrollX||t.pageXOffset||e.body.scrollLeft||e.documentElement.scrollLeft,scrollY:i.scrollY||t.pageYOffset||e.body.scrollTop||e.documentElement.scrollTop}||{}}function p(t,e){return e>0?setTimeout(s.proxy(t,this),e):(t.call(this),i)}function u(t){return this.tooltip.hasClass(ee)?k:(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=p.call(this,function(){this.toggle(W,t)},this.options.show.delay),i)}function f(t){if(this.tooltip.hasClass(ee))return k;var e=s(t.relatedTarget),i=e.closest(U)[0]===this.tooltip[0],o=e[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==e[0]&&"mouse"===this.options.position.target&&i||this.options.hide.fixed&&/mouse(out|leave|move)/.test(t.type)&&(i||o))try{t.preventDefault(),t.stopImmediatePropagation()}catch(n){}else this.timers.hide=p.call(this,function(){this.toggle(k,t)},this.options.hide.delay,this)}function g(t){return this.tooltip.hasClass(ee)||!this.options.hide.inactive?k:(clearTimeout(this.timers.inactive),this.timers.inactive=p.call(this,function(){this.hide(t)},this.options.hide.inactive),i)}function m(t){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(t)}function v(t,i,o){s(e.body).delegate(t,(i.split?i:i.join(he+" "))+he,function(){var t=T.api[s.attr(this,H)];t&&!t.disabled&&o.apply(t,arguments)})}function y(t,i,n){var r,h,l,c,d,p=s(e.body),u=t[0]===e?p:t,f=t.metadata?t.metadata(n.metadata):E,g="html5"===n.metadata.type&&f?f[n.metadata.name]:E,m=t.data(n.metadata.name||"qtipopts");try{m="string"==typeof m?s.parseJSON(m):m}catch(v){}if(c=s.extend(W,{},T.defaults,n,"object"==typeof m?a(m):E,a(g||f)),h=c.position,c.id=i,"boolean"==typeof c.content.text){if(l=t.attr(c.content.attr),c.content.attr===k||!l)return k;c.content.text=l}if(h.container.length||(h.container=p),h.target===k&&(h.target=u),c.show.target===k&&(c.show.target=u),c.show.solo===W&&(c.show.solo=h.container.closest("body")),c.hide.target===k&&(c.hide.target=u),c.position.viewport===W&&(c.position.viewport=h.container),h.container=h.container.eq(0),h.at=new z(h.at,W),h.my=new z(h.my),t.data(X))if(c.overwrite)t.qtip("destroy",!0);else if(c.overwrite===k)return k;return t.attr(Y,i),c.suppress&&(d=t.attr("title"))&&t.removeAttr("title").attr(se,d).attr("title",""),r=new o(t,c,i,!!l),t.data(X,r),t.one("remove.qtip-"+i+" removeqtip.qtip-"+i,function(){var t;(t=s(this).data(X))&&t.destroy(!0)}),r}function b(t){return t.charAt(0).toUpperCase()+t.slice(1)}function w(t,e){var s,o,n=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+be.join(n+" ")+n).split(" "),a=0;if(ye[e])return t.css(ye[e]);for(;s=r[a++];)if((o=t.css(s))!==i)return ye[e]=s,o}function _(t,e){return Math.ceil(parseFloat(w(t,e)))}function x(t,e){this._ns="tip",this.options=e,this.offset=e.offset,this.size=[e.width,e.height],this.init(this.qtip=t)}function q(t,e){this.options=e,this._ns="-modal",this.init(this.qtip=t)}function C(t){this._ns="ie6",this.init(this.qtip=t)}var T,j,z,M,I,W=!0,k=!1,E=null,S="x",L="y",A="width",B="height",D="top",F="left",O="bottom",P="right",N="center",$="flipinvert",V="shift",R={},X="qtip",Y="data-hasqtip",H="data-qtip-id",G=["ui-widget","ui-tooltip"],U="."+X,Q="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),J=X+"-fixed",K=X+"-default",Z=X+"-focus",te=X+"-hover",ee=X+"-disabled",ie="_replacedByqTip",se="oldtitle",oe={ie:function(){for(var t=3,i=e.createElement("div");(i.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->")&&i.getElementsByTagName("i")[0];);return t>4?t:0/0}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||k};j=o.prototype,j._when=function(t){return s.when.apply(s,t)},j.render=function(t){if(this.rendered||this.destroyed)return this;var e,i=this,o=this.options,n=this.cache,r=this.elements,a=o.content.text,h=o.content.title,l=o.content.button,c=o.position,d=("."+this._id+" ",[]);return s.attr(this.target[0],"aria-describedby",this._id),this.tooltip=r.tooltip=e=s("<div/>",{id:this._id,"class":[X,K,o.style.classes,X+"-pos-"+o.position.my.abbrev()].join(" "),width:o.style.width||"",height:o.style.height||"",tracking:"mouse"===c.target&&c.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":k,"aria-describedby":this._id+"-content","aria-hidden":W}).toggleClass(ee,this.disabled).attr(H,this.id).data(X,this).appendTo(c.container).append(r.content=s("<div />",{"class":X+"-content",id:this._id+"-content","aria-atomic":W})),this.rendered=-1,this.positioning=W,h&&(this._createTitle(),s.isFunction(h)||d.push(this._updateTitle(h,k))),l&&this._createButton(),s.isFunction(a)||d.push(this._updateContent(a,k)),this.rendered=W,this._setWidget(),s.each(R,function(t){var e;"render"===this.initialize&&(e=this(i))&&(i.plugins[t]=e)}),this._unassignEvents(),this._assignEvents(),this._when(d).then(function(){i._trigger("render"),i.positioning=k,i.hiddenDuringWait||!o.show.ready&&!t||i.toggle(W,n.event,k),i.hiddenDuringWait=k}),T.api[this.id]=this,this},j.destroy=function(t){function e(){if(!this.destroyed){this.destroyed=W;var t=this.target,e=t.attr(se);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),s.each(this.plugins,function(){this.destroy&&this.destroy()}),clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this._unassignEvents(),t.removeData(X).removeAttr(H).removeAttr(Y).removeAttr("aria-describedby"),this.options.suppress&&e&&t.attr("title",e).removeAttr(se),this._unbind(t),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=E,delete T.api[this.id]}}return this.destroyed?this.target:(t===W&&"hide"!==this.triggering||!this.rendered?e.call(this):(this.tooltip.one("tooltiphidden",s.proxy(e,this)),!this.triggering&&this.hide()),this.target)},M=j.checks={builtin:{"^id$":function(t,e,i,o){var n=i===W?T.nextid:i,r=X+"-"+n;n!==k&&n.length>0&&!s("#"+r).length?(this._id=r,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):t[e]=o},"^prerender":function(t,e,i){i&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(t,e,i){this._updateContent(i)},"^content.attr$":function(t,e,i,s){this.options.content.text===this.target.attr(s)&&this._updateContent(this.target.attr(i))},"^content.title$":function(t,e,s){return s?(s&&!this.elements.title&&this._createTitle(),this._updateTitle(s),i):this._removeTitle()},"^content.button$":function(t,e,i){this._updateButton(i)},"^content.title.(text|button)$":function(t,e,i){this.set("content."+e,i)},"^position.(my|at)$":function(t,e,i){"string"==typeof i&&(t[e]=new z(i,"at"===e))},"^position.container$":function(t,e,i){this.rendered&&this.tooltip.appendTo(i)},"^show.ready$":function(t,e,i){i&&(!this.rendered&&this.render(W)||this.toggle(W))},"^style.classes$":function(t,e,i,s){this.rendered&&this.tooltip.removeClass(s).addClass(i)},"^style.(width|height)":function(t,e,i){this.rendered&&this.tooltip.css(e,i)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(t,e,i){this.rendered&&this.tooltip.toggleClass(K,!!i)},"^events.(render|show|move|hide|focus|blur)$":function(t,e,i){this.rendered&&this.tooltip[(s.isFunction(i)?"":"un")+"bind"]("tooltip"+e,i)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var t=this.options.position;this.tooltip.attr("tracking","mouse"===t.target&&t.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},j.get=function(t){if(this.destroyed)return this;var e=h(this.options,t.toLowerCase()),i=e[0][e[1]];return i.precedance?i.string():i};var ne=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,re=/^prerender|show\.ready/i;j.set=function(t,e){if(this.destroyed)return this;var o,n=this.rendered,r=k,c=this.options;return this.checks,"string"==typeof t?(o=t,t={},t[o]=e):t=s.extend({},t),s.each(t,function(e,o){if(n&&re.test(e))return delete t[e],i;var a,l=h(c,e.toLowerCase());a=l[0][l[1]],l[0][l[1]]=o&&o.nodeType?s(o):o,r=ne.test(e)||r,t[e]=[l[0],l[1],o,a]}),a(c),this.positioning=W,s.each(t,s.proxy(l,this)),this.positioning=k,this.rendered&&this.tooltip[0].offsetWidth>0&&r&&this.reposition("mouse"===c.position.target?E:this.cache.event),this},j._update=function(t,e){var i=this,o=this.cache;return this.rendered&&t?(s.isFunction(t)&&(t=t.call(this.elements.target,o.event,this)||""),s.isFunction(t.then)?(o.waiting=W,t.then(function(t){return o.waiting=k,i._update(t,e)},E,function(t){return i._update(t,e)})):t===k||!t&&""!==t?k:(t.jquery&&t.length>0?e.empty().append(t.css({display:"block",visibility:"visible"})):e.html(t),this._waitForContent(e).then(function(t){t.images&&t.images.length&&i.rendered&&i.tooltip[0].offsetWidth>0&&i.reposition(o.event,!t.length)}))):k},j._waitForContent=function(t){var e=this.cache;return e.waiting=W,(s.fn.imagesLoaded?t.imagesLoaded():s.Deferred().resolve([])).done(function(){e.waiting=k}).promise()},j._updateContent=function(t,e){this._update(t,this.elements.content,e)},j._updateTitle=function(t,e){this._update(t,this.elements.title,e)===k&&this._removeTitle(k)},j._createTitle=function(){var t=this.elements,e=this._id+"-title";t.titlebar&&this._removeTitle(),t.titlebar=s("<div />",{"class":X+"-titlebar "+(this.options.style.widget?c("header"):"")}).append(t.title=s("<div />",{id:e,"class":X+"-title","aria-atomic":W})).insertBefore(t.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(t){s(this).toggleClass("ui-state-active ui-state-focus","down"===t.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(t){s(this).toggleClass("ui-state-hover","mouseover"===t.type)}),this.options.content.button&&this._createButton()},j._removeTitle=function(t){var e=this.elements;e.title&&(e.titlebar.remove(),e.titlebar=e.title=e.button=E,t!==k&&this.reposition())},j.reposition=function(i,o){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=W;var n,r,a=this.cache,h=this.tooltip,l=this.options.position,c=l.target,d=l.my,p=l.at,u=l.viewport,f=l.container,g=l.adjust,m=g.method.split(" "),v=h.outerWidth(k),y=h.outerHeight(k),b=0,w=0,_=h.css("position"),x={left:0,top:0},q=h[0].offsetWidth>0,C=i&&"scroll"===i.type,T=s(t),j=f[0].ownerDocument,z=this.mouse;if(s.isArray(c)&&2===c.length)p={x:F,y:D},x={left:c[0],top:c[1]};else if("mouse"===c)p={x:F,y:D},!z||!z.pageX||!g.mouse&&i&&i.pageX?i&&i.pageX||((!g.mouse||this.options.show.distance)&&a.origin&&a.origin.pageX?i=a.origin:(!i||i&&("resize"===i.type||"scroll"===i.type))&&(i=a.event)):i=z,"static"!==_&&(x=f.offset()),j.body.offsetWidth!==(t.innerWidth||j.documentElement.clientWidth)&&(r=s(e.body).offset()),x={left:i.pageX-x.left+(r&&r.left||0),top:i.pageY-x.top+(r&&r.top||0)},g.mouse&&C&&z&&(x.left-=(z.scrollX||0)-T.scrollLeft(),x.top-=(z.scrollY||0)-T.scrollTop());else{if("event"===c?i&&i.target&&"scroll"!==i.type&&"resize"!==i.type?a.target=s(i.target):i.target||(a.target=this.elements.target):"event"!==c&&(a.target=s(c.jquery?c:this.elements.target)),c=a.target,c=s(c).eq(0),0===c.length)return this;c[0]===e||c[0]===t?(b=oe.iOS?t.innerWidth:c.width(),w=oe.iOS?t.innerHeight:c.height(),c[0]===t&&(x={top:(u||c).scrollTop(),left:(u||c).scrollLeft()})):R.imagemap&&c.is("area")?n=R.imagemap(this,c,p,R.viewport?m:k):R.svg&&c&&c[0].ownerSVGElement?n=R.svg(this,c,p,R.viewport?m:k):(b=c.outerWidth(k),w=c.outerHeight(k),x=c.offset()),n&&(b=n.width,w=n.height,r=n.offset,x=n.position),x=this.reposition.offset(c,x,f),(oe.iOS>3.1&&4.1>oe.iOS||oe.iOS>=4.3&&4.33>oe.iOS||!oe.iOS&&"fixed"===_)&&(x.left-=T.scrollLeft(),x.top-=T.scrollTop()),(!n||n&&n.adjustable!==k)&&(x.left+=p.x===P?b:p.x===N?b/2:0,x.top+=p.y===O?w:p.y===N?w/2:0)}return x.left+=g.x+(d.x===P?-v:d.x===N?-v/2:0),x.top+=g.y+(d.y===O?-y:d.y===N?-y/2:0),R.viewport?(x.adjusted=R.viewport(this,x,l,b,w,v,y),r&&x.adjusted.left&&(x.left+=r.left),r&&x.adjusted.top&&(x.top+=r.top)):x.adjusted={left:0,top:0},this._trigger("move",[x,u.elem||u],i)?(delete x.adjusted,o===k||!q||isNaN(x.left)||isNaN(x.top)||"mouse"===c||!s.isFunction(l.effect)?h.css(x):s.isFunction(l.effect)&&(l.effect.call(h,this,s.extend({},x)),h.queue(function(t){s(this).css({opacity:"",height:""}),oe.ie&&this.style.removeAttribute("filter"),t()})),this.positioning=k,this):this},j.reposition.offset=function(t,i,o){function n(t,e){i.left+=e*t.scrollLeft(),i.top+=e*t.scrollTop()}if(!o[0])return i;var r,a,h,l,c=s(t[0].ownerDocument),d=!!oe.ie&&"CSS1Compat"!==e.compatMode,p=o[0];do"static"!==(a=s.css(p,"position"))&&("fixed"===a?(h=p.getBoundingClientRect(),n(c,-1)):(h=s(p).position(),h.left+=parseFloat(s.css(p,"borderLeftWidth"))||0,h.top+=parseFloat(s.css(p,"borderTopWidth"))||0),i.left-=h.left+(parseFloat(s.css(p,"marginLeft"))||0),i.top-=h.top+(parseFloat(s.css(p,"marginTop"))||0),r||"hidden"===(l=s.css(p,"overflow"))||"visible"===l||(r=s(p)));while(p=p.offsetParent);return r&&(r[0]!==c[0]||d)&&n(r,1),i};var ae=(z=j.reposition.Corner=function(t,e){t=(""+t).replace(/([A-Z])/," $1").replace(/middle/gi,N).toLowerCase(),this.x=(t.match(/left|right/i)||t.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(t.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!e;var i=t.charAt(0);this.precedance="t"===i||"b"===i?L:S}).prototype;ae.invert=function(t,e){this[t]=this[t]===F?P:this[t]===P?F:e||this[t]},ae.string=function(){var t=this.x,e=this.y;return t===e?t:this.precedance===L||this.forceY&&"center"!==e?e+" "+t:t+" "+e},ae.abbrev=function(){var t=this.string().split(" ");return t[0].charAt(0)+(t[1]&&t[1].charAt(0)||"")},ae.clone=function(){return new z(this.string(),this.forceY)},j.toggle=function(t,i){var o=this.cache,n=this.options,r=this.tooltip;if(i){if(/over|enter/.test(i.type)&&/out|leave/.test(o.event.type)&&n.show.target.add(i.target).length===n.show.target.length&&r.has(i.relatedTarget).length)return this;o.event=d(i)}if(this.waiting&&!t&&(this.hiddenDuringWait=W),!this.rendered)return t?this.render(1):this;if(this.destroyed||this.disabled)return this;var a,h,l,c=t?"show":"hide",p=this.options[c],u=(this.options[t?"hide":"show"],this.options.position),f=this.options.content,g=this.tooltip.css("width"),m=this.tooltip.is(":visible"),v=t||1===p.target.length,y=!i||2>p.target.length||o.target[0]===i.target;return(typeof t).search("boolean|number")&&(t=!m),a=!r.is(":animated")&&m===t&&y,h=a?E:!!this._trigger(c,[90]),this.destroyed?this:(h!==k&&t&&this.focus(i),!h||a?this:(s.attr(r[0],"aria-hidden",!t),t?(o.origin=d(this.mouse),s.isFunction(f.text)&&this._updateContent(f.text,k),s.isFunction(f.title)&&this._updateTitle(f.title,k),!I&&"mouse"===u.target&&u.adjust.mouse&&(s(e).bind("mousemove."+X,this._storeMouse),I=W),g||r.css("width",r.outerWidth(k)),this.reposition(i,arguments[2]),g||r.css("width",""),p.solo&&("string"==typeof p.solo?s(p.solo):s(U,p.solo)).not(r).not(p.target).qtip("hide",s.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete o.origin,I&&!s(U+'[tracking="true"]:visible',p.solo).not(r).length&&(s(e).unbind("mousemove."+X),I=k),this.blur(i)),l=s.proxy(function(){t?(oe.ie&&r[0].style.removeAttribute("filter"),r.css("overflow",""),"string"==typeof p.autofocus&&s(this.options.show.autofocus,r).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):r.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(t?"visible":"hidden")},this),p.effect===k||v===k?(r[c](),l()):s.isFunction(p.effect)?(r.stop(1,1),p.effect.call(r,this),r.queue("fx",function(t){l(),t()})):r.fadeTo(90,t?1:0,l),t&&p.target.trigger("qtip-"+this.id+"-inactive"),this))},j.show=function(t){return this.toggle(W,t)},j.hide=function(t){return this.toggle(k,t)},j.focus=function(t){if(!this.rendered||this.destroyed)return this;var e=s(U),i=this.tooltip,o=parseInt(i[0].style.zIndex,10),n=T.zindex+e.length;return i.hasClass(Z)||this._trigger("focus",[n],t)&&(o!==n&&(e.each(function(){this.style.zIndex>o&&(this.style.zIndex=this.style.zIndex-1)}),e.filter("."+Z).qtip("blur",t)),i.addClass(Z)[0].style.zIndex=n),this},j.blur=function(t){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass(Z),this._trigger("blur",[this.tooltip.css("zIndex")],t),this)},j.disable=function(t){return this.destroyed?this:("toggle"===t?t=!(this.rendered?this.tooltip.hasClass(ee):this.disabled):"boolean"!=typeof t&&(t=W),this.rendered&&this.tooltip.toggleClass(ee,t).attr("aria-disabled",t),this.disabled=!!t,this)},j.enable=function(){return this.disable(k)},j._createButton=function(){var t=this,e=this.elements,i=e.tooltip,o=this.options.content.button,n="string"==typeof o,r=n?o:"Close tooltip";e.button&&e.button.remove(),e.button=o.jquery?o:s("<a />",{"class":"qtip-close "+(this.options.style.widget?"":X+"-icon"),title:r,"aria-label":r}).prepend(s("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),e.button.appendTo(e.titlebar||i).attr("role","button").click(function(e){return i.hasClass(ee)||t.hide(e),k})},j._updateButton=function(t){if(!this.rendered)return k;var e=this.elements.button;t?this._createButton():e.remove()},j._setWidget=function(){var t=this.options.style.widget,e=this.elements,i=e.tooltip,s=i.hasClass(ee);i.removeClass(ee),ee=t?"ui-state-disabled":"qtip-disabled",i.toggleClass(ee,s),i.toggleClass("ui-helper-reset "+c(),t).toggleClass(K,this.options.style.def&&!t),e.content&&e.content.toggleClass(c("content"),t),e.titlebar&&e.titlebar.toggleClass(c("header"),t),e.button&&e.button.toggleClass(X+"-icon",!t)},j._storeMouse=function(t){(this.mouse=d(t)).type="mousemove"},j._bind=function(t,e,i,o,n){var r="."+this._id+(o?"-"+o:"");e.length&&s(t).bind((e.split?e:e.join(r+" "))+r,s.proxy(i,n||this))},j._unbind=function(t,e){s(t).unbind("."+this._id+(e?"-"+e:""))};var he="."+X;s(function(){v(U,["mouseenter","mouseleave"],function(t){var e="mouseenter"===t.type,i=s(t.currentTarget),o=s(t.relatedTarget||t.target),n=this.options;e?(this.focus(t),i.hasClass(J)&&!i.hasClass(ee)&&clearTimeout(this.timers.hide)):"mouse"===n.position.target&&n.hide.event&&n.show.target&&!o.closest(n.show.target[0]).length&&this.hide(t),i.toggleClass(te,e)}),v("["+H+"]",Q,g)}),j._trigger=function(t,e,i){var o=s.Event("tooltip"+t);return o.originalEvent=i&&s.extend({},i)||this.cache.event||E,this.triggering=t,this.tooltip.trigger(o,[this].concat(e||[])),this.triggering=k,!o.isDefaultPrevented()},j._bindEvents=function(t,e,o,n,r,a){if(n.add(o).length===n.length){var h=[];e=s.map(e,function(e){var o=s.inArray(e,t);return o>-1?(h.push(t.splice(o,1)[0]),i):e}),h.length&&this._bind(o,h,function(t){var e=this.rendered?this.tooltip[0].offsetWidth>0:!1;(e?a:r).call(this,t)})}this._bind(o,t,r),this._bind(n,e,a)},j._assignInitialEvents=function(t){function e(t){return this.disabled||this.destroyed?k:(this.cache.event=d(t),this.cache.target=t?s(t.target):[i],clearTimeout(this.timers.show),this.timers.show=p.call(this,function(){this.render("object"==typeof t||o.show.ready)},o.show.delay),i)}var o=this.options,n=o.show.target,r=o.hide.target,a=o.show.event?s.trim(""+o.show.event).split(" "):[],h=o.hide.event?s.trim(""+o.hide.event).split(" "):[];/mouse(over|enter)/i.test(o.show.event)&&!/mouse(out|leave)/i.test(o.hide.event)&&h.push("mouseleave"),this._bind(n,"mousemove",function(t){this._storeMouse(t),this.cache.onTarget=W}),this._bindEvents(a,h,n,r,e,function(){clearTimeout(this.timers.show)}),(o.show.ready||o.prerender)&&e.call(this,t)},j._assignEvents=function(){var i=this,o=this.options,n=o.position,r=this.tooltip,a=o.show.target,h=o.hide.target,l=n.container,c=n.viewport,d=s(e),p=(s(e.body),s(t)),v=o.show.event?s.trim(""+o.show.event).split(" "):[],y=o.hide.event?s.trim(""+o.hide.event).split(" "):[];s.each(o.events,function(t,e){i._bind(r,"toggle"===t?["tooltipshow","tooltiphide"]:["tooltip"+t],e,null,r)}),/mouse(out|leave)/i.test(o.hide.event)&&"window"===o.hide.leave&&this._bind(d,["mouseout","blur"],function(t){/select|option/.test(t.target.nodeName)||t.relatedTarget||this.hide(t)}),o.hide.fixed?h=h.add(r.addClass(J)):/mouse(over|enter)/i.test(o.show.event)&&this._bind(h,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+o.hide.event).indexOf("unfocus")>-1&&this._bind(l.closest("html"),["mousedown","touchstart"],function(t){var e=s(t.target),i=this.rendered&&!this.tooltip.hasClass(ee)&&this.tooltip[0].offsetWidth>0,o=e.parents(U).filter(this.tooltip[0]).length>0;e[0]===this.target[0]||e[0]===this.tooltip[0]||o||this.target.has(e[0]).length||!i||this.hide(t)}),"number"==typeof o.hide.inactive&&(this._bind(a,"qtip-"+this.id+"-inactive",g),this._bind(h.add(r),T.inactiveEvents,g,"-inactive")),this._bindEvents(v,y,a,h,u,f),this._bind(a.add(r),"mousemove",function(t){if("number"==typeof o.hide.distance){var e=this.cache.origin||{},i=this.options.hide.distance,s=Math.abs;(s(t.pageX-e.pageX)>=i||s(t.pageY-e.pageY)>=i)&&this.hide(t)}this._storeMouse(t)}),"mouse"===n.target&&n.adjust.mouse&&(o.hide.event&&this._bind(a,["mouseenter","mouseleave"],function(t){this.cache.onTarget="mouseenter"===t.type}),this._bind(d,"mousemove",function(t){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(ee)&&this.tooltip[0].offsetWidth>0&&this.reposition(t)})),(n.adjust.resize||c.length)&&this._bind(s.event.special.resize?c:p,"resize",m),n.adjust.scroll&&this._bind(p.add(n.container),"scroll",m)},j._unassignEvents=function(){var i=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],t,e];this._unbind(s([]).pushStack(s.grep(i,function(t){return"object"==typeof t})))},T=s.fn.qtip=function(t,e,o){var n=(""+t).toLowerCase(),r=E,h=s.makeArray(arguments).slice(1),l=h[h.length-1],c=this[0]?s.data(this[0],X):E;return!arguments.length&&c||"api"===n?c:"string"==typeof t?(this.each(function(){var t=s.data(this,X);if(!t)return W;if(l&&l.timeStamp&&(t.cache.event=l),!e||"option"!==n&&"options"!==n)t[n]&&t[n].apply(t,h);else{if(o===i&&!s.isPlainObject(e))return r=t.get(e),k;t.set(e,o)}}),r!==E?r:this):"object"!=typeof t&&arguments.length?i:(c=a(s.extend(W,{},t)),this.each(function(t){var e,o;return o=s.isArray(c.id)?c.id[t]:c.id,o=!o||o===k||1>o.length||T.api[o]?T.nextid++:o,e=y(s(this),o,c),e===k?W:(T.api[o]=e,s.each(R,function(){"initialize"===this.initialize&&this(e)}),e._assignInitialEvents(l),i)}))},s.qtip=o,T.api={},s.each({attr:function(t,e){if(this.length){var i=this[0],o="title",n=s.data(i,"qtip");if(t===o&&n&&"object"==typeof n&&n.options.suppress)return 2>arguments.length?s.attr(i,se):(n&&n.options.content.attr===o&&n.cache.attr&&n.set("content.text",e),this.attr(se,e))}return s.fn["attr"+ie].apply(this,arguments)},clone:function(t){var e=(s([]),s.fn["clone"+ie].apply(this,arguments));return t||e.filter("["+se+"]").attr("title",function(){return s.attr(this,se)}).removeAttr(se),e}},function(t,e){if(!e||s.fn[t+ie])return W;var i=s.fn[t+ie]=s.fn[t];s.fn[t]=function(){return e.apply(this,arguments)||i.apply(this,arguments)}}),s.ui||(s["cleanData"+ie]=s.cleanData,s.cleanData=function(t){for(var e,i=0;(e=s(t[i])).length;i++)if(e.attr(Y))try{e.triggerHandler("removeqtip")}catch(o){}s["cleanData"+ie].apply(this,arguments)}),T.version="2.2.0",T.nextid=0,T.inactiveEvents=Q,T.zindex=15e3,T.defaults={prerender:k,id:k,overwrite:W,suppress:W,content:{text:W,attr:"title",title:k,button:k},position:{my:"top left",at:"bottom right",target:k,container:k,viewport:k,adjust:{x:0,y:0,mouse:W,scroll:W,resize:W,method:"flipinvert flipinvert"},effect:function(t,e){s(this).animate(e,{duration:200,queue:k})}},show:{target:k,event:"mouseenter",effect:W,delay:90,solo:k,ready:k,autofocus:k},hide:{target:k,event:"mouseleave",effect:W,delay:0,fixed:k,inactive:k,leave:"window",distance:k},style:{classes:"",widget:k,width:k,height:k,def:W},events:{render:E,move:E,show:E,hide:E,toggle:E,visible:E,hidden:E,focus:E,blur:E}};var le,ce="margin",de="border",pe="color",ue="background-color",fe="transparent",ge=" !important",me=!!e.createElement("canvas").getContext,ve=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,ye={},be=["Webkit","O","Moz","ms"];if(me)var we=t.devicePixelRatio||1,_e=function(){var t=e.createElement("canvas").getContext("2d");return t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||1}(),xe=we/_e;else var qe=function(t,e,i){return"<qtipvml:"+t+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(e||"")+' style="behavior: url(#default#VML); '+(i||"")+'" />'};s.extend(x.prototype,{init:function(t){var e,i;i=this.element=t.elements.tip=s("<div />",{"class":X+"-tip"}).prependTo(t.tooltip),me?(e=s("<canvas />").appendTo(this.element)[0].getContext("2d"),e.lineJoin="miter",e.miterLimit=1e5,e.save()):(e=qe("shape",'coordorigin="0,0"',"position:absolute;"),this.element.html(e+e),t._bind(s("*",i).add(i),["click","mousedown"],function(t){t.stopPropagation()},this._ns)),t._bind(t.tooltip,"tooltipmove",this.reposition,this._ns,this),this.create()},_swapDimensions:function(){this.size[0]=this.options.height,this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width,this.size[1]=this.options.height},_useTitle:function(t){var e=this.qtip.elements.titlebar;return e&&(t.y===D||t.y===N&&this.element.position().top+this.size[1]/2+this.options.offset<e.outerHeight(W))},_parseCorner:function(t){var e=this.qtip.options.position.my;return t===k||e===k?t=k:t===W?t=new z(e.string()):t.string||(t=new z(t),t.fixed=W),t},_parseWidth:function(t,e,i){var s=this.qtip.elements,o=de+b(e)+"Width";return(i?_(i,o):_(s.content,o)||_(this._useTitle(t)&&s.titlebar||s.content,o)||_(s.tooltip,o))||0},_parseRadius:function(t){var e=this.qtip.elements,i=de+b(t.y)+b(t.x)+"Radius";return 9>oe.ie?0:_(this._useTitle(t)&&e.titlebar||e.content,i)||_(e.tooltip,i)||0},_invalidColour:function(t,e,i){var s=t.css(e);return!s||i&&s===t.css(i)||ve.test(s)?k:s},_parseColours:function(t){var e=this.qtip.elements,i=this.element.css("cssText",""),o=de+b(t[t.precedance])+b(pe),n=this._useTitle(t)&&e.titlebar||e.content,r=this._invalidColour,a=[];return a[0]=r(i,ue)||r(n,ue)||r(e.content,ue)||r(e.tooltip,ue)||i.css(ue),a[1]=r(i,o,pe)||r(n,o,pe)||r(e.content,o,pe)||r(e.tooltip,o,pe)||e.tooltip.css(o),s("*",i).add(i).css("cssText",ue+":"+fe+ge+";"+de+":0"+ge+";"),a},_calculateSize:function(t){var e,i,s,o=t.precedance===L,n=this.options.width,r=this.options.height,a="c"===t.abbrev(),h=(o?n:r)*(a?.5:1),l=Math.pow,c=Math.round,d=Math.sqrt(l(h,2)+l(r,2)),p=[this.border/h*d,this.border/r*d];return p[2]=Math.sqrt(l(p[0],2)-l(this.border,2)),p[3]=Math.sqrt(l(p[1],2)-l(this.border,2)),e=d+p[2]+p[3]+(a?0:p[0]),i=e/d,s=[c(i*n),c(i*r)],o?s:s.reverse()},_calculateTip:function(t,e,i){i=i||1,e=e||this.size;var s=e[0]*i,o=e[1]*i,n=Math.ceil(s/2),r=Math.ceil(o/2),a={br:[0,0,s,o,s,0],bl:[0,0,s,0,0,o],tr:[0,o,s,0,s,o],tl:[0,0,0,o,s,o],tc:[0,o,n,0,s,o],bc:[0,0,s,0,n,o],rc:[0,0,s,r,0,o],lc:[s,0,s,o,0,r]};return a.lt=a.br,a.rt=a.bl,a.lb=a.tr,a.rb=a.tl,a[t.abbrev()]},_drawCoords:function(t,e){t.beginPath(),t.moveTo(e[0],e[1]),t.lineTo(e[2],e[3]),t.lineTo(e[4],e[5]),t.closePath()},create:function(){var t=this.corner=(me||oe.ie)&&this._parseCorner(this.options.corner);return(this.enabled=!!this.corner&&"c"!==this.corner.abbrev())&&(this.qtip.cache.corner=t.clone(),this.update()),this.element.toggle(this.enabled),this.corner},update:function(e,i){if(!this.enabled)return this;var o,n,r,a,h,l,c,d,p=this.qtip.elements,u=this.element,f=u.children(),g=this.options,m=this.size,v=g.mimic,y=Math.round;e||(e=this.qtip.cache.corner||this.corner),v===k?v=e:(v=new z(v),v.precedance=e.precedance,"inherit"===v.x?v.x=e.x:"inherit"===v.y?v.y=e.y:v.x===v.y&&(v[e.precedance]=e[e.precedance])),n=v.precedance,e.precedance===S?this._swapDimensions():this._resetDimensions(),o=this.color=this._parseColours(e),o[1]!==fe?(d=this.border=this._parseWidth(e,e[e.precedance]),g.border&&1>d&&!ve.test(o[1])&&(o[0]=o[1]),this.border=d=g.border!==W?g.border:d):this.border=d=0,c=this.size=this._calculateSize(e),u.css({width:c[0],height:c[1],lineHeight:c[1]+"px"}),l=e.precedance===L?[y(v.x===F?d:v.x===P?c[0]-m[0]-d:(c[0]-m[0])/2),y(v.y===D?c[1]-m[1]:0)]:[y(v.x===F?c[0]-m[0]:0),y(v.y===D?d:v.y===O?c[1]-m[1]-d:(c[1]-m[1])/2)],me?(r=f[0].getContext("2d"),r.restore(),r.save(),r.clearRect(0,0,6e3,6e3),a=this._calculateTip(v,m,xe),h=this._calculateTip(v,this.size,xe),f.attr(A,c[0]*xe).attr(B,c[1]*xe),f.css(A,c[0]).css(B,c[1]),this._drawCoords(r,h),r.fillStyle=o[1],r.fill(),r.translate(l[0]*xe,l[1]*xe),this._drawCoords(r,a),r.fillStyle=o[0],r.fill()):(a=this._calculateTip(v),a="m"+a[0]+","+a[1]+" l"+a[2]+","+a[3]+" "+a[4]+","+a[5]+" xe",l[2]=d&&/^(r|b)/i.test(e.string())?8===oe.ie?2:1:0,f.css({coordsize:c[0]+d+" "+(c[1]+d),antialias:""+(v.string().indexOf(N)>-1),left:l[0]-l[2]*Number(n===S),top:l[1]-l[2]*Number(n===L),width:c[0]+d,height:c[1]+d}).each(function(t){var e=s(this);e[e.prop?"prop":"attr"]({coordsize:c[0]+d+" "+(c[1]+d),path:a,fillcolor:o[0],filled:!!t,stroked:!t}).toggle(!(!d&&!t)),!t&&e.html(qe("stroke",'weight="'+2*d+'px" color="'+o[1]+'" miterlimit="1000" joinstyle="miter"'))})),t.opera&&setTimeout(function(){p.tip.css({display:"inline-block",visibility:"visible"})},1),i!==k&&this.calculate(e,c)},calculate:function(t,e){if(!this.enabled)return k;var i,o,n=this,r=this.qtip.elements,a=this.element,h=this.options.offset,l=(r.tooltip.hasClass("ui-widget"),{});return t=t||this.corner,i=t.precedance,e=e||this._calculateSize(t),o=[t.x,t.y],i===S&&o.reverse(),s.each(o,function(s,o){var a,c,d;o===N?(a=i===L?F:D,l[a]="50%",l[ce+"-"+a]=-Math.round(e[i===L?0:1]/2)+h):(a=n._parseWidth(t,o,r.tooltip),c=n._parseWidth(t,o,r.content),d=n._parseRadius(t),l[o]=Math.max(-n.border,s?c:h+(d>a?d:-a)))
}),l[t[i]]-=e[i===S?0:1],a.css({margin:"",top:"",bottom:"",left:"",right:""}).css(l),l},reposition:function(t,e,s){function o(t,e,i,s,o){t===V&&l.precedance===e&&c[s]&&l[i]!==N?l.precedance=l.precedance===S?L:S:t!==V&&c[s]&&(l[e]=l[e]===N?c[s]>0?s:o:l[e]===s?o:s)}function n(t,e,o){l[t]===N?g[ce+"-"+e]=f[t]=r[ce+"-"+e]-c[e]:(a=r[o]!==i?[c[e],-r[e]]:[-c[e],r[e]],(f[t]=Math.max(a[0],a[1]))>a[0]&&(s[e]-=c[e],f[e]=k),g[r[o]!==i?o:e]=f[t])}if(this.enabled){var r,a,h=e.cache,l=this.corner.clone(),c=s.adjusted,d=e.options.position.adjust.method.split(" "),p=d[0],u=d[1]||d[0],f={left:k,top:k,x:0,y:0},g={};this.corner.fixed!==W&&(o(p,S,L,F,P),o(u,L,S,D,O),l.string()===h.corner.string()||h.cornerTop===c.top&&h.cornerLeft===c.left||this.update(l,k)),r=this.calculate(l),r.right!==i&&(r.left=-r.right),r.bottom!==i&&(r.top=-r.bottom),r.user=this.offset,(f.left=p===V&&!!c.left)&&n(S,F,P),(f.top=u===V&&!!c.top)&&n(L,D,O),this.element.css(g).toggle(!(f.x&&f.y||l.x===N&&f.y||l.y===N&&f.x)),s.left-=r.left.charAt?r.user:p!==V||f.top||!f.left&&!f.top?r.left+this.border:0,s.top-=r.top.charAt?r.user:u!==V||f.left||!f.left&&!f.top?r.top+this.border:0,h.cornerLeft=c.left,h.cornerTop=c.top,h.corner=l.clone()}},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns),this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()}}),le=R.tip=function(t){return new x(t,t.options.style.tip)},le.initialize="render",le.sanitize=function(t){if(t.style&&"tip"in t.style){var e=t.style.tip;"object"!=typeof e&&(e=t.style.tip={corner:e}),/string|boolean/i.test(typeof e.corner)||(e.corner=W)}},M.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create(),this.qtip.reposition()},"^style.tip.(height|width)$":function(t){this.size=[t.width,t.height],this.update(),this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}},s.extend(W,T.defaults,{style:{tip:{corner:W,mimic:k,width:6,height:6,border:W,offset:0}}});var Ce,Te,je="qtip-modal",ze="."+je;Te=function(){function t(t){if(s.expr[":"].focusable)return s.expr[":"].focusable;var e,i,o,n=!isNaN(s.attr(t,"tabindex")),r=t.nodeName&&t.nodeName.toLowerCase();return"area"===r?(e=t.parentNode,i=e.name,t.href&&i&&"map"===e.nodeName.toLowerCase()?(o=s("img[usemap=#"+i+"]")[0],!!o&&o.is(":visible")):!1):/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||n:n}function i(t){1>c.length&&t.length?t.not("body").blur():c.first().focus()}function o(t){if(h.is(":visible")){var e,o=s(t.target),a=n.tooltip,l=o.closest(U);e=1>l.length?k:parseInt(l[0].style.zIndex,10)>parseInt(a[0].style.zIndex,10),e||o.closest(U)[0]===a[0]||i(o),r=t.target===c[c.length-1]}}var n,r,a,h,l=this,c={};s.extend(l,{init:function(){return h=l.elem=s("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return k}}).hide(),s(e.body).bind("focusin"+ze,o),s(e).bind("keydown"+ze,function(t){n&&n.options.show.modal.escape&&27===t.keyCode&&n.hide(t)}),h.bind("click"+ze,function(t){n&&n.options.show.modal.blur&&n.hide(t)}),l},update:function(e){n=e,c=e.options.show.modal.stealfocus!==k?e.tooltip.find("*").filter(function(){return t(this)}):[]},toggle:function(t,o,r){var c=(s(e.body),t.tooltip),d=t.options.show.modal,p=d.effect,u=o?"show":"hide",f=h.is(":visible"),g=s(ze).filter(":visible:not(:animated)").not(c);return l.update(t),o&&d.stealfocus!==k&&i(s(":focus")),h.toggleClass("blurs",d.blur),o&&h.appendTo(e.body),h.is(":animated")&&f===o&&a!==k||!o&&g.length?l:(h.stop(W,k),s.isFunction(p)?p.call(h,o):p===k?h[u]():h.fadeTo(parseInt(r,10)||90,o?1:0,function(){o||h.hide()}),o||h.queue(function(t){h.css({left:"",top:""}),s(ze).length||h.detach(),t()}),a=o,n.destroyed&&(n=E),l)}}),l.init()},Te=new Te,s.extend(q.prototype,{init:function(t){var e=t.tooltip;return this.options.on?(t.elements.overlay=Te.elem,e.addClass(je).css("z-index",T.modal_zindex+s(ze).length),t._bind(e,["tooltipshow","tooltiphide"],function(t,i,o){var n=t.originalEvent;if(t.target===e[0])if(n&&"tooltiphide"===t.type&&/mouse(leave|enter)/.test(n.type)&&s(n.relatedTarget).closest(Te.elem[0]).length)try{t.preventDefault()}catch(r){}else(!n||n&&"tooltipsolo"!==n.type)&&this.toggle(t,"tooltipshow"===t.type,o)},this._ns,this),t._bind(e,"tooltipfocus",function(t,i){if(!t.isDefaultPrevented()&&t.target===e[0]){var o=s(ze),n=T.modal_zindex+o.length,r=parseInt(e[0].style.zIndex,10);Te.elem[0].style.zIndex=n-1,o.each(function(){this.style.zIndex>r&&(this.style.zIndex-=1)}),o.filter("."+Z).qtip("blur",t.originalEvent),e.addClass(Z)[0].style.zIndex=n,Te.update(i);try{t.preventDefault()}catch(a){}}},this._ns,this),t._bind(e,"tooltiphide",function(t){t.target===e[0]&&s(ze).filter(":visible").not(e).last().qtip("focus",t)},this._ns,this),i):this},toggle:function(t,e,s){return t&&t.isDefaultPrevented()?this:(Te.toggle(this.qtip,!!e,s),i)},destroy:function(){this.qtip.tooltip.removeClass(je),this.qtip._unbind(this.qtip.tooltip,this._ns),Te.toggle(this.qtip,k),delete this.qtip.elements.overlay}}),Ce=R.modal=function(t){return new q(t,t.options.show.modal)},Ce.sanitize=function(t){t.show&&("object"!=typeof t.show.modal?t.show.modal={on:!!t.show.modal}:t.show.modal.on===i&&(t.show.modal.on=W))},T.modal_zindex=T.zindex-200,Ce.initialize="render",M.modal={"^show.modal.(on|blur)$":function(){this.destroy(),this.init(),this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}},s.extend(W,T.defaults,{show:{modal:{on:k,effect:W,blur:W,stealfocus:W,escape:W}}}),R.viewport=function(i,s,o,n,r,a,h){function l(t,e,i,o,n,r,a,h,l){var c=s[n],p=_[t],b=x[t],w=i===V,q=p===n?l:p===r?-l:-l/2,C=b===n?h:b===r?-h:-h/2,T=v[n]+y[n]-(f?0:u[n]),j=T-c,z=c+l-(a===A?g:m)-T,M=q-(_.precedance===t||p===_[e]?C:0)-(b===N?h/2:0);return w?(M=(p===n?1:-1)*q,s[n]+=j>0?j:z>0?-z:0,s[n]=Math.max(-u[n]+y[n],c-M,Math.min(Math.max(-u[n]+y[n]+(a===A?g:m),c+M),s[n],"center"===p?c-q:1e9))):(o*=i===$?2:0,j>0&&(p!==n||z>0)?(s[n]-=M+o,d.invert(t,n)):z>0&&(p!==r||j>0)&&(s[n]-=(p===N?-M:M)+o,d.invert(t,r)),v>s[n]&&-s[n]>z&&(s[n]=c,d=_.clone())),s[n]-c}var c,d,p,u,f,g,m,v,y,b=o.target,w=i.elements.tooltip,_=o.my,x=o.at,q=o.adjust,C=q.method.split(" "),T=C[0],j=C[1]||C[0],z=o.viewport,M=o.container,I=i.cache,W={left:0,top:0};return z.jquery&&b[0]!==t&&b[0]!==e.body&&"none"!==q.method?(u=M.offset()||W,f="static"===M.css("position"),c="fixed"===w.css("position"),g=z[0]===t?z.width():z.outerWidth(k),m=z[0]===t?z.height():z.outerHeight(k),v={left:c?0:z.scrollLeft(),top:c?0:z.scrollTop()},y=z.offset()||W,("shift"!==T||"shift"!==j)&&(d=_.clone()),W={left:"none"!==T?l(S,L,T,q.x,F,P,A,n,a):0,top:"none"!==j?l(L,S,j,q.y,D,O,B,r,h):0},d&&I.lastClass!==(p=X+"-pos-"+d.abbrev())&&w.removeClass(i.cache.lastClass).addClass(i.cache.lastClass=p),W):W},R.polys={polygon:function(t,e){var i,s,o,n={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10},adjustable:k},r=0,a=[],h=1,l=1,c=0,d=0;for(r=t.length;r--;)i=[parseInt(t[--r],10),parseInt(t[r+1],10)],i[0]>n.position.right&&(n.position.right=i[0]),i[0]<n.position.left&&(n.position.left=i[0]),i[1]>n.position.bottom&&(n.position.bottom=i[1]),i[1]<n.position.top&&(n.position.top=i[1]),a.push(i);if(s=n.width=Math.abs(n.position.right-n.position.left),o=n.height=Math.abs(n.position.bottom-n.position.top),"c"===e.abbrev())n.position={left:n.position.left+n.width/2,top:n.position.top+n.height/2};else{for(;s>0&&o>0&&h>0&&l>0;)for(s=Math.floor(s/2),o=Math.floor(o/2),e.x===F?h=s:e.x===P?h=n.width-s:h+=Math.floor(s/2),e.y===D?l=o:e.y===O?l=n.height-o:l+=Math.floor(o/2),r=a.length;r--&&!(2>a.length);)c=a[r][0]-n.position.left,d=a[r][1]-n.position.top,(e.x===F&&c>=h||e.x===P&&h>=c||e.x===N&&(h>c||c>n.width-h)||e.y===D&&d>=l||e.y===O&&l>=d||e.y===N&&(l>d||d>n.height-l))&&a.splice(r,1);n.position={left:a[0][0],top:a[0][1]}}return n},rect:function(t,e,i,s){return{width:Math.abs(i-t),height:Math.abs(s-e),position:{left:Math.min(t,i),top:Math.min(e,s)}}},_angles:{tc:1.5,tr:7/4,tl:5/4,bc:.5,br:.25,bl:.75,rc:2,lc:1,c:0},ellipse:function(t,e,i,s,o){var n=R.polys._angles[o.abbrev()],r=0===n?0:i*Math.cos(n*Math.PI),a=s*Math.sin(n*Math.PI);return{width:2*i-Math.abs(r),height:2*s-Math.abs(a),position:{left:t+r,top:e+a},adjustable:k}},circle:function(t,e,i,s){return R.polys.ellipse(t,e,i,i,s)}},R.svg=function(t,i,o){for(var n,r,a,h,l,c,d,p,u,f,g,m=s(e),v=i[0],y=s(v.ownerSVGElement),b=1,w=1,_=!0;!v.getBBox;)v=v.parentNode;if(!v.getBBox||!v.parentNode)return k;n=y.attr("width")||y.width()||parseInt(y.css("width"),10),r=y.attr("height")||y.height()||parseInt(y.css("height"),10);var x=(parseInt(i.css("stroke-width"),10)||0)/2;switch(x&&(b+=x/n,w+=x/r),v.nodeName){case"ellipse":case"circle":f=R.polys.ellipse(v.cx.baseVal.value,v.cy.baseVal.value,(v.rx||v.r).baseVal.value+x,(v.ry||v.r).baseVal.value+x,o);break;case"line":case"polygon":case"polyline":for(u=v.points||[{x:v.x1.baseVal.value,y:v.y1.baseVal.value},{x:v.x2.baseVal.value,y:v.y2.baseVal.value}],f=[],p=-1,c=u.numberOfItems||u.length;c>++p;)d=u.getItem?u.getItem(p):u[p],f.push.apply(f,[d.x,d.y]);f=R.polys.polygon(f,o);break;default:f=v.getBoundingClientRect(),f={width:f.width,height:f.height,position:{left:f.left,top:f.top}},_=!1}return g=f.position,y=y[0],_&&(y.createSVGPoint&&(a=v.getScreenCTM(),u=y.createSVGPoint(),u.x=g.left,u.y=g.top,h=u.matrixTransform(a),g.left=h.x,g.top=h.y),y.viewBox&&(l=y.viewBox.baseVal)&&l.width&&l.height&&(b*=n/l.width,w*=r/l.height)),g.left+=m.scrollLeft(),g.top+=m.scrollTop(),f},R.imagemap=function(t,e,i){e.jquery||(e=s(e));var o,n,r,a,h,l=e.attr("shape").toLowerCase().replace("poly","polygon"),c=s('img[usemap="#'+e.parent("map").attr("name")+'"]'),d=s.trim(e.attr("coords")),p=d.replace(/,$/,"").split(",");if(!c.length)return k;if("polygon"===l)a=R.polys.polygon(p,i);else{if(!R.polys[l])return k;for(r=-1,h=p.length,n=[];h>++r;)n.push(parseInt(p[r],10));a=R.polys[l].apply(this,n.concat(i))}return o=c.offset(),o.left+=Math.ceil((c.outerWidth(k)-c.width())/2),o.top+=Math.ceil((c.outerHeight(k)-c.height())/2),a.position.left+=o.left,a.position.top+=o.top,a};var Me,Ie='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';s.extend(C.prototype,{_scroll:function(){var e=this.qtip.elements.overlay;e&&(e[0].style.top=s(t).scrollTop()+"px")},init:function(i){var o=i.tooltip;1>s("select, object").length&&(this.bgiframe=i.elements.bgiframe=s(Ie).appendTo(o),i._bind(o,"tooltipmove",this.adjustBGIFrame,this._ns,this)),this.redrawContainer=s("<div/>",{id:X+"-rcontainer"}).appendTo(e.body),i.elements.overlay&&i.elements.overlay.addClass("qtipmodal-ie6fix")&&(i._bind(t,["scroll","resize"],this._scroll,this._ns,this),i._bind(o,["tooltipshow"],this._scroll,this._ns,this)),this.redraw()},adjustBGIFrame:function(){var t,e,i=this.qtip.tooltip,s={height:i.outerHeight(k),width:i.outerWidth(k)},o=this.qtip.plugins.tip,n=this.qtip.elements.tip;e=parseInt(i.css("borderLeftWidth"),10)||0,e={left:-e,top:-e},o&&n&&(t="x"===o.corner.precedance?[A,F]:[B,D],e[t[1]]-=n[t[0]]()),this.bgiframe.css(e).css(s)},redraw:function(){if(1>this.qtip.rendered||this.drawing)return this;var t,e,i,s,o=this.qtip.tooltip,n=this.qtip.options.style,r=this.qtip.options.position.container;return this.qtip.drawing=1,n.height&&o.css(B,n.height),n.width?o.css(A,n.width):(o.css(A,"").appendTo(this.redrawContainer),e=o.width(),1>e%2&&(e+=1),i=o.css("maxWidth")||"",s=o.css("minWidth")||"",t=(i+s).indexOf("%")>-1?r.width()/100:0,i=(i.indexOf("%")>-1?t:1)*parseInt(i,10)||e,s=(s.indexOf("%")>-1?t:1)*parseInt(s,10)||0,e=i+s?Math.min(Math.max(e,s),i):e,o.css(A,Math.round(e)).appendTo(r)),this.drawing=0,this},destroy:function(){this.bgiframe&&this.bgiframe.remove(),this.qtip._unbind([t,this.qtip.tooltip],this._ns)}}),Me=R.ie6=function(t){return 6===oe.ie?new C(t):k},Me.initialize="render",M.ie6={"^content|style$":function(){this.redraw()}}})})(window,document);
//@ sourceMappingURL=http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.map
//! moment.js
//! version : 2.3.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b){return function(c){return i(a.call(this,c),b)}}function c(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function d(){}function e(a){u(a),g(this,a)}function f(a){var b=o(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._input=a,this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function h(a){return 0>a?Math.ceil(a):Math.floor(a)}function i(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c}function j(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&bb.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a){return"[object Date]"===Object.prototype.toString.call(a)}function m(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&q(a[d])!==q(b[d]))&&g++;return g+f}function n(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Jb[a]||Kb[b]||b}return a}function o(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=n(c),b&&(d[b]=a[c]));return d}function p(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}bb[b]=function(e,f){var g,h,i=bb.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=bb().utc().set(d,a);return i.call(bb.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function q(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function r(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function s(a){return t(a)?366:365}function t(a){return 0===a%4&&0!==a%100||0===a%400}function u(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[gb]<0||a._a[gb]>11?gb:a._a[hb]<1||a._a[hb]>r(a._a[fb],a._a[gb])?hb:a._a[ib]<0||a._a[ib]>23?ib:a._a[jb]<0||a._a[jb]>59?jb:a._a[kb]<0||a._a[kb]>59?kb:a._a[lb]<0||a._a[lb]>999?lb:-1,a._pf._overflowDayOfYear&&(fb>b||b>hb)&&(b=hb),a._pf.overflow=b)}function v(a){a._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1}}function w(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function x(a){return a?a.toLowerCase().replace("_","-"):a}function y(a,b){return b.abbr=a,mb[a]||(mb[a]=new d),mb[a].set(b),mb[a]}function z(a){delete mb[a]}function A(a){var b,c,d,e,f=0,g=function(a){if(!mb[a]&&nb)try{require("./lang/"+a)}catch(b){}return mb[a]};if(!a)return bb.fn._lang;if(!k(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=x(a[f]).split("-"),b=e.length,d=x(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&m(e,d,!0)>=b-1)break;b--}f++}return bb.fn._lang}function B(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function C(a){var b,c,d=a.match(rb);for(b=0,c=d.length;c>b;b++)d[b]=Ob[d[b]]?Ob[d[b]]:B(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function D(a,b){return a.isValid()?(b=E(b,a.lang()),Lb[b]||(Lb[b]=C(b)),Lb[b](a)):a.lang().invalidDate()}function E(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(sb.lastIndex=0;d>=0&&sb.test(a);)a=a.replace(sb,c),sb.lastIndex=0,d-=1;return a}function F(a,b){var c;switch(a){case"DDDD":return vb;case"YYYY":case"GGGG":case"gggg":return wb;case"YYYYY":case"GGGGG":case"ggggg":return xb;case"S":case"SS":case"SSS":case"DDD":return ub;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return yb;case"a":case"A":return A(b._l)._meridiemParse;case"X":return Bb;case"Z":case"ZZ":return zb;case"T":return Ab;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"ww":case"W":case"WW":case"e":case"E":return tb;default:return c=new RegExp(N(M(a.replace("\\","")),"i"))}}function G(a){var b=(zb.exec(a)||[])[0],c=(b+"").match(Gb)||["-",0,0],d=+(60*c[1])+q(c[2]);return"+"===c[0]?-d:d}function H(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[gb]=q(b)-1);break;case"MMM":case"MMMM":d=A(c._l).monthsParse(b),null!=d?e[gb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[hb]=q(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=q(b));break;case"YY":e[fb]=q(b)+(q(b)>68?1900:2e3);break;case"YYYY":case"YYYYY":e[fb]=q(b);break;case"a":case"A":c._isPm=A(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[ib]=q(b);break;case"m":case"mm":e[jb]=q(b);break;case"s":case"ss":e[kb]=q(b);break;case"S":case"SS":case"SSS":e[lb]=q(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=G(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function I(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=K(a),a._w&&null==a._a[hb]&&null==a._a[gb]&&(f=function(b){return b?b.length<3?parseInt(b,10)>68?"19"+b:"20"+b:b:null==a._a[fb]?bb().weekYear():a._a[fb]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=X(f(g.GG),g.W||1,g.E,4,1):(i=A(a._l),j=null!=g.d?T(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=X(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[fb]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[fb]?d[fb]:a._a[fb],a._dayOfYear>s(e)&&(a._pf._overflowDayOfYear=!0),c=S(e,0,a._dayOfYear),a._a[gb]=c.getUTCMonth(),a._a[hb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[ib]+=q((a._tzm||0)/60),l[jb]+=q((a._tzm||0)%60),a._d=(a._useUTC?S:R).apply(null,l)}}function J(a){var b;a._d||(b=o(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],I(a))}function K(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function L(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=A(a._l),h=""+a._i,i=h.length,j=0;for(d=E(a._f,g).match(rb)||[],b=0;b<d.length;b++)e=d[b],c=(F(e,a).exec(h)||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Ob[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),H(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[ib]<12&&(a._a[ib]+=12),a._isPm===!1&&12===a._a[ib]&&(a._a[ib]=0),I(a),u(a)}function M(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function N(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function O(a){var b,c,d,e,f;if(0===a._f.length)return a._pf.invalidFormat=!0,a._d=new Date(0/0),void 0;for(e=0;e<a._f.length;e++)f=0,b=g({},a),v(b),b._f=a._f[e],L(b),w(b)&&(f+=b._pf.charsLeftOver,f+=10*b._pf.unusedTokens.length,b._pf.score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function P(a){var b,c=a._i,d=Cb.exec(c);if(d){for(b=4;b>0;b--)if(d[b]){a._f=Eb[b-1]+(d[6]||" ");break}for(b=0;4>b;b++)if(Fb[b][1].exec(c)){a._f+=Fb[b][0];break}zb.exec(c)&&(a._f+=" Z"),L(a)}else a._d=new Date(c)}function Q(b){var c=b._i,d=ob.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?P(b):k(c)?(b._a=c.slice(0),I(b)):l(c)?b._d=new Date(+c):"object"==typeof c?J(b):b._d=new Date(c)}function R(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function S(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function T(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function U(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function V(a,b,c){var d=eb(Math.abs(a)/1e3),e=eb(d/60),f=eb(e/60),g=eb(f/24),h=eb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",eb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,U.apply({},i)}function W(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=bb(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function X(a,b,c,d,e){var f,g,h=new Date(Date.UTC(a,0)).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:s(a-1)+g}}function Y(a){var b=a._i,c=a._f;return"undefined"==typeof a._pf&&v(a),null===b?bb.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=A().preparse(b)),bb.isMoment(b)?(a=g({},b),a._d=new Date(+b._d)):c?k(c)?O(a):L(a):Q(a),new e(a))}function Z(a,b){bb.fn[a]=bb.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),bb.updateOffset(this),this):this._d["get"+c+b]()}}function $(a){bb.duration.fn[a]=function(){return this._data[a]}}function _(a,b){bb.duration.fn["as"+a]=function(){return+this/b}}function ab(){"undefined"==typeof ender&&(this.moment=bb)}for(var bb,cb,db="2.3.1",eb=Math.round,fb=0,gb=1,hb=2,ib=3,jb=4,kb=5,lb=6,mb={},nb="undefined"!=typeof module&&module.exports,ob=/^\/?Date\((\-?\d+)/i,pb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,qb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,rb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,sb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,tb=/\d\d?/,ub=/\d{1,3}/,vb=/\d{3}/,wb=/\d{1,4}/,xb=/[+\-]?\d{1,6}/,yb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,zb=/Z|[\+\-]\d\d:?\d\d/i,Ab=/T/i,Bb=/[\+\-]?\d+(\.\d{1,3})?/,Cb=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?$/,Db="YYYY-MM-DDTHH:mm:ssZ",Eb=["YYYY-MM-DD","GGGG-[W]WW","GGGG-[W]WW-E","YYYY-DDD"],Fb=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Gb=/([\+\-]|\d\d)/gi,Hb="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Ib={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Jb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Kb={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Lb={},Mb="DDD w W M D d".split(" "),Nb="M D H h m s w W".split(" "),Ob={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return i(this.year()%100,2)},YYYY:function(){return i(this.year(),4)},YYYYY:function(){return i(this.year(),5)},gg:function(){return i(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return i(this.weekYear(),5)},GG:function(){return i(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return i(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return q(this.milliseconds()/100)},SS:function(){return i(q(this.milliseconds()/10),2)},SSS:function(){return i(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(a/60),2)+":"+i(q(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(10*a/6),4)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()}},Pb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Mb.length;)cb=Mb.pop(),Ob[cb+"o"]=c(Ob[cb],cb);for(;Nb.length;)cb=Nb.pop(),Ob[cb+cb]=b(Ob[cb],2);for(Ob.DDDD=b(Ob.DDD,3),g(d.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=bb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=bb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return W(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),bb=function(b,c,d,e){return"boolean"==typeof d&&(e=d,d=a),Y({_i:b,_f:c,_l:d,_strict:e,_isUTC:!1})},bb.utc=function(b,c,d,e){var f;return"boolean"==typeof d&&(e=d,d=a),f=Y({_useUTC:!0,_isUTC:!0,_l:d,_i:b,_f:c,_strict:e}).utc()},bb.unix=function(a){return bb(1e3*a)},bb.duration=function(a,b){var c,d,e,g=bb.isDuration(a),h="number"==typeof a,i=g?a._input:h?{}:a,j=null;return h?b?i[b]=a:i.milliseconds=a:(j=pb.exec(a))?(c="-"===j[1]?-1:1,i={y:0,d:q(j[hb])*c,h:q(j[ib])*c,m:q(j[jb])*c,s:q(j[kb])*c,ms:q(j[lb])*c}):(j=qb.exec(a))&&(c="-"===j[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},i={y:e(j[2]),M:e(j[3]),d:e(j[4]),h:e(j[5]),m:e(j[6]),s:e(j[7]),w:e(j[8])}),d=new f(i),g&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},bb.version=db,bb.defaultFormat=Db,bb.updateOffset=function(){},bb.lang=function(a,b){var c;return a?(b?y(x(a),b):null===b?(z(a),a="en"):mb[a]||A(a),c=bb.duration.fn._lang=bb.fn._lang=A(a),c._abbr):bb.fn._lang._abbr},bb.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),A(a)},bb.isMoment=function(a){return a instanceof e},bb.isDuration=function(a){return a instanceof f},cb=Pb.length-1;cb>=0;--cb)p(Pb[cb]);for(bb.normalizeUnits=function(a){return n(a)},bb.invalid=function(a){var b=bb.utc(0/0);return null!=a?g(b._pf,a):b._pf.userInvalidated=!0,b},bb.parseZone=function(a){return bb(a).parseZone()},g(bb.fn=e.prototype,{clone:function(){return bb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){return D(bb(this).utc(),"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return w(this)},isDSTShifted:function(){return this._a?this.isValid()&&m(this._a,(this._isUTC?bb.utc(this._a):bb(this._a)).toArray())>0:!1},parsingFlags:function(){return g({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=D(this,a||bb.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?bb.duration(+b,a):bb.duration(a,b),j(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?bb.duration(+b,a):bb.duration(a,b),j(this,c,-1),this},diff:function(a,b,c){var d,e,f=this._isUTC?bb(a).zone(this._offset||0):bb(a).local(),g=6e4*(this.zone()-f.zone());return b=n(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-bb(this).startOf("month")-(f-bb(f).startOf("month")))/d,e-=6e4*(this.zone()-bb(this).startOf("month").zone()-(f.zone()-bb(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:h(e)},from:function(a,b){return bb.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(bb(),a)},calendar:function(){var a=this.diff(bb().zone(this.zone()).startOf("day"),"days",!0),b=-6>a?"sameElse":-1>a?"lastWeek":0>a?"lastDay":1>a?"sameDay":2>a?"nextDay":7>a?"nextWeek":"sameElse";return this.format(this.lang().calendar(b,this))},isLeapYear:function(){return t(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=T(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),bb.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=n(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=n(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+bb(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+bb(a).startOf(b)},isSame:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)===+bb(a).startOf(b)},min:function(a){return a=bb.apply(null,arguments),this>a?this:a},max:function(a){return a=bb.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=G(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&j(this,bb.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?bb(a).zone():0,0===(this.zone()-a)%60},daysInMonth:function(){return r(this.year(),this.month())},dayOfYear:function(a){var b=eb((bb(this).startOf("day")-bb(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},weekYear:function(a){var b=W(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=W(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=W(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=n(a),this[a]()},set:function(a,b){return a=n(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=A(b),this)}}),cb=0;cb<Hb.length;cb++)Z(Hb[cb].toLowerCase().replace(/s$/,""),Hb[cb]);Z("year","FullYear"),bb.fn.days=bb.fn.day,bb.fn.months=bb.fn.month,bb.fn.weeks=bb.fn.week,bb.fn.isoWeeks=bb.fn.isoWeek,bb.fn.toJSON=bb.fn.toISOString,g(bb.duration.fn=f.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,i=this._data;i.milliseconds=e%1e3,a=h(e/1e3),i.seconds=a%60,b=h(a/60),i.minutes=b%60,c=h(b/60),i.hours=c%24,f+=h(c/24),i.days=f%30,g+=h(f/30),i.months=g%12,d=h(g/12),i.years=d},weeks:function(){return h(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*(this._months%12)+31536e6*q(this._months/12)},humanize:function(a){var b=+this,c=V(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=bb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=bb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=n(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=n(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:bb.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(cb in Ib)Ib.hasOwnProperty(cb)&&(_(cb,Ib[cb]),$(cb.toLowerCase()));_("Weeks",6048e5),bb.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},bb.lang("en",{ordinal:function(a){var b=a%10,c=1===q(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),nb?(module.exports=bb,ab()):"function"==typeof define&&define.amd?define("moment",function(a,b,c){return c.config().noGlobal!==!0&&ab(),bb}):ab()}).call(this);

