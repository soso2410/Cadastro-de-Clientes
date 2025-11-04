$(document).ready(function() {
    
    $('#cep').mask('00000-000');

    
    $('#cep').on('blur', function() {
        var cep = $(this).val().replace(/\D/g, ''); 

        
        if (cep.length === 8) {
            
            $.ajax({
                url: 'https://viacep.com.br/ws/' + cep + '/json/',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    
                    if (!data.erro) {
                        $('#endereco').val(data.logradouro || '');
                        $('#bairro').val(data.bairro || '');
                        $('#cidade').val(data.localidade || '');
                        $('#estado').val(data.uf || '');
                    }
                }
            });
        }
    });
});


