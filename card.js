$(function(){
  $('textarea:first').focus();
  
  function Calculate(Luhn)
   {
      var sum = 0;
      for (i=0; i<Luhn.length; i++ )
      {
   sum += parseInt(Luhn[i]);
      }
   var delta = new Array (0,1,2,3,4,-4,-3,-2,-1,0);
   for (x=Luhn.length-1; x>=0; x-=2 )
      {	
                sum += delta[parseInt(Luhn[x])];
   }	
        mod10 = 10 - (sum % 10);
        return mod10 == 10 ? 0 : mod10;
   }
  
   function Validate(Luhn)
   {
   var LuhnDigit = parseInt(Luhn[Luhn.length - 1]);
   var LuhnLess = Luhn.substring(0,Luhn.length-1);
   if (Calculate(LuhnLess)==parseInt(LuhnDigit)) return true;	
   return false;
   }

  
  $('#cc').keydown(function(e){
    var value = $(this).val(),
        name,
        type,
        card,
        maskedCard,
        exp,
        isValid,
        successful,
        i;
        
    function error() {
       successful = 'False';
       $('h2').html('Sorry, there was an error, please try again.');
    }
       
    if (value.match(/\?.+\?/)){
      if (value.match(/E\?/)){
        return error();
      } else {
        result = /^\%B(\d+)\^([\w\s\/]+)\s*?\^(\d{2})(\d{2})/.exec(value);
        if (result.length < 5) return error();
        name = result[2].trim();
        type = result[1][0];
        card = result[1];
        exp = result[4] + '/' + result[3];
        if (~name.indexOf('/')) {
           var parts = name.split('/');
           name = parts[1].trim() + ' ' + parts[0].trim();
        }
        $('.name').text(name);
        
          switch (type){
            case '3':
              type = "AMEX";
              break;
            case '4':
              type = "VISA";
              break;
            case '5':
              type = "Mastercard";
              break;
            case '6':
              type = "Discover";
              break;
          }
          $('.type').text(type);

          isValid = Validate(card);
          maskedCard = type == 'AMEX' || type == 'Discover' ? card.replace(/\d{11}/, 'x') : card.replace(/\d{12}/, 'x');
          $('.card').text(card);
          $('.masked_card').text(maskedCard);
        
          $('.exp').text(exp);
        
        successful = 'True';
        
        $('.successful').text(successful);
        $('.is_valid').text(isValid);
        $('h2').html('Card Accepted')
      }
    } else {
      $('h2').html('<span class="blink">Reading...</span>');

    }
  });
});