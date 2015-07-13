$(document).ready(function(){
  zE(function() {
    zE.setLocale('cn');
    console.log('cn set');
    zE.identify({
      name: 'John Citizen',
      email: 'john@example.com',
      externalId: '123',
      organization: 'VIP'
    });
    zE.show();
    zE.activate()
  });
});
