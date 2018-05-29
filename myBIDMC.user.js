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
// @require      https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.js
// @resource     https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.css
// ==/UserScript==

// @require      https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.1.1/jquery.mark.min.js

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
GM_addStyle(".dispBACT       {background: pink;}");               // #FFC0CB
GM_addStyle(".dispFUNG       {background: powderblue;}");         // #B0E0E6
GM_addStyle(".dispVIRS       {background: darkseagreen;}");       // #8FBC8F
GM_addStyle(".dispPARS       {background: thistle;}");            // #D8BFD8

// ================================== SEARCH TERMS  =====================================

var antiBACT = ["cillin", "penem", "floxacin", "mycin", "cycline",   // common suffixes
                "cephalexin", "cefuroxime", "cefadroxil", "cefazolin", "cefepime", "cefpodoxime", "ceftaroline", "ceftazidime", "ceftolozane", "ceftriaxone", "ceclor",
                "Unasyn", "Augmentin", "Zosyn", "Flagyl",
                "ethambutol", "pyrazinamide", "rifampin", "isoniazid",
                "nitrofurantoin", "metronidazole", "trimethoprim", "amikacin", "gentamicin", "aztreonam", "sulfamethox",
                "fidaxomicin", "rifaximin", "linezolid", "tedizolid", "televancin",
                "polymyxin", "colistin", "bacitracin", "chlorhexidine"];
var antiFUNG =  ["conazole",  "isavucona", "fungin",                 // common suffixes
                 "amphotericin", "ambisome", "flucytosine", "griseofulvin",
                 "nystatin", "clotrimazole"];
var antiVIRS =  ["clovir",                                           // common suffixes
                 "foscarnet", "oseltamivir",
                 "navir", "tegravir", "cobicistat", "maraviroc", "enfuviritide",
                 "rilpivirine", "nevirapine", "etravirine", "efavirenz", "delaviridine", 
                 "tenofovir", "abacavir", "lamivudine", "emtricitabine", "zidovudine", 
                 "boceprevir", "lepidasvir", "sofosbuvir", "entacavir"];
var antiPARS =  ["bendazole", "oquine",                              // common suffixes
                 "ivermectin", "pyrantel", "praziquantel", "atovaquone",
                 "primaquine", "pyrimeth", "nifurtimox", "nitazoxanide"];

var BACT = ["staph", "strep", "coccus", "clostridium", "difficile",    // "bacteri"
            "bacterium", "bacter", "bacillus", "omonas",
            "klebsiella", "escheri", "legionella", "brucella", "bartonella",
            "anaplasm", "ehrlichi", "rickettsia", "borrelia", "lyme",
            "mycoba", "tubercul", "kansasii"];
var FUNG = ["yeast", "mold", "candida", "albicans", "glabrata", "kruseii", "aspergillus", "mucor", "scedosp", "cryptococ"]; // "fungus", "fungal"
var VIRS = ["EBV", "CMV", "HSV", "VZV", "influenza", "herpes", "adenovirus"]; // "virus", "viral"
var PARS = ["malaria", "strongyloid", "babesi", "cryptospor"]; // "parasite"

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

        //debugger ;
        
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

