$(document).ready(function() {
    
    $('#cep').mask('00000-000');

    
    $('#cep').on('blur', function() {
        var cep = $(this).val().replace(/\D/g, ''); 
        
        // Verifica se o CEP tem exatamente 8 dígitos
        if (cep.length === 8) {
            // Faz a requisição AJAX para a API ViaCEP
            $.ajax({
                url: 'https://viacep.com.br/ws/' + cep + '/json/',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    // Verifica se a API retornou erro (CEP inexistente)
                    if (!data.erro) {
                        // Preenche os campos com os dados retornados
                        $('#endereco').val(data.logradouro || ''); // Rua/avenida
                        $('#bairro').val(data.bairro || '');
                        $('#cidade').val(data.localidade || ''); // Cidade
                        $('#estado').val(data.uf || ''); // Estado (UF)
                    } else {
                        alert('CEP não encontrado. Verifique o valor digitado.');
                        // Limpa os campos se o CEP for inválido
                        $('#endereco').val('');
                        $('#bairro').val('');
                        $('#cidade').val('');
                        $('#estado').val('');
                    }
                },
                error: function() {
                    alert('Erro ao buscar informações do CEP. Tente novamente.');
                    // Limpa os campos em caso de erro
                    $('#endereco').val('');
                    $('#bairro').val('');
                    $('#cidade').val('');
                    $('#estado').val('');
                }
            });
        } else if (cep.length > 0) {
            // Se o CEP não tiver 8 dígitos e não estiver vazio, avisa o usuário
            alert('CEP inválido. Digite um CEP com 8 dígitos.');
        }
    });
});




