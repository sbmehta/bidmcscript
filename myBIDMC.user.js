// ==UserScript==
// @name         myBIDMC
// @namespace    http://bidmc.samarmehta.com
// @downloadURL  https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @updateURL    https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @version      0.2
// @description  cosmetic changes for BIDMC OMR/POE/Team Census
// @author       samar mehta
// @match        https://holmes.caregroup.org/scripts/nph-mgwcgi?MGWLPN=MYCROFT*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @resource     https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css
// ==/UserScript==



//Avoid conflicts
//this.$ = this.jQuery = jQuery.noConflict(true);

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

var colorBACT = "pink";
var colorFUNG = "powderblue";
var colorVIRS = "darkseagreen";
var colorPARS = "thistle";

var antiBACT = ["ampicillin", "amoxicillin", "nafcillin", "penicillin", "piperacillin",
                "cefepime", "ceftaroline", "ceftazidime", "ceftolozane", "ceftriaxone",
                "meropenem", "ertapenem",
                "azithromycin", "clarithromycin", "erythromycin",
                "ciprofloxacin", "levofloxacin",
                "doxycycline", "tigecycline",
                "fosfomycin", "nitrofurantoin",
                "clindamycin", "metronidazole", "trimethoprim",
                "aztreonam",
                "daptomycin", "linezolid", "vancomycin"];
var antiFUNG =  ["amphotericin",
                 "micafungin",
                 "fluconazole", "itraconazole", "posaconazole", "voriconazole"];
var antiVIRS =  ["acyclovir", "valacyclovir",
                 "ganciclovir", "valgancyclovir",
                 "foscarnet"];
var antiPARS =  ["atovaquone",
                 "ivermectin",
                 "chloroquine", "mefloquine", "primaquine"];


$(document).ready(function()
{
    //$("#cnont").cols = 100;
    var a = 0;

    for (a = 0; a < antiBACT.length; a++) {
        $("td:contains('" + antiBACT[a] + "')").css("background", colorBACT);
    }

    for (a = 0; a < antiFUNG.length; a++) {
        $("td:contains('" + antiFUNG[a] + "')").css("background", colorFUNG);
    }

    for (a = 0; a < antiVIRS.length; a++) {
        $("td:contains('" + antiVIRS[a] + "')").css("background", colorVIRS);
    }

    for (a = 0; a < antiPARS.length; a++) {
        $("td:contains('" + antiPARS[a] + "')").css("background", colorPARS);
    }

    //$("textarea").resizable();

    //alert("Hello world.");
});

