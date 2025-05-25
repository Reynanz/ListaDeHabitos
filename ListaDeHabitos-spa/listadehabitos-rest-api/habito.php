<?php 
    //Função que converte os parâmetros de requisições HTTP, POST e PUT em um Hábito
    function f_parametro_to_habito() {
        // Obtém o conteúdo da requisição
        $dados = file_get_contents("php://input");
        // Converte o Json para array e retorna
        $habito = json_decode($dados, true);
        return $habito;
    }

    //Função para conectar ao banco de dados
    function conectar() {
            $servidor = "Localhost";
            $usuario = "root";
            $senha = "";
            $bancodedados = "Listadehabitos";
            // Cria uma conexão com o banco de dados
            $conexao = new mysqli($servidor, $usuario, $senha, $bancodedados);

            // Verifica a conexão
            if ($conexao->connect_error) {
                die("Falha na conexão: ".$conexao->connect_error); 
            }
            return $conexao;
    }

    //Função que retorna os hábitos
    function f_select_habito() {
        $querryWhere = " WHERE ";
        $primeiroparametro = true;
        $parametrosGet = array_keys($_GET);

        //Caso haja parâmetros o loop irá rodar, do contrário será ignorado
        foreach ($parametrosGet as $param) {
            //Se não for o primeiro parâmetro concatena o AND à variável $querryWhere
            if (!$primeiroparametro) {
                $querryWhere .= " AND "; 
            }
            //Se for o primeiro concatena o parâmetro e seu valor à variável $querryWhere e define a variável $primeiroparametro como false
            $primeiroparametro = false;
            $querryWhere .= $param."= '".$_GET[$param]."'"; 
        }

        //Armazena uma query na variável $sql
        $sql = "SELECT id, nome, status FROM habito ";

        //Verificar se deve adicionar a cláusula WHERE à query
        if ($querryWhere != " WHERE ") {
            $sql .= $querryWhere;
        }

        //Obtem a conexão com o banco de dados
        $conexao = conectar();
        
        //Executa a query
        $resultado = $conexao->query($sql);

        //Verifica se a query retornou resultados
        if ($resultado->num_rows > 0) {
            
            $jsonHabitoArray = Array();
            $contador = 0;

            while ($registro = $resultado->fetch_assoc()) {
                $jsonHabito = Array();
                $jsonHabito["id"] = $registro["id"];
                $jsonHabito["nome"] = $registro["nome"];
                $jsonHabito["status"] = $registro["status"];
                $jsonHabitoArray[$contador++] = $jsonHabito;

            }

            //Mostrar um array Json na tela   
            echo json_encode($jsonHabitoArray);

        } else {
            //Se a query não retornou registros, devolve um array Json vazio 
            echo json_encode(Array());
        }

        // Encerra a conexão com o MySQL 
        $conexao->close();

    }

    //Insere um novo hábito na tabela habito 
    function f_insert_habito() {

        //Pega o nome que foi recebido via post do formulário
        $habito = f_parametro_to_habito();
        $nome = $habito["nome"];

        //Armazena uma query na variável $sql
        $sql = "INSERT INTO habito (nome) VALUES ('$nome')";

        //Obtem a conexão com o banco de dados
        $conexao = conectar();
    
        //Verifica se houve erro, fecha a conexão e aborta o programa 
        if (!($conexao->query($sql) === TRUE)) {
            $conexao->close();
            die("Erro".$sql."<br>".$conexao->connect_error);
        }

        //Insere as demais informações no Json 
        $habito["id"] = mysqli_insert_id($conexao);
        $habito["status"] = "A";

        //Mostrar um array Json na tela
        echo json_encode($habito);

        // Encerra a conexão com o MySQL 
        $conexao->close();
    }
    
    //Atualiza um hábito existente 
    function f_update_habito() {
        $habito = f_parametro_to_habito();

        $id = $habito["id"];
        $nome = $habito["nome"];
        $status = $habito["status"];

        //Armazena uma query na variável $sql
        $sql = "UPDATE habito SET nome = '$nome', status = '$status' WHERE id = $id";

        //Obtem a conexão com o banco de dados
        $conexao = conectar();
    
        //Verifica se houve erro, fecha a conexão e aborta o programa 
        if (!($conexao->query($sql) === TRUE)) {
            $conexao->close();
            die("Erro ao atualizar: ".$conexao->connect_error);
        }

        //Mostrar um array Json na tela
        echo json_encode($habito);

        // Encerra a conexão com o MySQL 
        $conexao->close();
    }

    //Exclui um hábito existente
    function f_delete_habito() {
        $id = $_GET["id"];
        //Armazena uma query na variável $sql
        $sql = "DELETE FROM habito WHERE id = $id";

        //Obtem a conexão com o banco de dados
        $conexao = conectar();
    
        //Verifica se houve erro, fecha a conexão e aborta o programa 
        if (!($conexao->query($sql) === TRUE)) {
            $conexao->close();
            die("Erro ao deletar: ".$conexao->connect_error);
        }
    }
    
    //Armazena o metodo HTTP (GET, POST, PUT OU DELETE) na variável $metodo
    $metodo = $_SERVER['REQUEST_METHOD'];

    switch ($metodo) {
        case "GET":
            //Consultar
            f_select_habito();
            break;
        case "POST":
            //Inserir
            f_insert_habito();
            break;
        case "PUT":
            //Atualizar
            f_update_habito();
            break;
        case "DELETE":
            //Excluir
            f_delete_habito();
            break; 
    }

?>