function stampaMese(dataInizio) {

    var giorni = dataInizio.daysInMonth();

    var template = $('#template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.giorni-mese');
    target.html('');

    for (var i = 1; i <= giorni; i++) {

        var dateComplete = moment({ year:dataInizio.year(), month:dataInizio.month(), day:i});
        var giorniHTML = compiled({

            'value' : i,
            'datecomplete' :  dateComplete.format('YYYY-MM-DD')

        });

        target.append(giorniHTML); 

    }

}

function stampaFeste(dataInizio) {

    var annoSelez = dataInizio.year();
    var meseSelez = dataInizio.month();

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
                elemento.append(" " + feste[i].name);
                elemento.addCLass('feste');qq
               
            }

        },
        error: function(request,state,error){

        }

    })


}

function init() {

    var i = 0;
    $('.fa-arrow-circle-left').hide();

    var data = ["2018-01-01", "2018-02-01", "2018-03-01", "2018-04-01", "2018-05-01", "2018-06-01", "2018-07-01", "2018-08-01", "2018-09-01", "2018-10-01", "2018-11-01", "2018-12-01"];
    var mesi = ['Gennaio', 'Febbraio', 'Marzo', ' Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

    $('.fa-arrow-circle-right').click(function(){
        $('.fa-arrow-circle-left').show();

         i++; 
         if (i == 11){
            $('.fa-arrow-circle-right').hide();
        }
       
         var dataInizio = moment(data[i]);
         $('#mese').html(mesi[dataInizio.month()]);
         stampaMese(dataInizio);
         stampaFeste(dataInizio);

        });
    $('.fa-arrow-circle-left').click(function(){
        $('.fa-arrow-circle-right').show();
        i--; 
        if (i == 0){
            $('.fa-arrow-circle-left').hide();
        }
      
        var dataInizio = moment(data[i]);
        $('#mese').html(mesi[dataInizio.month()]);
        stampaMese(dataInizio);
        stampaFeste(dataInizio);

    });

    var dataInizio = moment(data[i]);
    $('#mese').html(mesi[dataInizio.month()]);

    stampaMese(dataInizio);
    stampaFeste(dataInizio);


}

$(document).ready(init);