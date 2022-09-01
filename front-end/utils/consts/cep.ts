// https://ajuda.getcommerce.com.br/article/477-faixas-de-ceps-do-brasil
const CONSTS_CEP = [
    ['SP', 'SP Capital', 1000000, 5999999], // #01;
    ['SP', 'SP Capital', 8000000, 8499999], // #02;
    ['SP', 'SP Área Metropolitana', 6000000, 9999999],
    ['SP', 'SP Litoral', 11000000, 11999999],
    ['RJ', 'SP Interior', 12000000, 19999999],
    ['RJ', 'SP Todo o estado', 1000000, 19999999],
    ['RJ', 'RJ Capital', 20000000, 23799999],
    ['RJ', 'RJ Área Metropolitana', 20000000, 26600999],
    ['RJ', 'RJ Interior', 26601000, 28999999],
    ['RJ', 'RJ Todo o estado', 20000000, 28999999],
    ['ES', 'Vitória', 29000000, 29099999],
    ['ES', 'ES Interior', 29100000, 29999999],
    ['ES', 'ES Todo o estado', 29000000, 29999999],
    ['MG', 'Belo Horizonte', 30000000, 31999999],
    ['MG', 'MG Região Metropolitana Belo Horizonte', 30000000, 34999999],
    ['MG', 'MG Interior', 35000000, 39999999],
    ['MG', 'MG Todo o estado', 30000000, 39999999],
    ['BA', 'Salvador', 40000000, 41999999],
    ['BA', 'BA Região Metropolitana Salvador', 40000000, 44470999],
    ['BA', 'BA Interior', 44471000, 48999999],
    ['BA', 'BA Todo o estado', 40000000, 48999999],
    ['SE', 'Aracaju', 49000000, 49099999],
    ['SE', 'SE Interior', 49100000, 49999999],
    ['SE', 'SE Todo o estado', 49000000, 49999999],
    ['PE', 'Recife	', 50000000, 52999999],
    ['PE', 'PE Região Metropolitana Recife', 50000000, 54999999],
    ['PE', 'Interior', 55000000, 56999999],
    ['PE', 'PE Todo o estado', 50000000, 56999999],
    ['AL', 'Maceió', 57000000, 57099999],
    ['AL', 'AL Interior', 57100000, 57999999],
    ['AL', 'AL Todo o estado', 57000000, 57999999],
    ['PB', 'João Pessoa', 58000000, 58099999],
    ['PB', 'PB Interior', 58100000, 58999999],
    ['PB', 'PB Todo o estado', 58000000, 58999999],
    ['RN', 'Natal', 59000000, 59099999],
    ['RN', 'RN Interior', 59100000, 59999999],
    ['RN', 'RN Todo o estado', 59000000, 59999999],
    ['CE', 'Fortaleza', 60000000, 60999999],
    ['CE', 'CE Área Metropolitana Fortaleza', 60000000, 61900999],
    ['CE', 'CE Interior', 61901000, 63999999],
    ['CE', 'CE Todo o estado', 60000000, 63999999],
    ['PI', 'Teresina', 64000000, 64099999],
    ['PI', 'PI Interior', 64100000, 64999999],
    ['PI', 'PI Todo o estado', 64000000, 64999999],
    ['MA', 'São Luiz', 65000000, 65099999],
    ['MA', 'MA Interior', 65100000, 65999999],
    ['MA', 'MA Todo o estado', 65000000, 65999999],
    ['PA', 'Belém', 66000000, 66999999],
    ['PA', 'PA Região Metropolitana Belém', 66000000, 67999999],
    ['PA', 'PA Interior', 68000000, 68899999],
    ['PA', 'PA Todo o estado', 66000000, 68899999],
    ['AP', 'Macapá', 68900000, 68914999],
    ['AP', 'AP Interior', 68915000, 68999999],
    ['AP', 'AP Todo o estado', 68900000, 68999999],
    ['AM', 'Manaus', 69000000, 69099999],
    ['AM', 'AM Interior', 69100000, 69299999],
    ['AM', 'AM Todo o estado', 69400000, 69899999],
    ['RR', 'Boa Vista', 69300000, 69339999],
    ['RR', 'RR Interior', 69340000, 69389999],
    ['RR', 'RR Todo o estado', 69300000, 69389999],
    ['AC', 'Rio cinza', 69900000, 69920999],
    ['AC', 'AC Interior', 69921000, 69999999],
    ['AC', 'AC Todo o estado', 69900000, 69999999],
    ['DF', 'Brasília', 70000000, 70999999],
    ['DF', 'DF Cidades Satélite', 71000000, 73699999],
    ['DF', 'DF Todo o estado', 70000000, 73699999],
    ['GO', 'Goiânia', 72800000, 73999999], // #01;
    ['GO', 'Goiânia', 74000000, 74894999], // #02;
    ['GO', 'GO Interior', 74895000, 76799999],
    ['GO', 'GO Todo o estado', 72800000, 76799999],
    ['TO', 'Palmas', 77000000, 77270999],
    ['TO', 'TO Interior', 77300000, 77995999],
    ['TO', 'TO Todo o estado', 77000000, 77995999],
    ['MT', 'Cuiabá', 78000000, 78109999],
    ['MT', 'MT Interior', 78110000, 78899999],
    ['MT', 'MT Todo o estado', 78000000, 78899999],
    ['RO', 'Porto Velho', 78900000, 78930999],
    ['RO', 'MS Interior', 78931000, 78999999],
    ['RO', 'MS Todo o estado', 78900000, 78999999],
    ['MS', 'Campo Grande', 79000000, 79129999],
    ['MS', 'MS Interior', 79130000, 79999999],
    ['MS', 'MS Todo o estado', 79000000, 79999999],
    ['PR', 'Curitiba', 80000000, 82999999],
    ['PR', 'PR Área Metropolitana Curitiba', 80000000, 83800999],
    ['PR', 'PR Interior', 83801000, 87999999],
    ['PR', 'PR Todo o estado', 80000000, 87999999],
    ['SC', 'Florianópolis', 88000000, 82999999],
    ['SC', 'SC Área Metropolitana Florianópolis', 88000000, 88469999],
    ['SC', 'SC Interior', 88470000, 89999999],
    ['SC', 'SC Todo o estado', 88000000, 89999999],
    ['RS', 'Porto Alegre', 90000000 , 91999999],
    ['RS', 'RS Área Metropolitana Porto Alegre', 90000000 , 94900999],
    ['RS', 'RS Interior', 94901000 , 99999999],
    ['RS', 'RS Todo o estado', 90000000 , 99999999]
]

export default CONSTS_CEP;