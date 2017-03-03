// ==UserScript==
// @name         myBIDMC
// @namespace    http://bidmc.samarmehta.com
// @downloadURL  https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @updateURL    https://github.com/sbmehta/bidmcscript/raw/master/myBIDMC.user.js
// @version      0.5
// @description  cosmetic changes for BIDMC OMR/POE/Team Census
// @author       samar mehta
// @match        https://holmes.caregroup.org/scripts/*
// @grant        GM_addStyle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @resource     https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css
// ==/UserScript==

// @require      https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.1.1/jquery.mark.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.js
// @resource     https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.css

//Avoid conflicts
//this.$ = this.jQuery = jQuery.noConflict(true);

// ================================= HELPER FUNCTIONS ======================================

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function classify(domain, wordlist, stylename) {
    for (var a = 0; a < wordlist.length; a++) {
        domain.filter(":contains(" + wordlist[a] + ")").addClass(stylename);
    }

//    domain.mark(wordlist, {"className": stylename, "accuracy": "complementary", "exclude":["textarea"]});
}

// ================================ STYLE DEFINITIONS ===================================

GM_addStyle(".dispHIGHLIGHT  {background: yellow !important;}");
GM_addStyle(".dispBACT       {background: pink;}");
GM_addStyle(".dispFUNG       {background: powderblue;}");
GM_addStyle(".dispVIRS       {background: darkseagreen;}");
GM_addStyle(".dispPARS       {background: thistle;}");
  
// ================================== SEARCH TERMS  =====================================

var antiBACT = ["cillin", "penem", "floxacin", "mycin", "cycline",   // common suffixes
                "cephalexin", "cefazolin", "cefepime", "cefpodoxime", "ceftaroline", "ceftazidime", "ceftolozane", "ceftriaxone",
                "Unasyn", "Augmentin", "Zosyn", "Flagyl",
                "nitrofurantoin", "metronidazole", "trimethoprim", "amikacin", "gentamicin", "aztreonam",
                "fidaxomicin", "rifaximin", "rifampin", "linezolid", "tedizolid", "televancin",
                "polymyxin", "colistin", "bacitracin", "chlorhexidine"];
var antiFUNG =  ["conazole",  "isavucona", "fungin",                              // common suffixes
                 "amphotericin", "flucytosine", "griseofulvin",
                 "nystatin", "clotrimazole"];
var antiVIRS =  ["clovir",                                           // common suffixes
                 "foscarnet", "oseltamivir",
                 "entacavir", "tenofovir", "lamivudine",
                 "boceprevir", "lepidasvir", "sofosbuvir"];
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

// ===================================== MAIN ========================================

$(document).ready(function()
{
    $("textarea").css("resize", "both");

    $("table").dblclick(function () {
        var table = $(this);
        var leaves = table.find("td").not(":has(table)").not("textarea");

        $(this).css("border", "3px solid midnightblue");

        leaves.dblclick(function () {
            $(this).toggleClass("dispHIGHLIGHT");
            //$(this).attr("contenteditable", "true");
        });

        classify(leaves, BACT.concat(antiBACT), "dispBACT");
        classify(leaves, VIRS.concat(antiVIRS), "dispVIRS");
        classify(leaves, FUNG.concat(antiFUNG), "dispFUNG");
        classify(leaves, PARS.concat(antiPARS), "dispPARS");

        //table.off("dblclick");
        
        /*$("img, td:contains('Review')").remove();
        $("font").unwrap("nobr");
        $("sub").parent().remove();
        $("a, font").replaceWith(function() {
           return this.childNodes;
       });
        $("td[colspan]").closest("tr").remove();
        $("td").removeAttr("align valign nowrap");*/
        $(this).html(function(i,h){
            //return h.replace(/&nbsp;/g,'').replace(/\*/g,'');
        });
    });
});

