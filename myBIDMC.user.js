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

var antibiotics = ["ampicillin", "piperacillin", "azithromycin",
                   "cefepime", "ceftaroline", "ceftazidime", "ceftriaxone",
                   "ciprofloxacin", "levofloxacin",
                   "meropenem",
                   "clindamycin", "metronidazole",
                   "aztreonam",
                   "doxycycline", "tigecycline",
                   "daptomycin", "linezolid", "vancomycin"];
var antimicrobials =  ["acyclovir", "fluconazole", "micafungin", "valacyclovir"];



$(document).ready(function()
{
    //$("#cnont").cols = 100;

    for (var a = 0; a < antibiotics.length; a++) {
        $("td:contains('" + antibiotics[a] + "')").css("background", "pink");
    }

    for (a = 0; a < antimicrobials.length; a++) {
        $("td:contains('" + antimicrobials[a] + "')").css("background", "powderblue");
    }

    //alert("Hello world.");
});

