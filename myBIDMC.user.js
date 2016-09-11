// ==UserScript==
// @name         myBIDMC
// @namespace    http://bidmc.samarmehta.com
// @downloadURL  https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @updateURL    https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @version      0.3
// @description  cosmetic changes for BIDMC OMR/POE/Team Census
// @author       samar mehta
// @match        https://holmes.caregroup.org/scripts/*
// @grant        GM_addStyle
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

function classify(domain, wordlist, stylename) {
    for (var a = 0; a < wordlist.length; a++) {
        domain.filter(":contains(" + wordlist[a] + ")").addClass(stylename);
    }
}

GM_addStyle(".dispHIGHLIGHT  {background: yellow !important;}");
GM_addStyle(".dispBACT       {background: pink;}");
GM_addStyle(".dispFUNG       {background: powderblue;}");
GM_addStyle(".dispVIRS       {background: darkseagreen;}");
GM_addStyle(".dispPARS       {background: thistle;}");

var antiBACT = ["cillin", "penem", "floxacin", "mycin", "cycline",   // common suffixes
                "cephalexin", "cefazolin", "cefepime", "cefpodoxime", "ceftaroline", "ceftazidime", "ceftolozane", "ceftriaxone",
                "Unasyn", "Augmentin", "Zosyn", "Flagyl", 
                "nitrofurantoin", "metronidazole", "trimethoprim",
                "amikacin", "gentamicin", "aztreonam",
                "fidaxomicin", "rifaximin",
                "rifampin", "linezolid", "televancin",
                "polymyxin", "colistin", 
                "bacitracin", "chlorhexidine"];
var antiFUNG =  ["conazole",                                         // common suffixes
                 "amphotericin",
                 "nystatin",
                 "flucytosine",
                 "griseofulvin",
                 "micafungin",
                 "clotrimazole"];
var antiVIRS =  ["clovir",                                           // common suffixes
                 "foscarnet",
                 "entacavir", "tenofovir", "lamivudine",
                 "boceprevir", "lepidasvir", "sofosbuvir",
                 "oseltamivir"];
var antiPARS =  ["bendazole", "oquine",                              // common suffixes
                 "ivermectin", "pyrantel", "praziquantel", "atovaquone",
                 "primaquine"];

var BACT = ["bacteri", "staph", "strep", "coccus", "clostridium", "difficile", 
            "bacterium", "bacter", "bacillus", "omonas",
            "klebsiella", "escheri", "legionella", "brucella", "bartonella",
            "anaplasm", "ehrlichi", "rickettsia", "borrelia", "lyme"];

var FUNG = ["fungus", "fungal", "yeast", "candida", "albicans", "glabrata", "kruseii", "aspergillus"];

var VIRS = ["virus", "viral", "EBV", "CMV", "HSV", "VZV", "influenza", "herpes", "adenovirus"];

var PARS = ["parasite", "malaria", "strongyloid"];

$(document).ready(function()
{
    var a = 0;
    var leaves = $("td").not(":has(table)");

    //alert("Doing my best here ...");

    classify(leaves, BACT, "dispBACT");
    classify(leaves, antiBACT, "dispBACT");
    classify(leaves, VIRS, "dispVIRS");
    classify(leaves, antiVIRS, "dispVIRS");
    classify(leaves, FUNG, "dispFUNG");
    classify(leaves, antiFUNG, "dispFUNG");
    classify(leaves, PARS, "dispPARS");
    classify(leaves, antiPARS, "dispPARS");

    $("textarea").css("resize", "both");

    $("table").dblclick(function () {
        var table = $(this);
        var cells = table.find("td").not(":has(table)");
        cells.click(function () {
            $(this).toggleClass("dispHIGHLIGHT");
            //$(this).attr("contenteditable", "true");
        });
        table.off("dblclick");
    });
    
});

