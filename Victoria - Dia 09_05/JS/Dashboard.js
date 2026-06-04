document.addEventListener('DOMContentLoaded', () => {


    const dataElement = document.getElementById('dataAtual');
    if (dataElement) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dataElement.innerText = new Date().toLocaleDateString('pt-BR', options);
    }

    const formMedicao = document.getElementById('formMedicao');
    const displayResultado = document.getElementById('resultadoDisplay');

    const spanConsumo = document.getElementById('resConsumo');
    const spanValorAgua = document.getElementById('resAgua');
    const spanValorEsgoto = document.getElementById('resEsgoto');
    const spanValorTotal = document.getElementById('resTotal');
    const spanInfoExtra = document.getElementById('resInfoExtra');

    if (formMedicao) {
        formMedicao.addEventListener('submit', function (e) {
            e.preventDefault();

            const categoria = document.getElementById('categoriaTarifa').value;
            const leituraAnterior = parseFloat(document.getElementById('leituraAnterior').value);
            const leituraAtual = parseFloat(document.getElementById('leituraAtual').value);

            console.log("Anterior:", leituraAnterior, "Atual:", leituraAtual);
            console.log("aaaaaaaaa");

            if (isNaN(leituraAnterior) || isNaN(leituraAtual)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atenção!',
                    text: 'Por favor, insira valores numéricos válidos para as leituras.',
                    confirmButtonColor: '#124559'
                });
                return;
            }

            if (leituraAnterior > leituraAtual) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Digitação',
                    text: 'A leitura inicial não pode ser maior que a leitura atual e os números não podem ser negativos.',
                    confirmButtonColor: '#e74c3c'
                });
                return;
            }

            const consumoM3 = leituraAtual - leituraAnterior;
            let valorAgua = 0;
            let mensagemExtra = "";


            switch (categoria) {
                case "Vulneravel":
                    if (consumoM3 <= 10) {
                        valorAgua = 8.74;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 8.74 + ((consumoM3 - 10) * 1.10);
                    } else if (consumoM3 <= 30) {
                        valorAgua = 8.74 + (10 * 1.10) + ((consumoM3 - 20) * 3.67);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 8.74 + (10 * 1.10) + (10 * 3.67) + ((consumoM3 - 30) * 11.10);
                    } else {
                        valorAgua = 8.74 + (10 * 1.10) + (10 * 3.67) + (20 * 11.10) + ((consumoM3 - 50) * 12.26);
                    }
                    mensagemExtra = "Categoria Vulnerável: Benefício de tarifa super reduzida aplicado.";
                    break;

                case "Social1":
                    if (consumoM3 <= 10) {
                        valorAgua = 11.46;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 11.46 + ((consumoM3 - 10) * 2.18);
                    } else if (consumoM3 <= 30) {
                        valorAgua = 11.46 + (10 * 2.18) + ((consumoM3 - 20) * 7.79);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 11.46 + (10 * 2.18) + (10 * 7.79) + ((consumoM3 - 30) * 11.10);
                    } else {
                        valorAgua = 11.46 + (10 * 2.18) + (10 * 7.79) + (20 * 11.10) + ((consumoM3 - 50) * 12.26);
                    }
                    mensagemExtra = "Categoria Social 1: Tarifa social aplicada com sucesso.";
                    break;

                case "Social2":
                    if (consumoM3 <= 10) {
                        valorAgua = 20.21;
                    } else if (consumoM3 <= 15) {
                        valorAgua = 20.21 + ((consumoM3 - 10) * 3.20);
                    } else if (consumoM3 <= 20) {
                        valorAgua = 20.21 + (5 * 3.20) + ((consumoM3 - 15) * 6.40);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 20.21 + (5 * 3.20) + (5 * 6.40) + ((consumoM3 - 20) * 15.95);
                    } else {
                        valorAgua = 20.21 + (5 * 3.20) + (5 * 6.40) + (30 * 15.95) + ((consumoM3 - 50) * 17.57);
                    }
                    mensagemExtra = "Categoria Social 2: Faixas de consumo intermediárias aplicadas.";
                    break;

                case "Residencial":
                    if (consumoM3 <= 10) {
                        valorAgua = 40.42;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 40.42 + ((consumoM3 - 10) * 6.40);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 40.42 + (10 * 6.40) + ((consumoM3 - 20) * 15.95);
                    } else {
                        valorAgua = 40.42 + (10 * 6.40) + (30 * 15.95) + ((consumoM3 - 50) * 17.57);
                    }
                    mensagemExtra = "Categoria Residencial: Padrão de tarifação normal.";
                    break;

                case "Comercial":
                    if (consumoM3 <= 10) {
                        valorAgua = 81.57;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 81.57 + ((consumoM3 - 10) * 15.95);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 81.57 + (10 * 15.95) + ((consumoM3 - 20) * 30.57);
                    } else {
                        valorAgua = 81.57 + (10 * 15.95) + (30 * 30.57) + ((consumoM3 - 50) * 31.84);
                    }
                    mensagemExtra = "Categoria Comercial: Lembre-se, economia de água reduz custos operacionais.";
                    break;

                case "Assistencia":
                    if (consumoM3 <= 10) {
                        valorAgua = 40.78;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 40.78 + ((consumoM3 - 10) * 7.97);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 40.78 + (10 * 7.97) + ((consumoM3 - 20) * 15.34);
                    } else {
                        valorAgua = 40.78 + (10 * 7.97) + (30 * 15.34) + ((consumoM3 - 50) * 15.94);
                    }
                    mensagemExtra = "Categoria Assistência Social.";
                    break;

                case "Publica":
                    if (consumoM3 <= 10) {
                        valorAgua = 61.11;
                    } else if (consumoM3 <= 20) {
                        valorAgua = 61.11 + ((consumoM3 - 10) * 11.95);
                    } else if (consumoM3 <= 50) {
                        valorAgua = 61.11 + (10 * 11.95) + ((consumoM3 - 20) * 22.99);
                    } else {
                        valorAgua = 61.11 + (10 * 11.95) + (30 * 22.99) + ((consumoM3 - 50) * 23.90);
                    }
                    mensagemExtra = "Categoria Pública (Órgãos e Instituições).";
                    break;

                case "Rural":
                    valorAgua = 40.42;
                    mensagemExtra = "Categoria Rural: Valor fixado na taxa mínima.";
                    break;

                default:
                    valorAgua = 0;
            }

            const valorEsgoto = valorAgua;
            const valorTotalFatura = valorAgua + valorEsgoto;

            const novoRegistro = {
                data: new Date().toLocaleDateString('pt-BR'),
                leitura: leituraAtual.toFixed(2) + ' m³',
                consumo: consumoM3.toFixed(2) + ' m³',
                status: categoria.includes("Social") || categoria === "Vulneravel" ? "Social" : "Normal"
            };

            let historico = JSON.parse(localStorage.getItem('victoria_historico')) || [];

            historico.unshift(novoRegistro);

            if (historico.length > 10) historico.pop();

            localStorage.setItem('victoria_historico', JSON.stringify(historico));


            const formatarMoeda = (valor) => {
                return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            };

            if (spanConsumo) spanConsumo.innerText = `${consumoM3.toFixed(2)} m³`;
            if (spanValorAgua) spanValorAgua.innerText = formatarMoeda(valorAgua);
            if (spanValorEsgoto) spanValorEsgoto.innerText = formatarMoeda(valorEsgoto);
            if (spanValorTotal) spanValorTotal.innerText = formatarMoeda(valorTotalFatura);

            if (spanInfoExtra) {
                if (mensagemExtra !== "") {
                    spanInfoExtra.innerText = mensagemExtra;
                    spanInfoExtra.style.display = 'block';
                } else {
                    spanInfoExtra.style.display = 'none';
                }
            }

            if (displayResultado) {
                displayResultado.style.display = 'block';
                displayResultado.classList.remove('anima-slide');
                void displayResultado.offsetWidth;
                displayResultado.classList.add('anima-slide');
            }

            atualizarGraficoDashboard(valorAgua, valorEsgoto);

            Swal.fire({
                icon: 'success',
                title: 'Cálculo Realizado!',
                text: 'Os valores foram atualizados no seu painel.',
                timer: 2000,
                showConfirmButton: false
            });
        });
    }
});


function atualizarGraficoDashboard(agua, esgoto) {
    if (window.meuGrafico) {
        window.meuGrafico.data.datasets[0].data = [agua, esgoto];
        window.meuGrafico.update();
    }
}

