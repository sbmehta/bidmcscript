// ==UserScript==
// @name         myBIDMC
// @namespace    http://bidmc.samarmehta.com
// @version      0.1
// @description  cosmetic changes for BIDMC OMR/POE/Team Census
// @author       samar mehta
// @match        https://holmes.caregroup.org/scripts/nph-mgwcgi?MGWLPN=MYCROFT*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
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
var antiFUNG =  ["amphotericin", "fluconazole", "itraconazole", "micafungin", "posaconazole", "voriconazole"];
var antiVIRS =  ["acyclovir", "ganciclovir", "valacyclovir"];



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

    //alert("Hello world.");
});

