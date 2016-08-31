// ==UserScript==
// @name         myBIDMC
// @namespace    http://bidmc.samarmehta.com
// @downloadURL  https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @updateURL    https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @version      0.3
// @description  cosmetic changes for BIDMC OMR/POE/Team Census
// @author       samar mehta
// @match        https://holmes.caregroup.org/scripts/*
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
                "cephalexin", "cefazolin", "cefepime", "ceftaroline", "ceftazidime", "ceftolozane", "ceftriaxone",
                "doripenem", "ertapenem", "imipenem", "meropenem",
                "azithromycin", "clarithromycin", "erythromycin",
                "ciprofloxacin", "levofloxacin", "moxifloxacin",
                "doxycycline", "minocycline", "tetracycline", "tigecycline",
                "fosfomycin", "nitrofurantoin",
                "clindamycin", "metronidazole", "trimethoprim",
                "amikacin", "gentamicin", "tobramycin",
                "aztreonam",
                "fidaxomicin", "rifaximin",
                "rifampin",
                "polymixin",
                "daptomycin", "linezolid", "televancin", "vancomycin"]; 
var antiFUNG =  ["amphotericin",
                 "nystatin",
                 "flucytosine",
                 "griseofulvin",
                 "micafungin",
                 "fluconazole", "itraconazole", "posaconazole", "voriconazole",
                 "clotrimazole", "miconazole"];
var antiVIRS =  ["acyclovir", "valacyclovir",
                 "ganciclovir", "valgancyclovir",
                 "foscarnet",
                 "entacavir", "tenofovir", "lamivudine",
                 "boceprevir", "lepidasvir", "sofosbuvir",
                 "oseltamivir"];
var antiPARS =  ["atovaquone",
                 "ivermectin", "mebendazole", "pyrantel",
                 "praziquantel", "albendazole",
                 "chloroquine", "mefloquine", "primaquine"];


$(document).ready(function()
{
    var a = 0;
    var leaves = $("td").not(":has(table)");

    for (a = 0; a < antiBACT.length; a++) {
        leaves.filter(":contains(" + antiBACT[a] + ")").css("background", colorBACT);
    }

    for (a = 0; a < antiFUNG.length; a++) {
        leaves.filter(":contains(" + antiFUNG[a] + ")").css("background", colorFUNG);
    }

    for (a = 0; a < antiVIRS.length; a++) {
        leaves.filter(":contains(" + antiVIRS[a] + ")").css("background", colorVIRS);
    }

    for (a = 0; a < antiPARS.length; a++) {
        leaves.filter(":contains(" + antiPARS[a] + ")").css("background", colorPARS);
    }

    $("textarea").css("resize", "both");

    $("table").keypress(function () {
        alert("Hello world.");
    })
});

