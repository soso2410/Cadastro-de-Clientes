$(document).ready(function () {

    $('#cep').mask('00000-000');

    $('#cep').on('blur', function () {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep.length === 8) {
            $.ajax({
                url: 'https://viacep.com.br/ws/' + cep + '/json/',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
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


    var contador = 1;
    $('form').on('submit', function (e) {
        e.preventDefault();
        var nome = $('#nome').val();
        var sobrenome = $('#sobrenome').val();
        var nomeCompleto = nome + ' ' + sobrenome;
        var endereco = $('#endereco').val();
        var numero = $('#numero').val();
        var enderecoCompleto = endereco + (numero ? ', ' + numero : ''); // Junta endereço e número, se houver
        var cep = $('#cep').val();
        var bairro = $('#bairro').val();
        var cidade = $('#cidade').val();
        var estado = $('#estado').val();
        var table = $('table');
        var tbody = table.find('tbody');
        if (tbody.length === 0) {
            tbody = $('<tbody></tbody>');
            table.append(tbody);
        }


        var row = '<tr>' +
            '<td>' + contador + '</td>' +
            '<td>' + nomeCompleto + '</td>' +
            '<td>' + enderecoCompleto + '</td>' +
            '<td>' + cep + '</td>' +
            '<td>' + bairro + '</td>' +
            '<td>' + cidade + '</td>' +
            '<td>' + estado + '</td>' +
            '</tr>';
        tbody.append(row);
        contador++;
        $('form')[0].reset();
    });
});






