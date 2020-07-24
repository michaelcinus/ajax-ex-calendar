function stampaMese(mese) {

    var giorni = mese.daysInMonth();

    var template = $('#template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.giorni-mese');
    target.html('');

    for (var i = 1; i <= giorni; i++) {

        var dateComplete = moment({ year:mese.year(), month:mese.month(), day:i});
        var giorniHTML = compiled({

            'value' : i,
            'datecomplete' :  dateComplete.format('YYYY-MM-DD')

        });

        target.append(giorniHTML); 

    }

}

function stampaFeste(mese) {

    var annoSelez = mese.year();
    var meseSelez = mese.month();

    $.ajax({

        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data : {
            'year' : annoSelez,
            'month' : meseSelez,

        },
        success: function( data, state) {

            var feste = data['response'];
            for (var i = 0; i < feste.length; i++) {

                var elemento = $(".giorni-mese li[data-datecomplete='"+ feste[i].date + "']");
                elemento.addCLass('feste');
                elemento.append(" " + feste[i].name);
               
            }

        },
        error: function(request,state,error){

        }

    })


}

function init() {

    var mese = moment('2018-01-01');
    stampaMese(mese);
    stampaFeste(mese);

}

$(document).ready(init);